const GITHUB_URL = 'https://github.com/f56uuuu';

const I18N = {
  ar: { dir:'rtl',
    eyebrow:'نظام نقاط بيع للمقاهي والمطاعم',
    headline:'إدارة محلك،<br/>مِن كوب القهوة الأول.',
    sub:'مبيعات، مناوبات، منتجات وتقارير — كل شيء بمكان واحد، بالدينار العراقي، بالعربي والإنجليزية.',
    p1:'فصل كامل بين بيانات كل محل', p2:'صلاحيات مالك ومدير وكاشير منفصلة', p3:'تتبّع المناوبات لحظة بلحظة',
    tabLogin:'تسجيل الدخول', tabSignup:'فتح محل جديد',
    labelEmail:'البريد الإلكتروني', labelPassword:'كلمة المرور', btnLogin:'دخول',
    loginNote:'يدخل المالك والمدير والكاشير من نفس الحقل — الصلاحيات تتحدد تلقائيًا.',
    labelBizName:'اسم المحل', labelOwnerName:'اسمك', btnSignup:'إنشاء الحساب',
    signupNote:'يبدأ حسابك فعّالًا فورًا.',
    devCredit:'تطوير أحمد إحسان حسين',
    navPos:'نقطة البيع', navProducts:'المنتجات', navShifts:'المناوبة', navReports:'التقارير',
    navInventory:'المخزون والمشتريات', navEmployees:'الموظفون', navSettings:'الاشتراك والهوية', btnLogout:'تسجيل الخروج',
    navExpenses:'المصاريف', navDebts:'الديون والزبائن',
    serviceCharge:'رسوم الخدمة', debtSale:'بيع بالدين (تأجيل الدفع)', printBluetooth:'طباعة بلوتوث',
    exportCsv:'تصدير CSV', netProfit:'صافي الربح (بعد المصاريف)',
    tables:'الطاولات ومناطق البيع', dineIn:'داخل المحل', takeaway:'تيك أواي', delivery:'توصيل',
    addExpense:'تسجيل مصروف', recentExpenses:'آخر المصاريف',
    addCustomer:'إضافة زبون', outstandingDebts:'الديون المستحقة',
    brandingCard:'شعار المحل والهوية', uploadLogo:'رفع شعار مخصص', useArtistic:'استخدام الصور الفنية الخاصة بالتطبيق بدل الشعار',
    serviceChargeCard:'رسوم الخدمة', serviceChargePct:'نسبة رسوم الخدمة (%)',
    searchProducts:'ابحث عن منتج...', cart:'السلة', discount:'الخصم (د.ع)',
    subtotal:'المجموع الفرعي', total:'الإجمالي', cash:'نقدي', visa:'فيزا', zaincash:'زين كاش',
    terminalRefPh:'مرجع الجهاز (اختياري)', checkout:'إتمام البيع', printReceipt:'طباعة آخر إيصال',
    addCategory:'إضافة قسم', addProduct:'إضافة منتج', noCategory:'بدون قسم', btnAdd:'إضافة',
    todaySales:'مبيعات اليوم', monthSales:'مبيعات الشهر', allTimeSales:'إجمالي المبيعات الكلي',
    topProducts:'الأكثر مبيعًا', paymentBreakdown:'توزيع طرق الدفع اليوم', yearlyReport:'التقرير السنوي',
    recentOrders:'آخر الطلبات', voidNote:'للمدير والمالك فقط: يمكن إلغاء طلب مسجّل بالخطأ.',
    voidBtn:'إلغاء', voided:'ملغى',
    addItem:'إضافة مادة', recordPurchase:'تسجيل مشترى', stockLevels:'المخزون الحالي',
    lowStock:'منخفض', inStock:'متوفر',
    addEmployee:'إضافة موظف', employees:'الموظفون', roleCashier:'كاشير', roleManager:'مدير', roleOwner:'مالك',
    active:'مفعّل', inactive:'موقوف', noEmployees:'لا يوجد موظفون بعد.', edit:'تعديل', remove:'حذف',
    openShift:'فتح مناوبة', openingCash:'الرصيد الافتتاحي (د.ع)', shiftOpenSince:'مفتوحة منذ',
    handoverBtn:'تسليم المناوبة', closeShift:'إغلاق المناوبة', closingCash:'الرصيد الختامي (د.ع)',
    emptyCart:'السلة فارغة — اضغط على منتج لإضافته.',
    lockedTitle:'الاشتراك منتهي', lockedBody:'اشتراك محلك انتهى بتاريخ {d}. اختر باقة لإرسال طلب تجديد إلى الدعم.',
    planMonthly:'شهري', planQuarterly:'كل 3 أشهر', planHalfYearly:'كل 6 أشهر', planYearly:'سنوي',
    requestSent:'تم إرسال طلب التجديد — بانتظار تفعيل المالك/الدعم.', pendingReq:'لديك طلب تجديد قيد الانتظار: {p}',
    err_generic:'حدث خطأ، حاول مرة أخرى.', err_INVALID_LOGIN_CREDENTIALS:'البريد الإلكتروني أو كلمة المرور غير صحيحة.',
    err_EMAIL_EXISTS:'هذا البريد مستخدم مسبقًا.', err_EMPTY_ORDER:'أضف منتجات للسلة أولًا.',
    err_PAYMENT_MISMATCH:'قيمة الدفع لا تطابق الإجمالي.', err_INVALID_SHIFT:'افتح مناوبة أولًا لتسجيل المبيعات.',
    err_SHIFT_ALREADY_OPEN:'يوجد مناوبة مفتوحة أصلًا.', err_MANAGER_REQUIRED:'هذا الإجراء للمدير أو المالك فقط.',
  },
  en: { dir:'ltr',
    eyebrow:'Point of sale for cafés & restaurants',
    headline:'Run your place,<br/>from the first cup.',
    sub:'Sales, shifts, products and reports — all in one place, in Iraqi dinar, in Arabic and English.',
    p1:'Every business fully isolated', p2:'Separate owner, manager & cashier permissions', p3:'Live shift tracking',
    tabLogin:'Log in', tabSignup:'Open a new business',
    labelEmail:'Email', labelPassword:'Password', btnLogin:'Log in',
    loginNote:'Owners, managers and cashiers log in here — permissions are detected automatically.',
    labelBizName:'Business name', labelOwnerName:'Your name', btnSignup:'Create account',
    signupNote:'Your account is active immediately.',
    devCredit:'Developed by Ahmed Ihsan Hussein',
    navPos:'Point of Sale', navProducts:'Products', navShifts:'Shift', navReports:'Reports',
    navInventory:'Inventory & Purchases', navEmployees:'Employees', navSettings:'Subscription & Branding', btnLogout:'Log out',
    navExpenses:'Expenses', navDebts:'Debts & Customers',
    serviceCharge:'Service charge', debtSale:'Sell on credit (deferred payment)', printBluetooth:'Print via Bluetooth',
    exportCsv:'Export CSV', netProfit:'Net profit (after expenses)',
    tables:'Tables & Sale Areas', dineIn:'Dine-in', takeaway:'Takeaway', delivery:'Delivery',
    addExpense:'Record an expense', recentExpenses:'Recent expenses',
    addCustomer:'Add customer', outstandingDebts:'Outstanding debts',
    brandingCard:'Store logo & branding', uploadLogo:'Upload a custom logo', useArtistic:"Use the app's artistic images instead of the logo",
    serviceChargeCard:'Service charge', serviceChargePct:'Service charge percentage (%)',
    searchProducts:'Search products...', cart:'Cart', discount:'Discount (IQD)',
    subtotal:'Subtotal', total:'Total', cash:'Cash', visa:'Visa', zaincash:'ZainCash',
    terminalRefPh:'Terminal reference (optional)', checkout:'Checkout', printReceipt:'Print last receipt',
    addCategory:'Add category', addProduct:'Add product', noCategory:'No category', btnAdd:'Add',
    todaySales:"Today's sales", monthSales:"This month's sales", allTimeSales:'All-time sales',
    topProducts:'Top-selling products', paymentBreakdown:"Today's payment methods", yearlyReport:'Yearly report',
    recentOrders:'Recent orders', voidNote:'Manager/owner only: void an order recorded by mistake.',
    voidBtn:'Void', voided:'Voided',
    addItem:'Add stock item', recordPurchase:'Record purchase', stockLevels:'Current stock',
    lowStock:'Low', inStock:'In stock',
    addEmployee:'Add employee', employees:'Employees', roleCashier:'Cashier', roleManager:'Manager', roleOwner:'Owner',
    active:'Active', inactive:'Disabled', noEmployees:'No employees yet.', edit:'Edit', remove:'Remove',
    openShift:'Open shift', openingCash:'Opening cash (IQD)', shiftOpenSince:'Open since',
    handoverBtn:'Hand over shift', closeShift:'Close shift', closingCash:'Closing cash (IQD)',
    emptyCart:'Cart is empty — tap a product to add it.',
    lockedTitle:'Subscription expired', lockedBody:'Your shop subscription expired on {d}. Pick a plan to send a renewal request.',
    planMonthly:'Monthly', planQuarterly:'Quarterly', planHalfYearly:'Every 6 months', planYearly:'Yearly',
    requestSent:'Renewal request sent — waiting on approval.', pendingReq:'You have a pending renewal request: {p}',
    err_generic:'Something went wrong, please try again.', err_INVALID_LOGIN_CREDENTIALS:'Incorrect email or password.',
    err_EMAIL_EXISTS:'This email is already registered.', err_EMPTY_ORDER:'Add products to the cart first.',
    err_PAYMENT_MISMATCH:'Payment amount does not match the total.', err_INVALID_SHIFT:'Open a shift before recording sales.',
    err_SHIFT_ALREADY_OPEN:'A shift is already open.', err_MANAGER_REQUIRED:'This action requires a manager or owner.',
  },
};

