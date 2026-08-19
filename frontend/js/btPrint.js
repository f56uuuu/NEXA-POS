// frontend/js/btPrint.js
// Web Bluetooth ESC/POS thermal printing — read this before relying on it.
//
// HONEST LIMITS:
//   - Web Bluetooth only works in Chrome/Edge on desktop and Android, over
//     HTTPS, and only after a real user click (browser security requirement —
//     it cannot be triggered programmatically).
//   - ESC/POS printers do NOT share one standard BLE service/characteristic
//     UUID across brands. This uses the most common one seen on cheap
//     generic 58mm/80mm printers (0000ff00-... / 0000ff02-...). If your
//     printer uses a different chipset (many Epson/Star models use a
//     different profile, or SPP-over-classic-Bluetooth which Web Bluetooth
//     cannot reach at all), this will fail to connect — that's a hardware
//     limitation, not something fixable in pure JS. Check your printer
//     vendor's BLE SDK docs and adjust SERVICE_UUID/CHAR_UUID if needed.
//   - Not tested against physical hardware in this environment — treat it
//     as a solid starting implementation, not a verified-working driver.

const SERVICE_UUID = 0xff00;
const CHAR_UUID = 0xff02;

const ESC = 0x1b, GS = 0x1d;
function encoder() {
  const chunks = [];
  return {
    push: (...bytes) => chunks.push(new Uint8Array(bytes)),
    text: (str) => chunks.push(new TextEncoder().encode(str)),
    build: () => {
      const total = chunks.reduce((a,c) => a + c.length, 0);
      const out = new Uint8Array(total);
      let offset = 0;
      chunks.forEach(c => { out.set(c, offset); offset += c.length; });
      return out;
    },
  };
}

function buildEscPos(lastOrder, business, lang, t, fmt) {
  const enc = encoder();
  enc.push(ESC, 0x40); // init
  enc.push(ESC, 0x61, 0x01); // center align
  enc.text((business?.name || 'NEXA POS') + '\n');
  enc.push(ESC, 0x61, 0x00); // left align
  enc.text('--------------------------------\n');
  lastOrder.items.forEach(l => {
    const name = lang === 'ar' ? l.product.name_ar : (l.product.name_en || l.product.name_ar);
    const line = `${l.qty} x ${name}`;
    const price = fmt(l.qty * l.product.price_iqd);
    enc.text(line + '\n' + ' '.repeat(Math.max(0, 32 - price.length)) + price + '\n');
  });
  enc.text('--------------------------------\n');
  enc.text(`${t('discount')}: ${fmt(lastOrder.discount)}\n`);
  enc.push(ESC, 0x21, 0x10); // double height for total
  enc.text(`${t('total')}: ${fmt(lastOrder.total)} IQD\n`);
  enc.push(ESC, 0x21, 0x00);
  enc.text(`${t(lastOrder.method) || lastOrder.method}\n`);
  enc.text(new Date().toLocaleString(lang === 'ar' ? 'ar-IQ' : 'en-US') + '\n');
  enc.text('\n');
  enc.push(GS, 0x56, 0x41, 0x10); // partial cut (best-effort; many printers ignore/beep instead)
  return enc.build();
}

async function printReceiptBluetooth(lastOrder, business, lang, t, fmt) {
  if (!navigator.bluetooth) {
    throw new Error(lang === 'ar'
      ? 'المتصفح لا يدعم Web Bluetooth — استخدم Chrome أو Edge على كمبيوتر أو أندرويد.'
      : 'This browser does not support Web Bluetooth — use Chrome or Edge on desktop/Android.');
  }
  const device = await navigator.bluetooth.requestDevice({
    filters: [{ services: [SERVICE_UUID] }],
    optionalServices: [SERVICE_UUID],
  });
  const server = await device.gatt.connect();
  const service = await server.getPrimaryService(SERVICE_UUID);
  const characteristic = await service.getCharacteristic(CHAR_UUID);

  const bytes = buildEscPos(lastOrder, business, lang, t, fmt);
  const CHUNK = 20; // many BLE stacks cap writes around 20 bytes per packet
  for (let i = 0; i < bytes.length; i += CHUNK) {
    await characteristic.writeValue(bytes.slice(i, i + CHUNK));
  }
  await device.gatt.disconnect();
}
