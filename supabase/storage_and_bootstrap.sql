-- =====================================================================
-- Run AFTER schema.sql
-- =====================================================================

-- 1) Storage bucket for product photos (public read, authenticated write).
insert into storage.buckets (id, name, public)
values ('product-images', 'product-images', true)
on conflict (id) do nothing;

create policy "product images are publicly readable"
  on storage.objects for select
  using (bucket_id = 'product-images');

-- Authenticated users may only upload into a folder that starts with their
-- own business_id, e.g. product-images/<business_id>/<file>.jpg — this keeps
-- tenant isolation even though the bucket itself is public-read.
create policy "tenants upload only into their own folder"
  on storage.objects for insert
  with check (
    bucket_id = 'product-images'
    and (storage.foldername(name))[1] = current_business_id()::text
  );

create policy "tenants manage only their own files"
  on storage.objects for update using (
    bucket_id = 'product-images' and (storage.foldername(name))[1] = current_business_id()::text
  );
create policy "tenants delete only their own files"
  on storage.objects for delete using (
    bucket_id = 'product-images' and (storage.foldername(name))[1] = current_business_id()::text
  );

-- =====================================================================
-- 2) Bootstrap your Super Admin account (run once).
--
--    Supabase Auth's email/password login requires a real email address —
--    "daddy" by itself isn't a valid identifier. Use something like
--    daddy@nexapos-admin.com (any domain you control, or your own email).
--
--    a) Supabase Dashboard → Authentication → Users → "Add user"
--         Email:    daddy@nexapos-admin.com   (use your real choice)
--         Password: set it there, in the dashboard — never in this file
--                    or in any file that gets committed/zipped. The
--                    dashboard is the one place a secret like this is
--                    supposed to live.
--    b) Copy the new user's UUID from that same Users list, then run:
--
--    insert into profiles (id, business_id, name, role)
--    values ('<paste-the-auth-user-uuid-here>', null, 'Super Admin', 'super_admin')
--    on conflict (id) do update set role = 'super_admin', business_id = null;
--
--    c) Sign in at /admin.html with that email + the password you set in
--       step (a). Change it any time from the same Dashboard screen.
-- =====================================================================