let lang = localStorage.getItem('nexa_lang') || 'ar';
let cart = [];
let categoriesCache = [];
let productsCache = [];
let currentShift = null;
let profile = null;   // { id, business_id, name, role }
let business = null;  // { id, name, plan, subscription_expires_at }
let lastOrder = null;

function t(key, vars) {
  let s = I18N[lang][key] || key;
  if (vars) Object.entries(vars).forEach(([k,v]) => { s = s.replace(`{${k}}`, v); });
  return s;
}
function fmt(n) { return Number(n||0).toLocaleString(lang === 'ar' ? 'ar-IQ' : 'en-US'); }
// XSS hardening: every place a user-entered string (product/category/business/
// employee/customer name, void reason, expense note...) gets interpolated into
// innerHTML MUST go through this first. Never trust names as safe HTML.
function esc(str) {
  return String(str ?? '').replace(/[&<>"']/g, (c) => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
}

function applyI18n() {
  const dict = I18N[lang];
  document.documentElement.lang = lang;
  document.documentElement.dir = dict.dir;
  document.querySelectorAll('[data-i18n]').forEach((el) => { const k = el.getAttribute('data-i18n'); if (dict[k]) el.innerHTML = dict[k]; });
  document.querySelectorAll('[data-i18n-ph]').forEach((el) => { const k = el.getAttribute('data-i18n-ph'); if (dict[k]) el.placeholder = dict[k]; });
  document.querySelectorAll('#langToggle, #langToggle2').forEach((b) => b.textContent = lang === 'ar' ? 'EN' : 'AR');
}
function setLang(l) { lang = l; localStorage.setItem('nexa_lang', l); applyI18n(); renderPos(); renderProductsManage(); }
document.getElementById('langToggle').addEventListener('click', () => setLang(lang === 'ar' ? 'en' : 'ar'));
document.getElementById('langToggle2').addEventListener('click', () => setLang(lang === 'ar' ? 'en' : 'ar'));

function applyTheme(theme) { document.documentElement.setAttribute('data-theme', theme); localStorage.setItem('nexa_theme', theme); }
applyTheme(localStorage.getItem('nexa_theme') || 'dark');
function toggleTheme() { applyTheme(document.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark'); }
document.getElementById('themeToggle').addEventListener('click', toggleTheme);
document.getElementById('themeToggle2').addEventListener('click', toggleTheme);

function showAuthError(code) { const el = document.getElementById('formError'); el.textContent = t(`err_${code}`) || t('err_generic'); el.hidden = false; }
function hideAuthError() { document.getElementById('formError').hidden = true; }
document.querySelectorAll('.tab').forEach((btn) => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.tab').forEach((b) => b.classList.remove('active'));
    document.querySelectorAll('.panel-form').forEach((f) => f.classList.remove('active'));
    btn.classList.add('active');
    document.getElementById(btn.dataset.tab + 'Form').classList.add('active');
    hideAuthError();
  });
});

// ---------- Auth ----------
document.getElementById('signupForm').addEventListener('submit', async (e) => {
  e.preventDefault(); hideAuthError();
  const bizName = document.getElementById('bizName').value.trim();
  const ownerName = document.getElementById('ownerName').value.trim();
  const email = document.getElementById('ownerEmail').value.trim();
  const password = document.getElementById('ownerPassword').value;
  try {
    const { error: signErr } = await supabase.auth.signUp({ email, password });
    if (signErr) throw new Error(signErr.message.includes('registered') ? 'EMAIL_EXISTS' : signErr.message);
    // signUp already leaves us signed in (email confirmation disabled) — create the tenant now.
    const { error: rpcErr } = await supabase.rpc('create_business_for_current_user', {
      business_name: bizName, owner_name: ownerName, biz_locale: lang,
    });
    if (rpcErr) throw new Error(rpcErr.message);
    await bootAfterAuth();
  } catch (err) { showAuthError(err.message); }
});

document.getElementById('loginForm').addEventListener('submit', async (e) => {
  e.preventDefault(); hideAuthError();
  const email = document.getElementById('loginEmail').value.trim();
  const password = document.getElementById('loginPassword').value;
  try {
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) throw new Error(error.message.includes('Invalid') ? 'INVALID_LOGIN_CREDENTIALS' : error.message);
    await bootAfterAuth();
  } catch (err) { showAuthError(err.message); }
});

