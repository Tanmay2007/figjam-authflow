// script.js (vanilla JS, ESM)
// - Handles tab toggle (Sign In / Sign Up)
// - Basic form validation
// - Supabase auth (email/password) with redirects

import { SUPABASE_URL, SUPABASE_ANON_KEY } from './config.js';

// Lazy import Supabase client from CDN as ESM when credentials are present
let supabase = null;
async function ensureSupabase() {
  if (!SUPABASE_URL || !SUPABASE_ANON_KEY) return null;
  if (supabase) return supabase;
  const { createClient } = await import('https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/+esm');
  supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
  return supabase;
}

// Utilities
const $ = (sel, root = document) => root.querySelector(sel);
const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));
const messageEl = $('#message');

function setMessage(text, type = 'info') {
  if (!text) { messageEl.hidden = true; messageEl.textContent = ''; messageEl.className = 'message'; return; }
  messageEl.hidden = false;
  messageEl.textContent = text;
  messageEl.className = 'message' + (type === 'error' ? ' is-error' : type === 'success' ? ' is-success' : '');
}

function setLoading(button, isLoading) {
  if (!button) return;
  button.classList.toggle('is-loading', !!isLoading);
  button.disabled = !!isLoading;
}

function toggleView(target) {
  const isSignIn = target === 'signin';
  $('.tab[data-toggle="signin"]').classList.toggle('is-active', isSignIn);
  $('.tab[data-toggle="signup"]').classList.toggle('is-active', !isSignIn);
  $('.nav-link[data-toggle="signin"]').classList.toggle('is-active', isSignIn);
  $('.nav-link[data-toggle="signup"]').classList.toggle('is-active', !isSignIn);

  $('#panel-signin').classList.toggle('is-active', isSignIn);
  $('#panel-signup').classList.toggle('is-active', !isSignIn);
  if (isSignIn) {
    $('#panel-signup').setAttribute('hidden', '');
    $('#panel-signin').removeAttribute('hidden');
  } else {
    $('#panel-signin').setAttribute('hidden', '');
    $('#panel-signup').removeAttribute('hidden');
  }
  setMessage('');
}

// Initialize tab links
$$('[data-toggle]').forEach(el => {
  el.addEventListener('click', (e) => {
    e.preventDefault();
    const target = el.getAttribute('data-toggle');
    toggleView(target);
    history.replaceState(null, '', `#${target}`);
  })
});

// Apply initial hash
const initial = location.hash.replace('#', '') || 'signin';
if (initial === 'signup') toggleView('signup'); else toggleView('signin');

// Icons for password toggles
$$('[data-toggle-password]').forEach(btn => {
  btn.addEventListener('click', () => {
    const id = btn.getAttribute('data-toggle-password');
    const input = document.getElementById(id);
    const isOn = input.getAttribute('type') === 'password';
    input.setAttribute('type', isOn ? 'text' : 'password');
    btn.classList.toggle('is-on', isOn);
  });
});

// Basic validators
function isEmail(v) { return /\S+@\S+\.\S+/.test(v); }
function setFieldError(id, msg = '') {
  const p = document.querySelector(`[data-error-for="${id}"]`);
  if (p) p.textContent = msg;
}

// Sign In
$('#signin-form').addEventListener('submit', async (e) => {
  e.preventDefault();
  setMessage('');

  const email = $('#signin-email').value.trim();
  const password = $('#signin-password').value;
  setFieldError('signin-email');
  setFieldError('signin-password');

  // Client validation
  if (!isEmail(email)) { setFieldError('signin-email', 'Enter a valid email.'); return; }
  if (!password || password.length < 6) { setFieldError('signin-password', 'Password must be at least 6 characters.'); return; }

  const btn = $('#signin-submit');
  setLoading(btn, true);
  try {
    const client = await ensureSupabase();
    if (!client) {
      setMessage('Supabase not configured. Click the green Supabase button to connect, then add your URL and anon key in config.js.', 'error');
      return;
    }
    const { error } = await client.auth.signInWithPassword({ email, password });
    if (error) {
      setMessage(error.message, 'error');
      return;
    }
    // Success
    setMessage('Signed in successfully! Redirecting…', 'success');
    setTimeout(() => { window.location.href = '/dashboard.html'; }, 800);
  } catch (err) {
    setMessage('Unexpected error. Please try again.', 'error');
    console.error(err);
  } finally {
    setLoading(btn, false);
  }
});

// Sign Up
$('#signup-form').addEventListener('submit', async (e) => {
  e.preventDefault();
  setMessage('');

  const name = $('#signup-name').value.trim();
  const email = $('#signup-email').value.trim();
  const password = $('#signup-password').value;
  const confirm = $('#signup-confirm').value;

  setFieldError('signup-name');
  setFieldError('signup-email');
  setFieldError('signup-password');
  setFieldError('signup-confirm');

  // Client validation
  if (!name) { setFieldError('signup-name', 'Full name is required.'); return; }
  if (!isEmail(email)) { setFieldError('signup-email', 'Enter a valid email.'); return; }
  if (!password || password.length < 6) { setFieldError('signup-password', 'Password must be at least 6 characters.'); return; }
  if (password !== confirm) { setFieldError('signup-confirm', 'Passwords do not match.'); return; }

  const btn = $('#signup-submit');
  setLoading(btn, true);
  try {
    const client = await ensureSupabase();
    if (!client) {
      setMessage('Supabase not configured. Click the green Supabase button to connect, then add your URL and anon key in config.js.', 'error');
      return;
    }
    const { error } = await client.auth.signUp({
      email,
      password,
      options: { data: { full_name: name } }
    });
    if (error) {
      setMessage(error.message, 'error');
      return;
    }
    setMessage('Account created! Please check your email to verify your address.', 'success');
    // Optionally auto-redirect to sign-in
    toggleView('signin');
    history.replaceState(null, '', '#signin');
  } catch (err) {
    setMessage('Unexpected error. Please try again.', 'error');
    console.error(err);
  } finally {
    setLoading(btn, false);
  }
});

// Footer year
$('#year').textContent = new Date().getFullYear();
