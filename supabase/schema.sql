-- =====================================================================
-- NEXA POS — Supabase schema (multi-tenant, RLS-isolated)
-- Run this once in your Supabase project's SQL editor (or via `supabase db push`).
-- =====================================================================

create extension if not exists pgcrypto;

-- ---------------------------------------------------------------------
-- Core tenant tables
-- ---------------------------------------------------------------------

create table if not exists businesses (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  currency text not null default 'IQD',
  locale text not null default 'ar',
  plan text not null default 'trial',
  subscription_expires_at timestamptz not null default (now() + interval '14 days'),
  created_at timestamptz not null default now()
);

-- One row per auth.users id. role: owner | manager | cashier | super_admin
-- super_admin rows have business_id = null (they aren't scoped to a shop).
create table if not exists profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  business_id uuid references businesses(id) on delete cascade,
  name text not null,
  role text not null check (role in ('owner','manager','cashier','super_admin')),
  is_active boolean not null default true,
  created_at timestamptz not null default now()
);

create table if not exists categories (
  id uuid primary key default gen_random_uuid(),
  business_id uuid not null references businesses(id) on delete cascade,
  name_ar text not null,
  name_en text not null default '',
  created_at timestamptz not null default now()
);

create table if not exists products (
  id uuid primary key default gen_random_uuid(),
  business_id uuid not null references businesses(id) on delete cascade,
  category_id uuid references categories(id) on delete set null,
  name_ar text not null,
  name_en text not null default '',
  price_iqd bigint not null check (price_iqd >= 0),
  image_url text default '',
  active boolean not null default true,
  created_at timestamptz not null default now()
);

create table if not exists shifts (
  id uuid primary key default gen_random_uuid(),
  business_id uuid not null references businesses(id) on delete cascade,
  opened_by uuid not null references profiles(id),
  handed_to uuid references profiles(id),
  status text not null default 'open', -- open | handover | closed
  opening_cash_iqd bigint not null default 0,
  closing_cash_iqd bigint,
  opened_at timestamptz not null default now(),
  handed_over_at timestamptz,
  closed_at timestamptz
);

create table if not exists orders (
  id uuid primary key default gen_random_uuid(),
  business_id uuid not null references businesses(id) on delete cascade,
  shift_id uuid references shifts(id),
  employee_id uuid references profiles(id),
  subtotal_iqd bigint not null default 0,
  discount_iqd bigint not null default 0,
  total_iqd bigint not null default 0,
  status text not null default 'paid', -- paid | voided
  voided_by uuid references profiles(id),
  voided_at timestamptz,
  void_reason text default '',
  created_at timestamptz not null default now()
);

create table if not exists order_items (
  id uuid primary key default gen_random_uuid(),
  order_id uuid not null references orders(id) on delete cascade,
  product_id uuid references products(id) on delete set null,
  product_name_ar text not null,
  product_name_en text not null default '',
  qty integer not null check (qty > 0),
  unit_price_iqd bigint not null,
  line_total_iqd bigint not null
);

create table if not exists payments (
  id uuid primary key default gen_random_uuid(),
  order_id uuid not null references orders(id) on delete cascade,
  method text not null, -- cash | visa | zaincash
  amount_iqd bigint not null check (amount_iqd >= 0),
  terminal_ref text default '',
  status text not null default 'confirmed',
  created_at timestamptz not null default now()
);

-- ---------------------------------------------------------------------
-- Inventory & purchases (manager-only feature)
-- ---------------------------------------------------------------------

create table if not exists inventory_items (
  id uuid primary key default gen_random_uuid(),
  business_id uuid not null references businesses(id) on delete cascade,
  name_ar text not null,
  name_en text not null default '',
  unit text not null default 'unit',
  quantity_on_hand numeric not null default 0,
  low_stock_threshold numeric not null default 0,
  created_at timestamptz not null default now()
);

create table if not exists purchases (
  id uuid primary key default gen_random_uuid(),
  business_id uuid not null references businesses(id) on delete cascade,
  item_id uuid not null references inventory_items(id) on delete cascade,
  qty numeric not null check (qty <> 0), -- positive = purchase, negative = manual adjustment/wastage
  unit_cost_iqd bigint not null default 0,
  total_cost_iqd bigint not null default 0,
  note text default '',
  purchased_by uuid references profiles(id),
  purchased_at timestamptz not null default now()
);