async function doLogout() {
  await supabase.auth.signOut();
  profile = null; business = null; cart = [];
  document.getElementById('appShell').hidden = true;
  document.getElementById('lockedScreen').hidden = true;
  document.getElementById('authScreen').hidden = false;
}
document.getElementById('logoutBtn').addEventListener('click', doLogout);
document.getElementById('lockedLogoutBtn').addEventListener('click', doLogout);

document.getElementById('devGate').addEventListener('click', () => {
  const art = document.getElementById('devArt');
  art.hidden = !art.hidden;
  window.open(GITHUB_URL, '_blank', 'noopener');
});

// ---------- Boot / session ----------
async function bootAfterAuth() {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return;
  const { data: prof, error: profErr } = await supabase.from('profiles').select('*').eq('id', user.id).single();
  if (profErr || !prof) { showAuthError('generic'); return; }
  profile = prof;

  if (profile.role === 'super_admin') {
    window.location.href = '/admin.html';
    return;
  }

  const { data: biz } = await supabase.from('businesses').select('*').eq('id', profile.business_id).single();
  business = biz;

  const expired = new Date(business.subscription_expires_at) < new Date();
  document.getElementById('authScreen').hidden = true;
  if (expired && profile.role !== 'owner') {
    // Employees just see a simple locked message; only the owner can request renewal.
    showLockedScreen(false);
    return;
  }
  if (expired) { showLockedScreen(true); return; }

  document.getElementById('lockedScreen').hidden = true;
  document.getElementById('appShell').hidden = false;
  document.getElementById('sideBizName').textContent = business.name;
  document.querySelectorAll('.owner-only').forEach((el) => el.style.display = profile.role === 'owner' ? '' : 'none');
  document.querySelectorAll('.manager-only').forEach((el) => el.style.display = ['owner','manager'].includes(profile.role) ? '' : 'none');

  await Promise.all([loadCategories(), loadProducts(), loadTables(), loadCustomers()]);
  applyBranding();
  renderPos();
  renderProductsManage();
  checkSubscriptionBanner();
}

async function showLockedScreen(withPlans) {
  document.getElementById('appShell').hidden = true;
  document.getElementById('lockedScreen').hidden = false;
  const d = new Date(business.subscription_expires_at).toLocaleDateString(lang === 'ar' ? 'ar-IQ' : 'en-US');
  document.getElementById('lockedText').textContent = t('lockedBody', { d });
  const row = document.getElementById('lockedPlanRow');
  if (!withPlans) { row.innerHTML = ''; return; }
  const { data: plans } = await supabase.from('plan_prices').select('*').order('duration_days');
  row.innerHTML = (plans || []).map(p => `<button class="ghost-btn plan-btn" data-plan="${p.plan}">${t('plan' + toCamel(p.plan))} — ${fmt(p.price_iqd)} IQD</button>`).join('');
  row.querySelectorAll('.plan-btn').forEach(btn => btn.addEventListener('click', async () => {
    await supabase.from('subscription_requests').insert({ business_id: business.id, plan: btn.dataset.plan });
    alert(t('requestSent'));
  }));
}
function toCamel(plan) { return plan.split('_').map(s => s[0].toUpperCase() + s.slice(1)).join(''); }

supabase.auth.onAuthStateChange((event) => {
  if (event === 'SIGNED_OUT') { /* handled explicitly in doLogout */ }
});

// ---------- Nav ----------
document.querySelectorAll('.nav-item').forEach((btn) => btn.addEventListener('click', () => switchView(btn.dataset.view)));
function switchView(view) {
  document.querySelectorAll('.nav-item').forEach((b) => b.classList.toggle('active', b.dataset.view === view));
  document.querySelectorAll('.view').forEach((v) => v.classList.toggle('active', v.id === `view-${view}`));
  if (view === 'reports') loadReports();
  if (view === 'shifts') loadShift();
  if (view === 'employees') loadEmployees();
  if (view === 'settings') loadSubscriptionSettings();
  if (view === 'inventory') loadInventory();
  if (view === 'expenses') loadExpenses();
  if (view === 'debts') loadDebts();
}

// ---------- Categories & Products ----------
async function loadCategories() { const { data } = await supabase.from('categories').select('*').order('created_at'); categoriesCache = data || []; }
async function loadProducts() { const { data } = await supabase.from('products').select('*').eq('active', true).order('created_at'); productsCache = data || []; }

document.getElementById('categoryForm').addEventListener('submit', async (e) => {
  e.preventDefault();
  const name_ar = document.getElementById('catNameAr').value.trim();
  if (!name_ar) return;
  await supabase.from('categories').insert({ business_id: business.id, name_ar, name_en: '' });
  document.getElementById('catNameAr').value = '';
  await loadCategories(); renderCategoryChips(); renderCategorySelect();
});
function renderCategoryChips() {
  document.getElementById('categoryChips').innerHTML = categoriesCache.map(c => `<span class="chip">${esc(c.name_ar)}${c.name_en ? ' / ' + esc(c.name_en) : ''}</span>`).join('') || `<span class="emp-empty">${t('noCategory')}</span>`;
}
function renderCategorySelect() {
  const sel = document.getElementById('prodCategory'); const current = sel.value;
  sel.innerHTML = `<option value="">${t('noCategory')}</option>` + categoriesCache.map(c => `<option value="${c.id}">${esc(c.name_ar)}</option>`).join('');
  sel.value = current;
}

const AUTO_EN = {"قهوة":"Coffee","كابتشينو":"Cappuccino","لاتيه":"Latte","اسبريسو":"Espresso","إسبريسو":"Espresso","موكا":"Mocha","شاي":"Tea","ماء":"Water","عصير":"Juice","ليمون":"Lemon","فراولة":"Strawberry","مانجو":"Mango","تمر":"Date","حليب":"Milk","برغر":"Burger","برجر":"Burger","بطاطا":"Fries","كيك":"Cake","حلويات":"Dessert","مقهى":"Cafe","كافيه":"Cafe"};
document.getElementById('prodNameAr').addEventListener('blur', (e) => {
  const enField = document.getElementById('prodNameEn');
  if (enField.value.trim() || !e.target.value.trim()) return;
  enField.value = AUTO_EN[e.target.value.trim()] || e.target.value.trim();
});
document.getElementById('prodImage').addEventListener('change', (e) => {
  const file = e.target.files[0]; const preview = document.getElementById('prodImagePreview');
  if (!file) { preview.hidden = true; return; }
  preview.src = URL.createObjectURL(file); preview.hidden = false;
});

async function uploadProductImage(file) {
  const path = `${business.id}/${crypto.randomUUID()}.${file.name.split('.').pop()}`;
  const { error } = await supabase.storage.from('product-images').upload(path, file);
  if (error) throw error;
  return supabase.storage.from('product-images').getPublicUrl(path).data.publicUrl;
}

