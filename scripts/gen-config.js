// scripts/gen-config.js
// Runs as the Netlify build command. Writes frontend/config.js with the
// PUBLIC (anon) Supabase credentials so the static site can initialize the
// client. The service-role key is NEVER written here — it stays a
// server-only env var used by netlify/functions/create-employee.js.
const fs = require('fs');
const path = require('path');

const url = process.env.SUPABASE_URL || '';
const anonKey = process.env.SUPABASE_ANON_KEY || '';

if (!url || !anonKey) {
  console.warn('[gen-config] SUPABASE_URL / SUPABASE_ANON_KEY are not set — writing placeholders. ' +
    'Set them in Netlify → Site settings → Environment variables before going live.');
}

const out = `// AUTO-GENERATED at build time by scripts/gen-config.js — do not edit by hand.
window.SUPABASE_URL = ${JSON.stringify(url || 'https://YOUR-PROJECT.supabase.co')};
window.SUPABASE_ANON_KEY = ${JSON.stringify(anonKey || 'YOUR-ANON-KEY')};
`;

// This script runs with cwd = frontend/ (Netlify's [build].base), so write locally.
fs.writeFileSync(path.join(__dirname, '..', 'frontend', 'config.js'), out);
console.log('[gen-config] wrote frontend/config.js');
