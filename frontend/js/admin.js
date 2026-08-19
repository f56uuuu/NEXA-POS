let adminProfile = null;

document.getElementById('adminLoginForm').addEventListener('submit', async (e) => {
  e.preventDefault();
  const errEl = document.getElementById('adminAuthError'); errEl.hidden = true;
  const email = document.getElementById('adminEmail').value.trim();
  const password = document.getElementById('adminPassword').value;
  const { error } = await supabase.auth.signInWithPassword({ email, password });
  if (error) { errEl.textContent = error.message; errEl.hidden = false; return; }
  await bootAdmin();
});
document.getElementById('adminLogout').addEventListener('click', async () => {
  await supabase.auth.signOut();
  document.getElementById('adminShell').hidden = true;
  document.getElementById('adminAuth').hidden = false;
});

document.querySelectorAll('.nav-item').forEach(btn => btn.addEventListener('click', () => {
  document.querySelectorAll('.nav-item').forEach(b => b.classList.toggle('active', b === btn));
  document.querySelectorAll('.view').forEach(v => v.classList.toggle('active', v.id === `view-${btn.dataset.view}`));
  if (btn.dataset.view === 'tenants') loadTenants();
  if (btn.dataset.view === 'requests') loadRequests();
  if (btn.dataset.view === 'pricing') loadPricing();
}));

async function bootAdmin() {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return;
  const { data: prof } = await supabase.from('profiles').select('*').eq('id', user.id).single();
  if (!prof || prof.role !== 'super_admin') {
    document.getElementById('adminAuthError').textContent = 'This account is not a super admin.';
    document.getElementById('adminAuthError').hidden = false;
    await supabase.auth.signOut();
    return;
  }
  adminProfile = prof;
  document.getElementById('adminAuth').hidden = true;
  document.getElementById('adminShell').hidden = false;
  await loadTenants();
}

async function loadTenants() {
  const { data } = await supabase.from('businesses').select('*').order('created_at', { ascending:false });
  const ul = document.getElementById('tenantList');
  ul.innerHTML = (data||[]).map(b => {
    const expired = new Date(b.subscription_expires_at) < new Date();
    const expires = new Date(b.subscription_expires_at).toLocaleDateString();
    return `<li>
      <span>${b.name} — plan: ${b.plan} — expires: ${expires} <span class="tag ${expired?'off':''}">${expired?'expired':'active'}</span></span>
      <span style="display:flex;gap:6px">
        <button class="void-btn" style="border-color:var(--ok);color:var(--ok)" data-extend="${b.id}" data-days="30">+30d</button>
        <button class="void-btn" style="border-color:var(--ok);color:var(--ok)" data-extend="${b.id}" data-days="14">+14d trial</button>
      </span>
    </li>`;
  }).join('') || `<li class="emp-empty">—</li>`;
  ul.querySelectorAll('[data-extend]').forEach(btn => btn.addEventListener('click', async () => {
    await supabase.rpc('admin_set_subscription', { p_business_id: btn.dataset.extend, p_plan: 'trial', p_days: Number(btn.dataset.days) });
    await loadTenants();
  }));
}

async function loadRequests() {
  const { data } = await supabase.from('subscription_requests').select('*, businesses(name)').eq('status','pending').order('requested_at');
  const ul = document.getElementById('requestList');
  ul.innerHTML = (data||[]).map(r => `
    <li><span>${r.businesses?.name || r.business_id} — ${r.plan} — ${new Date(r.requested_at).toLocaleString()}</span>
      <button class="void-btn" style="border-color:var(--ok);color:var(--ok)" data-approve="${r.id}">Approve</button></li>`).join('') || `<li class="emp-empty">No pending requests.</li>`;
  ul.querySelectorAll('[data-approve]').forEach(btn => btn.addEventListener('click', async () => {
    const { error } = await supabase.rpc('approve_subscription_request', { p_request_id: btn.dataset.approve });
    if (error) alert(error.message); else await loadRequests();
  }));
}

async function loadPricing() {
  const { data } = await supabase.from('plan_prices').select('*').order('duration_days');
  const wrap = document.getElementById('pricingCards');
  wrap.innerHTML = (data||[]).map(p => `
    <div class="card">
      <h3>${p.plan} (${p.duration_days} days)</h3>
      <div class="inline-form row">
        <input type="number" id="price-${p.plan}" value="${p.price_iqd}" />
        <button class="primary-btn small" data-save="${p.plan}">Save</button>
      </div>
    </div>`).join('');
  wrap.querySelectorAll('[data-save]').forEach(btn => btn.addEventListener('click', async () => {
    const price_iqd = Number(document.getElementById(`price-${btn.dataset.save}`).value);
    await supabase.from('plan_prices').update({ price_iqd, updated_at: new Date().toISOString() }).eq('plan', btn.dataset.save);
    alert('Saved.');
  }));
}

(async () => {
  const { data: { session } } = await supabase.auth.getSession();
  if (session) await bootAdmin();
})();