document.getElementById('productForm').addEventListener('submit', async (e) => {
  e.preventDefault();
  const editId = document.getElementById('prodEditId').value;
  const file = document.getElementById('prodImage').files[0];
  try {
    let image_url = '';
    if (file) image_url = await uploadProductImage(file);
    const name_ar = document.getElementById('prodNameAr').value.trim();
    const name_en = document.getElementById('prodNameEn').value.trim() || AUTO_EN[name_ar] || name_ar;
    const payload = {
      name_ar, name_en,
      price_iqd: Number(document.getElementById('prodPrice').value),
      category_id: document.getElementById('prodCategory').value || null,
    };
    if (image_url) payload.image_url = image_url;
    if (editId) {
      await supabase.from('products').update(payload).eq('id', editId);
    } else {
      await supabase.from('products').insert({ ...payload, business_id: business.id, image_url: image_url || '' });
    }
    e.target.reset();
    document.getElementById('prodEditId').value = '';
    document.getElementById('prodImagePreview').hidden = true;
    await loadProducts(); renderProductsManage(); renderPos();
  } catch (err) { alert(err.message || t('err_generic')); }
});

function renderProductsManage() {
  renderCategoryChips(); renderCategorySelect();
  const grid = document.getElementById('productManageGrid');
  grid.innerHTML = productsCache.map(p => `
    <div class="product-card">
      ${p.image_url ? `<img class="thumb" src="${esc(p.image_url)}" alt="" />` : `<div class="thumb placeholder">☕</div>`}
      <div class="pname">${esc(lang === 'ar' ? p.name_ar : (p.name_en || p.name_ar))}</div>
      <div class="pprice">${fmt(p.price_iqd)} IQD</div>
      <div class="pactions"><button data-edit="${p.id}">${t('edit')}</button><button data-remove="${p.id}">${t('remove')}</button></div>
    </div>`).join('');
  grid.querySelectorAll('[data-edit]').forEach(btn => btn.addEventListener('click', () => startEditProduct(btn.dataset.edit)));
  grid.querySelectorAll('[data-remove]').forEach(btn => btn.addEventListener('click', () => removeProduct(btn.dataset.remove)));
}
function startEditProduct(id) {
  const p = productsCache.find(x => x.id === id); if (!p) return;
  document.getElementById('prodEditId').value = p.id;
  document.getElementById('prodNameAr').value = p.name_ar;
  document.getElementById('prodNameEn').value = p.name_en || '';
  document.getElementById('prodPrice').value = p.price_iqd;
  document.getElementById('prodCategory').value = p.category_id || '';
  const preview = document.getElementById('prodImagePreview');
  if (p.image_url) { preview.src = p.image_url; preview.hidden = false; } else preview.hidden = true;
  document.getElementById('productForm').scrollIntoView({ behavior:'smooth' });
}
async function removeProduct(id) {
  await supabase.from('products').update({ active:false }).eq('id', id);
  await loadProducts(); renderProductsManage(); renderPos();
}

// ---------- POS / Cart ----------
document.getElementById('posSearch').addEventListener('input', renderPos);
function renderPos() {
  const query = document.getElementById('posSearch').value.trim().toLowerCase();
  const grid = document.getElementById('posProductGrid');
  const list = productsCache.filter(p => !query || p.name_ar.includes(query) || (p.name_en||'').toLowerCase().includes(query));
  grid.innerHTML = list.map(p => `
    <div class="product-card" data-add="${p.id}">
      ${p.image_url ? `<img class="thumb" src="${esc(p.image_url)}" alt="" />` : `<div class="thumb placeholder">☕</div>`}
      <div class="pname">${esc(lang === 'ar' ? p.name_ar : (p.name_en || p.name_ar))}</div>
      <div class="pprice">${fmt(p.price_iqd)} IQD</div>
    </div>`).join('');
  grid.querySelectorAll('[data-add]').forEach(el => el.addEventListener('click', () => addToCart(el.dataset.add)));
  renderCart();
}
function addToCart(productId) {
  const product = productsCache.find(p => p.id === productId); if (!product) return;
  const line = cart.find(x => x.product.id === productId);
  if (line) line.qty += 1; else cart.push({ product, qty:1 });
  renderCart();
}
function renderCart() {
  const wrap = document.getElementById('cartItems');
  if (!cart.length) wrap.innerHTML = `<div class="empty-hint illustrated"><img src="img/brand-feelingblue.jpg" alt="" />${t('emptyCart')}</div>`;
  else {
    wrap.innerHTML = cart.map((line,i) => `
      <div class="cart-row"><span>${esc(lang === 'ar' ? line.product.name_ar : (line.product.name_en || line.product.name_ar))}</span>
        <div class="qty-controls"><button data-dec="${i}">−</button><span>${line.qty}</span><button data-inc="${i}">+</button></div></div>`).join('');
    wrap.querySelectorAll('[data-inc]').forEach(b => b.addEventListener('click', () => { cart[b.dataset.inc].qty++; renderCart(); }));
    wrap.querySelectorAll('[data-dec]').forEach(b => b.addEventListener('click', () => { const i=b.dataset.dec; cart[i].qty--; if (cart[i].qty<=0) cart.splice(i,1); renderCart(); }));
  }
  const subtotal = cart.reduce((a,l) => a + l.qty * Number(l.product.price_iqd), 0);
  const discPct = document.getElementById('discountIsPercent')?.checked;
  const discRaw = Math.max(0, Number(document.getElementById('discountInput').value) || 0);
  const discount = Math.min(subtotal, discPct ? Math.round(subtotal * discRaw / 100) : discRaw);
  const svcPct = Number(business?.service_charge_percent || 0);
  const serviceCharge = Math.round((subtotal - discount) * svcPct / 100);
  document.getElementById('cartSubtotal').textContent = fmt(subtotal);
  const svcRow = document.getElementById('cartServiceRow');
  if (svcRow) { svcRow.hidden = svcPct <= 0; svcRow.querySelector('span:last-child').textContent = fmt(serviceCharge); }
  document.getElementById('cartTotal').textContent = fmt(subtotal - discount + serviceCharge);
}
document.getElementById('discountInput').addEventListener('input', renderCart);
document.getElementById('discountIsPercent')?.addEventListener('change', renderCart);

const isDebtSale = document.getElementById('debtSaleToggle');
isDebtSale?.addEventListener('change', () => {
  document.getElementById('payMethodsBlock').hidden = isDebtSale.checked;
  document.getElementById('debtCustomerBlock').hidden = !isDebtSale.checked;
});

