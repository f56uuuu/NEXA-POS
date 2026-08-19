// Local/dev config — Netlify overwrites this at build time via scripts/gen-config.js
// using the SUPABASE_URL / SUPABASE_ANON_KEY environment variables you set in
// Netlify → Site settings → Environment variables. Safe to commit: this is the
// PUBLIC (publishable/anon) key, designed to ship in the browser bundle.
// The SECRET/service-role key must never appear in this file or anywhere in
// frontend/ — it only lives as a server-side env var for netlify/functions/*.
window.SUPABASE_URL = "https://lrazdxwneqspocfjoafc.supabase.co";
window.SUPABASE_ANON_KEY = "sb_publishable_9LNuzFNyioL9PGARReLYrA_xBLgvhV8";
