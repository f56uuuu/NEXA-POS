// frontend/js/supabaseClient.js
// Loaded after the supabase-js CDN script and config.js.
// frontend/js/supabaseClient.js
window.supabase = window.supabase || window.supabase.createClient(window.SUPABASE_URL, window.SUPABASE_ANON_KEY);
const supabase = window.supabase;