document.getElementById('checkoutBtn').addEventListener('click', async () => {
  const errEl = document.getElementById('posError'); errEl.hidden = true;
  if (!cart.length) { errEl.textContent = t('err_EMPTY_ORDER'); errEl.hidden = false; return; }
  const subtotal = cart.reduce((a,l) => a + l.qty * Number(l.product.price_iqd), 0);
  const discPct = document.getElementById('discountIsPercent')?.checked;
  const discRaw = Math.max(0, Number(document.getElementById('discountInput').value) || 0);
  const discountIqd = Math.min(subtotal, discPct ? Math.round(subtotal * discRaw / 100) : discRaw);
  const svcPct = Number(business?.service_charge_percent || 0);
  const total = subtotal - discountIqd + Math.round((subtotal - discountIqd) * svcPct / 100);
  const onDebt = isDebtSale?.checked;
  const method = document.querySelector('input[name=payMethod]:checked')?.value || 'cash';
  const terminalRef = document.getElementById('terminalRef').value.trim();
  const tableId = document.getElementById('tableSelect')?.value || null;
  const customerId = onDebt ? document.getElementById('debtCustomerSelect')?.value || null : null;
  if (onDebt && !customerId) { errEl.textContent = lang==='ar' ? 'اختر زبون للبيع بالدين' : 'Pick a customer for the debt sale'; errEl.hidden = false; return; }

  const payload = {
    p_shift_id: currentShift?.id || null,
    p_discount_iqd: discountIqd,
    p_items: cart.map(l => ({ product_id:l.product.id, qty:l.qty })),
    p_payments: onDebt ? [] : [{ method, amount_iqd: total, terminal_ref: terminalRef }],
    p_table_id: tableId,
    p_customer_id: customerId,
  };

  if (!navigator.onLine) {
    await queueOfflineOrder(payload);
    lastOrder = { order: { id:'offline' }, items: [...cart], total, discount: discountIqd, method: onDebt ? 'debt' : method };
    document.getElementById('printLastBtn').hidden = false; document.getElementById('printBluetoothBtn').hidden = false;
    cart = []; document.getElementById('discountInput').value = 0; document.getElementById('terminalRef').value = '';
    renderCart();
    errEl.textContent = lang==='ar' ? 'لا يوجد اتصال — تم حفظ الطلب محليًا وسيُرفع تلقائيًا عند عودة الإنترنت.' : 'Offline — order saved locally and will sync automatically once back online.';
    errEl.hidden = false;
    return;
  }

  const { data, error } = await supabase.rpc('create_order', payload);
  if (error) {
    // Network-shaped failures still get queued rather than losing the sale.
    if (error.message?.includes('fetch') || error.message === 'Failed to fetch') {
      await queueOfflineOrder(payload);
      errEl.textContent = lang==='ar' ? 'تعذر الاتصال — تم حفظ الطلب محليًا.' : 'Connection failed — order saved locally.';
      errEl.hidden = false;
      cart = []; renderCart();
      return;
    }
    errEl.textContent = t(`err_${error.message}`) || error.message; errEl.hidden = false; return;
  }
  lastOrder = { order: data, items: [...cart], total, discount: discountIqd, method: onDebt ? 'debt' : method };
  document.getElementById('printLastBtn').hidden = false; document.getElementById('printBluetoothBtn').hidden = false;
  cart = []; document.getElementById('discountInput').value = 0; document.getElementById('terminalRef').value = '';
  if (isDebtSale) isDebtSale.checked = false;
  document.getElementById('payMethodsBlock').hidden = false;
  document.getElementById('debtCustomerBlock').hidden = true;
  renderCart();
});
function buildReceiptHtml() {
  if (!lastOrder) return '';
  const lines = lastOrder.items.map(l => `<div class="r-line"><span>${l.qty} × ${esc(lang==='ar'?l.product.name_ar:(l.product.name_en||l.product.name_ar))}</span><span>${fmt(l.qty*l.product.price_iqd)}</span></div>`).join('');
  return `
    <h3>${esc(business?.name || 'NEXA POS')}</h3><hr/>${lines}<hr/>
    <div class="r-line"><span>${t('discount')}</span><span>${fmt(lastOrder.discount)}</span></div>
    <div class="r-line r-total"><span>${t('total')}</span><span>${fmt(lastOrder.total)} IQD</span></div>
    <div class="r-line"><span>${t(lastOrder.method) || esc(lastOrder.method)}</span></div>`;
}
document.getElementById('printLastBtn').addEventListener('click', () => {
  document.getElementById('receiptPrint').innerHTML = buildReceiptHtml();
  window.print();
});
document.getElementById('printBluetoothBtn')?.addEventListener('click', async () => {
  if (!lastOrder) return;
  try { await printReceiptBluetooth(lastOrder, business, lang, t, fmt); }
  catch (err) { alert((lang==='ar' ? 'تعذرت الطباعة عبر البلوتوث: ' : 'Bluetooth print failed: ') + err.message); }
});

// ---------- Shifts ----------
async function loadShift() {
  const { data } = await supabase.from('shifts').select('*, opened_by_profile:opened_by(name)').in('status', ['open','handover']).order('opened_at', { ascending:false }).limit(1).maybeSingle();
  currentShift = data; renderShiftCard();
}
function renderShiftCard() {
  const card = document.getElementById('shiftCard');
  if (!currentShift) {
    card.innerHTML = `<h3>${t('openShift')}</h3><div class="inline-form row">
      <input id="openingCash" type="number" min="0" placeholder="${t('openingCash')}" value="0" />
      <button id="openShiftBtn" class="primary-btn small">${t('openShift')}</button></div>`;
    document.getElementById('openShiftBtn').addEventListener('click', async () => {
      const { error } = await supabase.from('shifts').insert({
        business_id: business.id, opened_by: profile.id,
        opening_cash_iqd: Number(document.getElementById('openingCash').value) || 0,
      });
      if (error) alert(error.message); else await loadShift();
    });
    return;
  }
  const opened = new Date(currentShift.opened_at).toLocaleString(lang === 'ar' ? 'ar-IQ' : 'en-US');
  let html = `<h3>${t('navShifts')}</h3><p>${t('shiftOpenSince')}: ${opened} — ${esc(currentShift.opened_by_profile?.name || '')}</p><p class="tag">${esc(currentShift.status)}</p>`;
  if (['owner','manager'].includes(profile.role)) {
    html += `<div class="inline-form row" style="margin-top:16px"><select id="handoverSelect"></select><button id="handoverBtn" class="ghost-btn">${t('handoverBtn')}</button></div>
      <div class="inline-form row" style="margin-top:16px"><input id="closingCash" type="number" min="0" placeholder="${t('closingCash')}" value="0" /><button id="closeShiftBtn" class="primary-btn small">${t('closeShift')}</button></div>`;
  }
  card.innerHTML = html;
  if (['owner','manager'].includes(profile.role)) {
    supabase.from('profiles').select('id,name').eq('business_id', business.id).eq('is_active', true).then(({ data }) => {
      const sel = document.getElementById('handoverSelect');
      if (sel) sel.innerHTML = (data||[]).map(e => `<option value="${e.id}">${esc(e.name)}</option>`).join('');
    });
    document.getElementById('handoverBtn').addEventListener('click', async () => {
      const nextEmployeeId = document.getElementById('handoverSelect').value;
      await supabase.from('shifts').update({ status:'handover', handed_to: nextEmployeeId, handed_over_at: new Date().toISOString() }).eq('id', currentShift.id);
      await loadShift();
    });
    document.getElementById('closeShiftBtn').addEventListener('click', async () => {
      await supabase.from('shifts').update({ status:'closed', closing_cash_iqd: Number(document.getElementById('closingCash').value)||0, closed_at: new Date().toISOString() }).eq('id', currentShift.id);
      await loadShift();
    });
  }
}