create table if not exists audit_logs (
  id uuid primary key default gen_random_uuid(),
  business_id uuid references businesses(id) on delete cascade,
  user_id uuid references profiles(id),
  action text not null,
  entity_type text not null,
  entity_id uuid,
  details jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

-- ---------------------------------------------------------------------
-- Subscription plans & renewal requests (super admin controlled)
-- ---------------------------------------------------------------------

create table if not exists plan_prices (
  plan text primary key check (plan in ('monthly','quarterly','half_yearly','yearly')),
  duration_days integer not null,
  price_iqd bigint not null,
  updated_at timestamptz not null default now()
);
insert into plan_prices (plan, duration_days, price_iqd) values
  ('monthly', 30, 25000),
  ('quarterly', 90, 65000),
  ('half_yearly', 182, 120000),
  ('yearly', 365, 220000)
on conflict (plan) do nothing;

create table if not exists subscription_requests (
  id uuid primary key default gen_random_uuid(),
  business_id uuid not null references businesses(id) on delete cascade,
  plan text not null references plan_prices(plan),
  status text not null default 'pending', -- pending | approved | rejected
  requested_at timestamptz not null default now(),
  resolved_at timestamptz,
  resolved_by uuid references profiles(id)
);

create index if not exists idx_products_business on products(business_id);
create index if not exists idx_categories_business on categories(business_id);
create index if not exists idx_orders_business_date on orders(business_id, created_at);
create index if not exists idx_shifts_business_date on shifts(business_id, opened_at);
create index if not exists idx_payments_order on payments(order_id);
create index if not exists idx_purchases_business on purchases(business_id);
create index if not exists idx_inventory_business on inventory_items(business_id);
create index if not exists idx_subreq_business on subscription_requests(business_id);

-- =====================================================================
-- Helper functions (SECURITY DEFINER so they can read `profiles` even
-- though `profiles` itself has RLS enabled — this is the standard
-- Supabase pattern for avoiding recursive-policy issues).
-- =====================================================================

create or replace function current_business_id()
returns uuid language sql stable security definer set search_path = public as $$
  select business_id from profiles where id = auth.uid()
$$;

create or replace function current_app_role()
returns text language sql stable security definer set search_path = public as $$
  select role from profiles where id = auth.uid()
$$;

create or replace function is_super_admin()
returns boolean language sql stable security definer set search_path = public as $$
  select exists(select 1 from profiles where id = auth.uid() and role = 'super_admin')
$$;

create or replace function is_manager_or_owner()
returns boolean language sql stable security definer set search_path = public as $$
  select exists(select 1 from profiles where id = auth.uid() and role in ('owner','manager'))
$$;

-- Atomically creates a business + its owner profile for the *currently
-- authenticated* auth user (called right after supabase.auth.signUp()).
-- SECURITY DEFINER lets it insert into `businesses` even though there is
-- no general INSERT policy on that table for regular users.
create or replace function create_business_for_current_user(business_name text, owner_name text, biz_locale text default 'ar')
returns businesses language plpgsql security definer set search_path = public as $$
declare
  new_biz businesses;
begin
  if exists (select 1 from profiles where id = auth.uid()) then
    raise exception 'PROFILE_ALREADY_EXISTS';
  end if;

  insert into businesses (name, locale) values (business_name, biz_locale) returning * into new_biz;
  insert into profiles (id, business_id, name, role) values (auth.uid(), new_biz.id, owner_name, 'owner');
  return new_biz;
end;
$$;

-- =====================================================================
-- Row Level Security
-- =====================================================================

alter table businesses enable row level security;
alter table profiles enable row level security;
alter table categories enable row level security;
alter table products enable row level security;
alter table shifts enable row level security;
alter table orders enable row level security;
alter table order_items enable row level security;
alter table payments enable row level security;
alter table inventory_items enable row level security;
alter table purchases enable row level security;
alter table audit_logs enable row level security;
alter table plan_prices enable row level security;
alter table subscription_requests enable row level security;

-- businesses: every member of the shop can read their own row; super admin reads all.
-- No general INSERT policy (creation goes through create_business_for_current_user only).
create policy biz_select on businesses for select
  using (id = current_business_id() or is_super_admin());
create policy biz_update_owner on businesses for update
  using (id = current_business_id() and current_app_role() = 'owner')
  with check (id = current_business_id() and current_app_role() = 'owner');
-- Owners may only touch name/currency/locale, never plan/expiry — enforced in the app layer
-- (RLS can't easily restrict to a column subset) plus a trigger guard below.
create policy biz_update_super_admin on businesses for update
  using (is_super_admin()) with check (is_super_admin());

create or replace function prevent_owner_editing_subscription()
returns trigger language plpgsql as $$
begin
  if not is_super_admin() then
    new.plan := old.plan;
    new.subscription_expires_at := old.subscription_expires_at;
  end if;
  return new;
end;
$$;
drop trigger if exists trg_guard_subscription on businesses;
create trigger trg_guard_subscription before update on businesses
  for each row execute function prevent_owner_editing_subscription();

-- profiles: see your own row, or any profile in your business, or all if super admin.
create policy profiles_select on profiles for select
  using (id = auth.uid() or business_id = current_business_id() or is_super_admin());
create policy profiles_update_self on profiles for update
  using (id = auth.uid()) with check (id = auth.uid());
create policy profiles_update_owner on profiles for update
  using (business_id = current_business_id() and current_app_role() = 'owner' and role <> 'owner')
  with check (business_id = current_business_id() and role <> 'owner');
-- Employee profile rows themselves are inserted by the create-employee Netlify
-- Function using the service role key (creating an auth user requires admin
-- privileges the browser must never hold), so no client INSERT policy here.

-- Generic tenant-isolation policy, reused for every shop-scoped table.
create policy tenant_all on categories for all
  using (business_id = current_business_id() or is_super_admin())
  with check (business_id = current_business_id() or is_super_admin());

create policy tenant_all on products for all
  using (business_id = current_business_id() or is_super_admin())
  with check (business_id = current_business_id() or is_super_admin());

create policy tenant_all on shifts for all
  using (business_id = current_business_id() or is_super_admin())
  with check (business_id = current_business_id() or is_super_admin());

-- Orders: everyone in the shop can insert/select; only manager/owner can update
-- (used exclusively for voiding — see void_order() below which double-checks role too).
-- Orders: cashiers may INSERT (checkout) but only manager/owner may SELECT —
-- reports and order history are a manager/owner privilege per the role spec.
-- (A cashier's own just-completed receipt is rendered client-side from the
-- create_order() return value, never re-read from the table.)
create policy orders_select on orders for select
  using ((business_id = current_business_id() and is_manager_or_owner()) or is_super_admin());
create policy orders_insert on orders for insert
  with check (business_id = current_business_id());
create policy orders_update_void on orders for update
  using (business_id = current_business_id() and is_manager_or_owner())
  with check (business_id = current_business_id());

create policy order_items_all on order_items for all
  using (exists (select 1 from orders o where o.id = order_id and o.business_id = current_business_id() and (is_manager_or_owner() or is_super_admin())))
  with check (exists (select 1 from orders o where o.id = order_id and o.business_id = current_business_id()));

create policy payments_all on payments for all
  using (exists (select 1 from orders o where o.id = order_id and o.business_id = current_business_id() and (is_manager_or_owner() or is_super_admin())))
  with check (exists (select 1 from orders o where o.id = order_id and o.business_id = current_business_id()));

-- Inventory & purchases: manager/owner only (cashiers get no access at all).
create policy inventory_manager_only on inventory_items for all
  using (business_id = current_business_id() and (is_manager_or_owner() or is_super_admin()))
  with check (business_id = current_business_id() and is_manager_or_owner());

create policy purchases_manager_only on purchases for all
  using (business_id = current_business_id() and (is_manager_or_owner() or is_super_admin()))
  with check (business_id = current_business_id() and is_manager_or_owner());

create policy audit_select on audit_logs for select
  using (business_id = current_business_id() or is_super_admin());
create policy audit_insert on audit_logs for insert
  with check (business_id = current_business_id());

-- plan_prices: anyone signed in can read (so owners see pricing); only super admin edits.
create policy plan_prices_select on plan_prices for select using (true);
create policy plan_prices_write on plan_prices for all
  using (is_super_admin()) with check (is_super_admin());

-- subscription_requests: shop can create/read its own; only super admin can resolve.
create policy subreq_select on subscription_requests for select
  using (business_id = current_business_id() or is_super_admin());
create policy subreq_insert on subscription_requests for insert
  with check (business_id = current_business_id() and current_app_role() = 'owner');
create policy subreq_update_super_admin on subscription_requests for update
  using (is_super_admin()) with check (is_super_admin());

-- =====================================================================
-- RPC: void an order (defense in depth — role is re-checked here even
-- though the UI already hides the button from cashiers).
-- =====================================================================
create or replace function void_order(p_order_id uuid, p_reason text default '')
returns orders language plpgsql security definer set search_path = public as $$
declare
  result orders;
begin
  if not is_manager_or_owner() then
    raise exception 'MANAGER_REQUIRED';
  end if;
  update orders set status = 'voided', voided_by = auth.uid(), voided_at = now(), void_reason = p_reason
    where id = p_order_id and business_id = current_business_id()
    returning * into result;
  if result.id is null then
    raise exception 'ORDER_NOT_FOUND';
  end if;
  insert into audit_logs (business_id, user_id, action, entity_type, entity_id, details)
    values (current_business_id(), auth.uid(), 'ORDER_VOIDED', 'order', p_order_id, jsonb_build_object('reason', p_reason));
  return result;
end;
$$;

-- =====================================================================
-- RPC: super admin approves a pending subscription request, extending
-- the business's expiry by the plan's duration.
-- =====================================================================
create or replace function approve_subscription_request(p_request_id uuid)
returns businesses language plpgsql security definer set search_path = public as $$
declare
  req subscription_requests;
  dur integer;
  biz businesses;
begin
  if not is_super_admin() then raise exception 'SUPER_ADMIN_REQUIRED'; end if;
  select * into req from subscription_requests where id = p_request_id and status = 'pending';
  if req.id is null then raise exception 'REQUEST_NOT_FOUND'; end if;

  select duration_days into dur from plan_prices where plan = req.plan;
  update businesses set plan = req.plan,
    subscription_expires_at = greatest(subscription_expires_at, now()) + (dur || ' days')::interval
    where id = req.business_id returning * into biz;
  update subscription_requests set status='approved', resolved_at=now(), resolved_by=auth.uid() where id = p_request_id;
  return biz;
end;
$$;

-- Super admin can directly grant/extend a trial or subscription without a request
-- (covers "grant a 14-day trial", "manually activate", from the admin panel).
create or replace function admin_set_subscription(p_business_id uuid, p_plan text, p_days integer)
returns businesses language plpgsql security definer set search_path = public as $$
declare biz businesses;
begin
  if not is_super_admin() then raise exception 'SUPER_ADMIN_REQUIRED'; end if;
  update businesses set plan = p_plan,
    subscription_expires_at = greatest(subscription_expires_at, now()) + (p_days || ' days')::interval
    where id = p_business_id returning * into biz;
  return biz;
end;
$$;

-- =====================================================================
-- RPC: create_order — atomic checkout (mirrors the old Express logic).
-- p_items:    [{"product_id":"uuid","qty":2}, ...]
-- p_payments: [{"method":"cash","amount_iqd":5000,"terminal_ref":""}, ...]
-- =====================================================================
create or replace function create_order(p_shift_id uuid, p_discount_iqd bigint, p_items jsonb, p_payments jsonb)
returns orders language plpgsql security definer set search_path = public as $$
declare
  biz uuid := current_business_id();
  subtotal bigint := 0;
  discount bigint := greatest(0, coalesce(p_discount_iqd, 0));
  total bigint;
  paid bigint := 0;
  item jsonb;
  prod products;
  qty int;
  line_total bigint;
  new_order orders;
  pay jsonb;
begin
  if biz is null then raise exception 'NO_BUSINESS'; end if;
  if jsonb_array_length(p_items) = 0 then raise exception 'EMPTY_ORDER'; end if;

  if p_shift_id is not null then
    if not exists (select 1 from shifts where id = p_shift_id and business_id = biz and status in ('open','handover')) then
      raise exception 'INVALID_SHIFT';
    end if;
  end if;

  -- Pass 1: validate products & compute subtotal.
  for item in select * from jsonb_array_elements(p_items) loop
    select * into prod from products where id = (item->>'product_id')::uuid and business_id = biz;
    if prod.id is null then raise exception 'PRODUCT_NOT_FOUND'; end if;
    qty := greatest(1, floor((item->>'qty')::numeric));
    subtotal := subtotal + qty * prod.price_iqd;
  end loop;

  discount := least(discount, subtotal);
  total := subtotal - discount;

  for pay in select * from jsonb_array_elements(p_payments) loop
    paid := paid + greatest(0, round((pay->>'amount_iqd')::numeric));
  end loop;
  if paid <> total then raise exception 'PAYMENT_MISMATCH'; end if;

  insert into orders (business_id, shift_id, employee_id, subtotal_iqd, discount_iqd, total_iqd)
    values (biz, p_shift_id, auth.uid(), subtotal, discount, total) returning * into new_order;

  for item in select * from jsonb_array_elements(p_items) loop
    select * into prod from products where id = (item->>'product_id')::uuid and business_id = biz;
    qty := greatest(1, floor((item->>'qty')::numeric));
    line_total := qty * prod.price_iqd;
    insert into order_items (order_id, product_id, product_name_ar, product_name_en, qty, unit_price_iqd, line_total_iqd)
      values (new_order.id, prod.id, prod.name_ar, prod.name_en, qty, prod.price_iqd, line_total);
  end loop;

  for pay in select * from jsonb_array_elements(p_payments) loop
    insert into payments (order_id, method, amount_iqd, terminal_ref, status)
      values (new_order.id, pay->>'method', round((pay->>'amount_iqd')::numeric), coalesce(pay->>'terminal_ref',''), 'confirmed');
  end loop;

  insert into audit_logs (business_id, user_id, action, entity_type, entity_id, details)
    values (biz, auth.uid(), 'ORDER_CREATED', 'order', new_order.id, jsonb_build_object('total', total, 'discount', discount));

  return new_order;
end;
$$;

-- =====================================================================
-- RPC: record_purchase — adds stock and logs the purchase atomically.
-- =====================================================================
create or replace function record_purchase(p_item_id uuid, p_qty numeric, p_total_cost_iqd bigint, p_note text default '')
returns inventory_items language plpgsql security definer set search_path = public as $$
declare
  biz uuid := current_business_id();
  result inventory_items;
begin
  if not is_manager_or_owner() then raise exception 'MANAGER_REQUIRED'; end if;
  if not exists (select 1 from inventory_items where id = p_item_id and business_id = biz) then
    raise exception 'ITEM_NOT_FOUND';
  end if;

  insert into purchases (business_id, item_id, qty, unit_cost_iqd, total_cost_iqd, note, purchased_by)
    values (biz, p_item_id, p_qty,
      case when p_qty <> 0 then round(p_total_cost_iqd / abs(p_qty)) else 0 end,
      p_total_cost_iqd, p_note, auth.uid());

  update inventory_items set quantity_on_hand = quantity_on_hand + p_qty
    where id = p_item_id returning * into result;
  return result;
end;
$$;

-- =====================================================================
-- Phase 3 additions: tables, customer debt, expenses, inventory
-- auto-deduction (BOM), branding, service charge.
-- =====================================================================

alter table businesses add column if not exists logo_url text default '';
alter table businesses add column if not exists use_artistic_branding boolean not null default true;
alter table businesses add column if not exists service_charge_percent numeric not null default 0;

alter table orders add column if not exists table_id uuid;
alter table orders add column if not exists customer_id uuid;
alter table orders add column if not exists payment_status text not null default 'paid'; -- paid | debt | partial
alter table orders add column if not exists service_charge_iqd bigint not null default 0;

create table if not exists shop_tables (
  id uuid primary key default gen_random_uuid(),
  business_id uuid not null references businesses(id) on delete cascade,
  label text not null,
  kind text not null default 'dine_in' check (kind in ('dine_in','takeaway','delivery')),
  created_at timestamptz not null default now()
);
alter table orders add constraint orders_table_fk foreign key (table_id) references shop_tables(id) on delete set null;

create table if not exists customers (
  id uuid primary key default gen_random_uuid(),
  business_id uuid not null references businesses(id) on delete cascade,
  name text not null,
  phone text default '',
  created_at timestamptz not null default now()
);
alter table orders add constraint orders_customer_fk foreign key (customer_id) references customers(id) on delete set null;

create table if not exists debt_payments (
  id uuid primary key default gen_random_uuid(),
  business_id uuid not null references businesses(id) on delete cascade,
  customer_id uuid not null references customers(id) on delete cascade,
  order_id uuid references orders(id) on delete set null,
  amount_iqd bigint not null check (amount_iqd > 0),
  recorded_by uuid references profiles(id),
  recorded_at timestamptz not null default now()
);

create table if not exists expenses (
  id uuid primary key default gen_random_uuid(),
  business_id uuid not null references businesses(id) on delete cascade,
  category text not null,
  amount_iqd bigint not null check (amount_iqd >= 0),
  note text default '',
  recorded_by uuid references profiles(id),
  recorded_at timestamptz not null default now()
);

-- Bill-of-materials: how much of each inventory item one unit of a product consumes.
-- Products with no rows here simply don't auto-deduct anything (backward compatible).
create table if not exists product_ingredients (
  id uuid primary key default gen_random_uuid(),
  business_id uuid not null references businesses(id) on delete cascade,
  product_id uuid not null references products(id) on delete cascade,
  item_id uuid not null references inventory_items(id) on delete cascade,
  qty_per_unit numeric not null check (qty_per_unit > 0),
  unique (product_id, item_id)
);

create index if not exists idx_tables_business on shop_tables(business_id);
create index if not exists idx_customers_business on customers(business_id);
create index if not exists idx_expenses_business_date on expenses(business_id, recorded_at);
create index if not exists idx_debtpay_customer on debt_payments(customer_id);
create index if not exists idx_ingredients_product on product_ingredients(product_id);

alter table shop_tables enable row level security;
alter table customers enable row level security;
alter table debt_payments enable row level security;
alter table expenses enable row level security;
alter table product_ingredients enable row level security;

create policy tenant_all on shop_tables for all
  using (business_id = current_business_id() or is_super_admin())
  with check (business_id = current_business_id() or is_super_admin());

create policy tenant_all on customers for all
  using (business_id = current_business_id() or is_super_admin())
  with check (business_id = current_business_id() or is_super_admin());

create policy debtpay_all on debt_payments for all
  using (business_id = current_business_id() or is_super_admin())
  with check (business_id = current_business_id());

-- Expenses & inventory BOM: manager/owner only, matching the Inventory section's access rule.
create policy expenses_manager_only on expenses for all
  using (business_id = current_business_id() and (is_manager_or_owner() or is_super_admin()))
  with check (business_id = current_business_id() and is_manager_or_owner());

create policy ingredients_manager_only on product_ingredients for all
  using (business_id = current_business_id() and (is_manager_or_owner() or is_super_admin()))
  with check (business_id = current_business_id() and is_manager_or_owner());

-- =====================================================================
-- Replace create_order to add: service charge, customer debt, and
-- automatic ingredient deduction from inventory.
-- =====================================================================
drop function if exists create_order(uuid, bigint, jsonb, jsonb);

create or replace function create_order(
  p_shift_id uuid, p_discount_iqd bigint, p_items jsonb, p_payments jsonb,
  p_table_id uuid default null, p_customer_id uuid default null
)
returns orders language plpgsql security definer set search_path = public as $$
declare
  biz uuid := current_business_id();
  subtotal bigint := 0;
  discount bigint := greatest(0, coalesce(p_discount_iqd, 0));
  svc_pct numeric;
  service_charge bigint;
  total bigint;
  paid bigint := 0;
  item jsonb;
  prod products;
  qty int;
  line_total bigint;
  new_order orders;
  pay jsonb;
  ing record;
  pay_status text := 'paid';
begin
  if biz is null then raise exception 'NO_BUSINESS'; end if;
  if jsonb_array_length(p_items) = 0 then raise exception 'EMPTY_ORDER'; end if;

  if p_shift_id is not null then
    if not exists (select 1 from shifts where id = p_shift_id and business_id = biz and status in ('open','handover')) then
      raise exception 'INVALID_SHIFT';
    end if;
  end if;

  for item in select * from jsonb_array_elements(p_items) loop
    select * into prod from products where id = (item->>'product_id')::uuid and business_id = biz;
    if prod.id is null then raise exception 'PRODUCT_NOT_FOUND'; end if;
    qty := greatest(1, floor((item->>'qty')::numeric));
    subtotal := subtotal + qty * prod.price_iqd;
  end loop;

  discount := least(discount, subtotal);
  select service_charge_percent into svc_pct from businesses where id = biz;
  service_charge := round((subtotal - discount) * coalesce(svc_pct,0) / 100.0);
  total := subtotal - discount + service_charge;

  for pay in select * from jsonb_array_elements(p_payments) loop
    paid := paid + greatest(0, round((pay->>'amount_iqd')::numeric));
  end loop;

  if p_customer_id is not null and paid = 0 then
    pay_status := 'debt';
  elsif paid <> total then
    raise exception 'PAYMENT_MISMATCH';
  end if;

  insert into orders (business_id, shift_id, employee_id, subtotal_iqd, discount_iqd, service_charge_iqd, total_iqd, table_id, customer_id, payment_status)
    values (biz, p_shift_id, auth.uid(), subtotal, discount, service_charge, total, p_table_id, p_customer_id, pay_status)
    returning * into new_order;

  for item in select * from jsonb_array_elements(p_items) loop
    select * into prod from products where id = (item->>'product_id')::uuid and business_id = biz;
    qty := greatest(1, floor((item->>'qty')::numeric));
    line_total := qty * prod.price_iqd;
    insert into order_items (order_id, product_id, product_name_ar, product_name_en, qty, unit_price_iqd, line_total_iqd)
      values (new_order.id, prod.id, prod.name_ar, prod.name_en, qty, prod.price_iqd, line_total);

    -- Auto-deduct any ingredients this product is recipe-linked to.
    for ing in select item_id, qty_per_unit from product_ingredients where product_id = prod.id loop
      update inventory_items set quantity_on_hand = quantity_on_hand - (ing.qty_per_unit * qty)
        where id = ing.item_id and business_id = biz;
    end loop;
  end loop;

  if pay_status <> 'debt' then
    for pay in select * from jsonb_array_elements(p_payments) loop
      insert into payments (order_id, method, amount_iqd, terminal_ref, status)
        values (new_order.id, pay->>'method', round((pay->>'amount_iqd')::numeric), coalesce(pay->>'terminal_ref',''), 'confirmed');
    end loop;
  end if;

  insert into audit_logs (business_id, user_id, action, entity_type, entity_id, details)
    values (biz, auth.uid(), 'ORDER_CREATED', 'order', new_order.id, jsonb_build_object('total', total, 'discount', discount, 'payment_status', pay_status));

  return new_order;
end;
$$;

-- Settle part or all of a customer's debt (records payment + flips status once cleared).
create or replace function settle_debt(p_order_id uuid, p_amount_iqd bigint, p_method text default 'cash')
returns orders language plpgsql security definer set search_path = public as $$
declare
  ord orders;
  already_paid bigint;
begin
  select * into ord from orders where id = p_order_id and business_id = current_business_id();
  if ord.id is null then raise exception 'ORDER_NOT_FOUND'; end if;
  if ord.payment_status = 'paid' then raise exception 'ALREADY_PAID'; end if;

  insert into payments (order_id, method, amount_iqd, status) values (p_order_id, p_method, p_amount_iqd, 'confirmed');
  insert into debt_payments (business_id, customer_id, order_id, amount_iqd, recorded_by)
    values (current_business_id(), ord.customer_id, p_order_id, p_amount_iqd, auth.uid());

  select coalesce(sum(amount_iqd),0) into already_paid from payments where order_id = p_order_id;
  update orders set payment_status = case when already_paid >= total_iqd then 'paid' else 'partial' end
    where id = p_order_id returning * into ord;
  return ord;
end;
$$;
