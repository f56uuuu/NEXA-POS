# NEXA POS — Deploy guide (Supabase + Netlify)

## 1. Supabase project setup
1. In your Supabase project's SQL editor, run **`supabase/schema.sql`**, then **`supabase/storage_and_bootstrap.sql`**, in that order.
2. Confirm the `product-images` and `store-logos` storage buckets were created (Storage tab).
3. Bootstrap your Super Admin account by following the instructions inside `storage_and_bootstrap.sql` step 2 — create the user in **Dashboard → Authentication → Users**, using a real email (e.g. `daddy@yourdomain.com`) and setting the password there directly. Then run the one `insert into profiles ...` statement with that user's UUID.

## 2. Netlify setup
1. Push this repo to GitHub/GitLab, then **New site from Git** in Netlify (or drag-and-drop `dist/` for a quick static-only preview — see the note below).
2. Netlify → Site settings → **Environment variables**, add:
   - `SUPABASE_URL` = `https://lrazdxwneqspocfjoafc.supabase.co`
   - `SUPABASE_ANON_KEY` = your publishable key
   - `SUPABASE_SERVICE_ROLE_KEY` = your service-role key (server-only — used exclusively by `netlify/functions/create-employee.js`, never sent to the browser)
3. Deploy. `netlify.toml` already points the build at `frontend/`, runs `scripts/gen-config.js` to inject the two public env vars into `config.js`, and wires up `/admin` → `admin.html`.

**Important — rotate both secrets in the Supabase dashboard.** They were pasted into our chat, and a chat log isn't a secure place for a service-role key or an admin password to live, regardless of what ends up in these files.

## 3. About the `dist/` folder in this delivery
`dist/` is a direct copy of `frontend/` — this project has no build step (plain HTML/CSS/JS), so "built" here just means "the static files as they'll be served." It's fine to drag-and-drop for a quick preview, but:
- **Employee creation won't work from a drag-and-drop deploy** — `netlify/functions/create-employee.js` only deploys via Git-connected or Netlify CLI deploys, which pick up `netlify.toml`'s `functions` directory. Drag-and-drop only uploads static assets.
- For real use, deploy via Git or `netlify deploy` from the project root so the function and env vars are included.

## 4. What's simplified — read before you rely on it
- **Table management** is "pick a table at checkout," not a full running-tab-per-table UI where items get added progressively across visits.
- **Offline queue** covers checkout only, via IndexedDB; not tested against real flaky-network conditions.
- **Bluetooth printing** uses a generic ESC/POS BLE UUID common on cheap thermal printers — untested against physical hardware, and many printer brands use a different profile entirely (see comments in `js/btPrint.js`).
- **Inventory auto-deduction** is a simple per-unit recipe (`product_ingredients`), not a full BOM/waste-tracking system.
