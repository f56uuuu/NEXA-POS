// frontend/js/supabaseClient.js
// Loaded after the supabase-js CDN script and config.js.
window.supabaseClient = window.supabaseClient || window.supabase.createClient(window.SUPABASE_URL, window.SUPABASE_ANON_KEY);
const supabase = window.supabaseClient;