// ---------- Reports ----------
async function loadReports() {
  const startOfDay = new Date(); startOfDay.setHours(0,0,0,0);
  const startOfMonth = new Date(startOfDay.getFullYear(), startOfDay.getMonth(), 1);

  const [{ data: todayOrders }, { data: monthOrders }, { data: allOrders }, { data: todayExpenses }, { data: monthExpenses }] = await Promise.all([
    supabase.from('orders').select('total_iqd').eq('status','paid').gte('created_at', startOfDay.toISOString()),
    supabase.from('orders').select('total_iqd').eq('status','paid').gte('created_at', startOfMonth.toISOString()),
    supabase.from('orders').select('total_iqd').eq('status','paid'),
    supabase.from('expenses').select('amount_iqd').gte('recorded_at', startOfDay.toISOString()),
    supabase.from('expenses').select('amount_iqd').gte('recorded_at', startOfMonth.toISOString()),
  ]);
  const todaySales = (todayOrders||[]).reduce((a,o)=>a+Number(o.total_iqd),0);
  const monthSales = (monthOrders||[]).reduce((a,o)=>a+Number(o.total_iqd),0);
  const todayExp = (todayExpenses||[]).reduce((a,x)=>a+Number(x.amount_iqd),0);
  const monthExp = (monthExpenses||[]).reduce((a,x)=>a+Number(x.amount_iqd),0);
  document.getElementById('statSales').textContent = fmt(todaySales);
  document.getElementById('statMonthSales').textContent = fmt(monthSales);
  document.getElementById('statAllTime').textContent = fmt((allOrders||[]).reduce((a,o)=>a+Number(o.total_iqd),0));
  const netEl = document.getElementById('statNetProfit');
  if (netEl) netEl.textContent = `${fmt(todaySales - todayExp)} (${lang==='ar'?'شهري':'monthly'}: ${fmt(monthSales - monthExp)})`;

  const { data: payRows } = await supabase.from('payments').select('method, amount_iqd, orders!inner(created_at, status)').gte('orders.created_at', startOfDay.toISOString()).eq('orders.status','paid');
  const byMethod = {};
  (payRows||[]).forEach(r => { byMethod[r.method] = (byMethod[r.method]||0) + Number(r.amount_iqd); });
  const maxPay = Math.max(1, ...Object.values(byMethod));
  document.getElementById('paymentBars').innerHTML = Object.keys(byMethod).length
    ? Object.entries(byMethod).map(([m,amt]) => `<div class="bar-row"><span class="bar-label">${esc(t(m)||m)}</span><div class="bar-track"><div class="bar-fill" style="width:${(amt/maxPay*100).toFixed(0)}%"></div></div><span>${fmt(amt)}</span></div>`).join('')
    : `<p class="empty-hint">—</p>`;

  const { data: itemRows } = await supabase.from('order_items').select('product_name_ar, product_name_en, line_total_iqd, orders!inner(status)').eq('orders.status','paid');
  const totals = {};
  (itemRows||[]).forEach(r => { const key = lang==='ar'?r.product_name_ar:(r.product_name_en||r.product_name_ar); totals[key] = (totals[key]||0) + Number(r.line_total_iqd); });
  const sorted = Object.entries(totals).sort((a,b)=>b[1]-a[1]).slice(0,8);
  const grand = sorted.reduce((a,[,v])=>a+v,0) || 1;
  document.getElementById('topProductBars').innerHTML = sorted.length
    ? sorted.map(([name,amt]) => `<div class="bar-row"><span class="bar-label">${esc(name)}</span><div class="bar-track"><div class="bar-fill" style="width:${(amt/grand*100).toFixed(0)}%"></div></div><span>${(amt/grand*100).toFixed(0)}%</span></div>`).join('')
    : `<p class="empty-hint">—</p>`;

  const yearInput = document.getElementById('yearInput');
  if (!yearInput.value) yearInput.value = new Date().getFullYear();
  yearInput.onchange = loadYear;
  await loadYear();

  if (['owner','manager'].includes(profile.role)) await loadRecentOrders();
  window._reportExportData = { todaySales, monthSales, todayExp, monthExp, byMethod, top: sorted };
}
document.getElementById('exportCsvBtn')?.addEventListener('click', () => {
  const d = window._reportExportData; if (!d) return;
  const rows = [
    ['metric','value'],
    ['today_sales_iqd', d.todaySales], ['month_sales_iqd', d.monthSales],
    ['today_expenses_iqd', d.todayExp], ['month_expenses_iqd', d.monthExp],
    ['today_net_profit_iqd', d.todaySales - d.todayExp], ['month_net_profit_iqd', d.monthSales - d.monthExp],
    ...Object.entries(d.byMethod).map(([m,v]) => [`payment_${m}_today_iqd`, v]),
    ...d.top.map(([name,v],i) => [`top_product_${i+1}_${name.replace(/[,\n]/g,' ')}`, v]),
  ];
  const csv = rows.map(r => r.map(c => `"${String(c).replace(/"/g,'""')}"`).join(',')).join('\n');
  const blob = new Blob(['\uFEFF' + csv], { type:'text/csv;charset=utf-8;' });
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = `nexa-report-${new Date().toISOString().slice(0,10)}.csv`;
  a.click();
});
async function loadYear() {
  const year = Number(document.getElementById('yearInput').value);
  const from = new Date(year,0,1).toISOString(), to = new Date(year+1,0,1).toISOString();
  const { data } = await supabase.from('orders').select('total_iqd, created_at').eq('status','paid').gte('created_at', from).lt('created_at', to);
  const byMonth = Array(12).fill(0);
  (data||[]).forEach(o => { byMonth[new Date(o.created_at).getMonth()] += Number(o.total_iqd); });
  const max = Math.max(1, ...byMonth);
  const monthNames = lang === 'ar' ? ['ينا','فبر','مار','ابر','ماي','يون','يول','اغس','سبت','اكت','نوف','ديس'] : ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
  document.getElementById('yearBars').innerHTML = byMonth.map((v,i) => `<div class="month-col"><div class="month-fill" style="height:${(v/max*100).toFixed(0)}%" title="${fmt(v)}"></div><span class="month-label">${monthNames[i]}</span></div>`).join('');
}
async function loadRecentOrders() {
  const { data } = await supabase.from('orders').select('*').order('created_at', { ascending:false }).limit(15);
  const ul = document.getElementById('recentOrdersList');
  ul.innerHTML = (data||[]).length ? data.map(o => `
    <li><span>${new Date(o.created_at).toLocaleString(lang==='ar'?'ar-IQ':'en-US')} — ${fmt(o.total_iqd)} IQD</span>
      ${o.status === 'voided' ? `<span class="tag voided">${t('voided')}</span>` : `<button class="void-btn" data-void="${o.id}">${t('voidBtn')}</button>`}</li>`).join('') : `<li class="emp-empty">—</li>`;
  ul.querySelectorAll('[data-void]').forEach(btn => btn.addEventListener('click', async () => {
    const reason = prompt(lang==='ar' ? 'سبب الإلغاء (اختياري)':'Void reason (optional)') || '';
    const { error } = await supabase.rpc('void_order', { p_order_id: btn.dataset.void, p_reason: reason });
    if (error) alert(t(`err_${error.message}`) || error.message); else await loadRecentOrders();
  }));
}

