// netlify/functions/create-employee.js
// The browser can never hold the Supabase service-role key, so creating a new
// auth user on behalf of an owner has to happen server-side. This function:
//   1. Verifies the caller's JWT and confirms they are owner/manager.
//   2. Creates the employee's auth.users row with the service role.
//   3. Inserts their profile row in the same business.
const { createClient } = require('@supabase/supabase-js');

const SUPABASE_URL = process.env.SUPABASE_URL;
const SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

exports.handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: JSON.stringify({ error: 'METHOD_NOT_ALLOWED' }) };
  }

  const authHeader = event.headers.authorization || event.headers.Authorization || '';
  const callerToken = authHeader.replace(/^Bearer\s+/i, '');
  if (!callerToken) return { statusCode: 401, body: JSON.stringify({ error: 'AUTH_REQUIRED' }) };

  const admin = createClient(SUPABASE_URL, SERVICE_ROLE_KEY);

  // Identify the caller from their access token.
  const { data: callerData, error: callerErr } = await admin.auth.getUser(callerToken);
  if (callerErr || !callerData?.user) {
    return { statusCode: 401, body: JSON.stringify({ error: 'INVALID_SESSION' }) };
  }

  const { data: callerProfile, error: profileErr } = await admin
    .from('profiles')
    .select('business_id, role')
    .eq('id', callerData.user.id)
    .single();
  if (profileErr || !callerProfile || !['owner', 'manager'].includes(callerProfile.role)) {
    return { statusCode: 403, body: JSON.stringify({ error: 'OWNER_OR_MANAGER_REQUIRED' }) };
  }

  let body;
  try { body = JSON.parse(event.body || '{}'); } catch { return { statusCode: 400, body: JSON.stringify({ error: 'INVALID_JSON' }) }; }
  const { name, email, password, role } = body;
  if (!name || !email || !password || password.length < 8) {
    return { statusCode: 400, body: JSON.stringify({ error: 'INVALID_INPUT' }) };
  }
  if (!['manager', 'cashier'].includes(role)) {
    return { statusCode: 400, body: JSON.stringify({ error: 'INVALID_ROLE' }) };
  }
  // Only the owner may create another manager; managers may only create cashiers.
  if (role === 'manager' && callerProfile.role !== 'owner') {
    return { statusCode: 403, body: JSON.stringify({ error: 'OWNER_REQUIRED_FOR_MANAGER' }) };
  }

  const { data: created, error: createErr } = await admin.auth.admin.createUser({
    email: email.toLowerCase(),
    password,
    email_confirm: true,
  });
  if (createErr) {
    const code = /already registered/i.test(createErr.message) ? 'EMAIL_EXISTS' : 'CREATE_FAILED';
    return { statusCode: 400, body: JSON.stringify({ error: code, detail: createErr.message }) };
  }

  const { error: insertErr } = await admin.from('profiles').insert({
    id: created.user.id,
    business_id: callerProfile.business_id,
    name,
    role,
  });
  if (insertErr) {
    await admin.auth.admin.deleteUser(created.user.id); // roll back the orphaned auth user
    return { statusCode: 400, body: JSON.stringify({ error: 'PROFILE_CREATE_FAILED', detail: insertErr.message }) };
  }

  return { statusCode: 200, body: JSON.stringify({ id: created.user.id, name, email, role }) };
};