// ---------- Inventory & Purchases (manager/owner only) ----------
let inventoryCache = [];
async function loadInventory() {
  const { data } = await supabase.from('inventory_items').select('*').order('created_at');
  inventoryCache = data || [];
  renderInventory();
}
function renderInventory() {
  const sel = document.getElementById('purchaseItem');
  sel.innerHTML = inventoryCache.map(i => `<option value="${i.id}">${esc(i.name_ar)}</option>`).join('');
  const ul = document.getElementById('inventoryList');
  ul.innerHTML = inventoryCache.length ? inventoryCache.map(i => `
    <li><span>${esc(i.name_ar)} — ${Number(i.quantity_on_hand).toLocaleString()} ${esc(i.unit)}</span>
      <span class="tag ${Number(i.quantity_on_hand) <= Number(i.low_stock_threshold) ? 'off' : ''}">${Number(i.quantity_on_hand) <= Number(i.low_stock_threshold) ? t('lowStock') : t('inStock')}</span></li>`).join('') : `<li class="emp-empty">—</li>`;
  const lowCount = inventoryCache.filter(i => Number(i.quantity_on_hand) <= Number(i.low_stock_threshold)).length;
  const banner = document.getElementById('lowStockBanner');
  if (banner) { banner.hidden = lowCount === 0; banner.textContent = lang==='ar' ? `${lowCount} مادة وصلت للحد الأدنى من المخزون.` : `${lowCount} item(s) at or below their low-stock threshold.`; }
}
document.getElementById('itemForm').addEventListener('submit', async (e) => {
  e.preventDefault();
  await supabase.from('inventory_items').insert({
    business_id: business.id,
    name_ar: document.getElementById('itemNameAr').value.trim(),
    unit: document.getElementById('itemUnit').value.trim() || 'unit',
    low_stock_threshold: Number(document.getElementById('itemThreshold').value) || 0,
  });
  e.target.reset(); document.getElementById('itemUnit').value = 'unit';
  await loadInventory();
});
document.getElementById('purchaseForm').addEventListener('submit', async (e) => {
  e.preventDefault();
  const { error } = await supabase.rpc('record_purchase', {
    p_item_id: document.getElementById('purchaseItem').value,
    p_qty: Number(document.getElementById('purchaseQty').value),
    p_total_cost_iqd: Number(document.getElementById('purchaseCost').value) || 0,
  });
  if (error) alert(error.message); else { e.target.reset(); await loadInventory(); }
});

// ---------- Employees ----------
async function loadEmployees() {
  const { data } = await supabase.from('profiles').select('*').eq('business_id', business.id).neq('role','owner').order('created_at', { ascending:false });
  renderEmployees(data || []);
}
function renderEmployees(list) {
  const ul = document.getElementById('employeeList');
  ul.innerHTML = list.length ? list.map(e => `
    <li><span>${esc(e.name)} <span class="tag">${t('role'+toCamel(e.role))}</span></span>
      <span class="tag ${e.is_active?'':'off'}" data-toggle="${e.id}" data-active="${e.is_active}" style="cursor:pointer">${e.is_active?t('active'):t('inactive')}</span></li>`).join('') : `<li class="emp-empty">${t('noEmployees')}</li>`;
  ul.querySelectorAll('[data-toggle]').forEach(tag => tag.addEventListener('click', async () => {
    await supabase.from('profiles').update({ is_active: tag.dataset.active !== 'true' }).eq('id', tag.dataset.toggle);
    await loadEmployees();
  }));
}
document.getElementById('employeeForm').addEventListener('submit', async (e) => {
  e.preventDefault();
  const errEl = document.getElementById('empError'); errEl.hidden = true;
  const { data: { session } } = await supabase.auth.getSession();
  try {
    const res = await fetch('/.netlify/functions/create-employee', {
      method:'POST',
      headers: { 'Content-Type':'application/json', Authorization: `Bearer ${session.access_token}` },
      body: JSON.stringify({
        name: document.getElementById('empName').value.trim(),
        email: document.getElementById('empEmail').value.trim(),
        password: document.getElementById('empPassword').value,
        role: document.getElementById('empRole').value,
      }),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'generic');
    e.target.reset(); await loadEmployees();
  } catch (err) { errEl.textContent = t(`err_${err.message}`) || err.message; errEl.hidden = false; }
});

// ---------- Subscription (owner) ----------
async function loadSubscriptionSettings() {
  const { data: biz } = await supabase.from('businesses').select('*').eq('id', business.id).single();
  business = biz;
  const artToggle = document.getElementById('artisticToggle');
  if (artToggle) artToggle.checked = business.use_artistic_branding;
  const svcInput = document.getElementById('serviceChargeInput');
  if (svcInput) svcInput.value = business.service_charge_percent;
  const expires = new Date(business.subscription_expires_at).toLocaleDateString(lang === 'ar' ? 'ar-IQ' : 'en-US');
  document.getElementById('subStatusText').textContent = `${business.plan} — ${expires}`;

  const { data: plans } = await supabase.from('plan_prices').select('*').order('duration_days');
  const { data: pending } = await supabase.from('subscription_requests').select('*').eq('business_id', business.id).eq('status','pending').maybeSingle();

  const row = document.getElementById('planRow');
  row.innerHTML = (plans || []).map(p => `<button class="ghost-btn plan-btn" data-plan="${p.plan}" ${pending?'disabled':''}>${t('plan'+toCamel(p.plan))} — ${fmt(p.price_iqd)} IQD</button>`).join('');
  row.querySelectorAll('.plan-btn').forEach(btn => btn.addEventListener('click', async () => {
    await supabase.from('subscription_requests').insert({ business_id: business.id, plan: btn.dataset.plan });
    await loadSubscriptionSettings();
  }));

  const pendingText = document.getElementById('pendingReqText');
  if (pending) { pendingText.hidden = false; pendingText.textContent = t('pendingReq', { p: t('plan'+toCamel(pending.plan)) }); }
  else pendingText.hidden = true;
}
async function checkSubscriptionBanner() {
  const daysLeft = Math.ceil((new Date(business.subscription_expires_at) - Date.now()) / 86400000);
  const banner = document.getElementById('subBanner');
  if (daysLeft <= 7 && profile.role === 'owner') {
    banner.textContent = lang === 'ar' ? `اشتراكك ينتهي خلال ${daysLeft} يوم — جدده من صفحة الاشتراك.` : `Your subscription expires in ${daysLeft} day(s) — renew it from the Subscription page.`;
    banner.hidden = false;
  } else banner.hidden = true;
}

// ---------- Tables (dine-in / takeaway / delivery) ----------
async function loadTables() {
  const { data } = await supabase.from('shop_tables').select('*').order('created_at');
  const sel = document.getElementById('tableSelect');
  if (sel) {
    sel.innerHTML = `<option value="">${lang==='ar'?'بدون طاولة':'No table'}</option>` +
      (data||[]).map(tb => `<option value="${tb.id}">${esc(tb.label)}</option>`).join('');
  }
  renderTableManageList(data || []);
}
function renderTableManageList(list) {
  const ul = document.getElementById('tableManageList');
  if (!ul) return;
  ul.innerHTML = list.length ? list.map(tb => `<li><span>${esc(tb.label)} <span class="tag">${tb.kind}</span></span></li>`).join('') : `<li class="emp-empty">—</li>`;
}
document.getElementById('tableForm')?.addEventListener('submit', async (e) => {
  e.preventDefault();
  await supabase.from('shop_tables').insert({
    business_id: business.id,
    label: document.getElementById('tableLabel').value.trim(),
    kind: document.getElementById('tableKind').value,
  });
  e.target.reset();
  await loadTables();
});

// ---------- Customers & Debt (Tab system) ----------
async function loadCustomers() {
  const { data } = await supabase.from('customers').select('*').order('created_at', { ascending:false });
  const sel = document.getElementById('debtCustomerSelect');
  if (sel) sel.innerHTML = (data||[]).map(c => `<option value="${c.id}">${esc(c.name)}${c.phone?' — '+esc(c.phone):''}</option>`).join('');
  renderCustomerList(data || []);
}
function renderCustomerList(list) {
  const ul = document.getElementById('customerList');
  if (!ul) return;
  ul.innerHTML = list.length ? list.map(c => `<li><span>${esc(c.name)}${c.phone?' — '+esc(c.phone):''}</span></li>`).join('') : `<li class="emp-empty">—</li>`;
}
document.getElementById('customerForm')?.addEventListener('submit', async (e) => {
  e.preventDefault();
  await supabase.from('customers').insert({
    business_id: business.id,
    name: document.getElementById('customerName').value.trim(),
    phone: document.getElementById('customerPhone').value.trim(),
  });
  e.target.reset();
  await loadCustomers();
});
async function loadDebts() {
  const { data } = await supabase.from('orders').select('*, customers(name)').in('payment_status', ['debt','partial']).order('created_at', { ascending:false });
  const ul = document.getElementById('debtList');
  if (!ul) return;
  ul.innerHTML = (data||[]).length ? data.map(o => `
    <li><span>${esc(o.customers?.name || '—')} — ${fmt(o.total_iqd)} IQD <span class="tag ${o.payment_status==='partial'?'':'off'}">${o.payment_status}</span></span>
      <button class="void-btn" style="border-color:var(--ok);color:var(--ok)" data-settle="${o.id}" data-total="${o.total_iqd}">${lang==='ar'?'تسديد':'Settle'}</button></li>`).join('') : `<li class="emp-empty">—</li>`;
  ul.querySelectorAll('[data-settle]').forEach(btn => btn.addEventListener('click', async () => {
    const amount = Number(prompt(lang==='ar' ? `المبلغ (من أصل ${btn.dataset.total})` : `Amount (of ${btn.dataset.total})`, btn.dataset.total));
    if (!amount || amount <= 0) return;
    const { error } = await supabase.rpc('settle_debt', { p_order_id: btn.dataset.settle, p_amount_iqd: amount });
    if (error) alert(error.message); else await loadDebts();
  }));
}

// ---------- Expenses ----------
async function loadExpenses() {
  const { data } = await supabase.from('expenses').select('*').order('recorded_at', { ascending:false }).limit(30);
  const ul = document.getElementById('expenseList');
  if (!ul) return;
  ul.innerHTML = (data||[]).length ? data.map(x => `
    <li><span>${esc(x.category)}${x.note?' — '+esc(x.note):''} — ${new Date(x.recorded_at).toLocaleDateString(lang==='ar'?'ar-IQ':'en-US')}</span>
      <span class="tag off">${fmt(x.amount_iqd)} IQD</span></li>`).join('') : `<li class="emp-empty">—</li>`;
}
document.getElementById('expenseForm')?.addEventListener('submit', async (e) => {
  e.preventDefault();
  await supabase.from('expenses').insert({
    business_id: business.id,
    category: document.getElementById('expenseCategory').value.trim(),
    amount_iqd: Number(document.getElementById('expenseAmount').value) || 0,
    note: document.getElementById('expenseNote').value.trim(),
    recorded_by: profile.id,
  });
  e.target.reset();
  await loadExpenses();
});

// ---------- Branding (logo upload / artistic image toggle) ----------
const ART_IMAGES = ['img/brand-sun.jpg','img/brand-duo.jpg','img/brand-faces.jpg','img/brand-faceless.jpg','img/brand-feelingblue.jpg','img/brand-dev.jpg'];
function applyBranding() {
  const el = document.getElementById('sideBizLogo');
  if (!el) return;
  if (business.logo_url && !business.use_artistic_branding) { el.src = business.logo_url; el.hidden = false; }
  else if (business.use_artistic_branding) { el.src = ART_IMAGES[Math.floor(Math.random()*ART_IMAGES.length)]; el.hidden = false; }
  else el.hidden = true;
}
document.getElementById('logoUpload')?.addEventListener('change', async (e) => {
  const file = e.target.files[0]; if (!file) return;
  const path = `${business.id}/logo.${file.name.split('.').pop()}`;
  const { error } = await supabase.storage.from('store-logos').upload(path, file, { upsert:true });
  if (error) { alert(error.message); return; }
  const { data: pub } = supabase.storage.from('store-logos').getPublicUrl(path);
  await supabase.from('businesses').update({ logo_url: pub.publicUrl }).eq('id', business.id);
  business.logo_url = pub.publicUrl;
  applyBranding();
});
document.getElementById('artisticToggle')?.addEventListener('change', async (e) => {
  await supabase.from('businesses').update({ use_artistic_branding: e.target.checked }).eq('id', business.id);
  business.use_artistic_branding = e.target.checked;
  applyBranding();
});
document.getElementById('serviceChargeInput')?.addEventListener('change', async (e) => {
  const pct = Math.max(0, Number(e.target.value) || 0);
  await supabase.from('businesses').update({ service_charge_percent: pct }).eq('id', business.id);
  business.service_charge_percent = pct;
});

// ---------- Boot ----------
applyI18n();
(async () => {
  const { data: { session } } = await supabase.auth.getSession();
  if (session) await bootAfterAuth();
})();
