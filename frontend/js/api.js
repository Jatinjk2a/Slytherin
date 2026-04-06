/**
 * api.js — Central API client for README AI
 * All backend communication goes through this module.
 */

const API_BASE = 'http://localhost:5000';

// ── Token Storage ─────────────────────────────────────────────────────────────
export const getToken = () => localStorage.getItem('readme_ai_token');
export const setToken = (t) => localStorage.setItem('readme_ai_token', t);
export const removeToken = () => localStorage.removeItem('readme_ai_token');
export const getUser = () => {
  const raw = localStorage.getItem('readme_ai_user');
  try { return raw ? JSON.parse(raw) : null; } catch { return null; }
};
export const setUser = (u) => localStorage.setItem('readme_ai_user', JSON.stringify(u));
export const removeUser = () => localStorage.removeItem('readme_ai_user');
export const isAuthenticated = () => !!getToken();

// ── Core Fetch Wrapper ────────────────────────────────────────────────────────
export async function apiFetch(path, options = {}) {
  const token = getToken();
  const headers = {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...options.headers,
  };

  const response = await fetch(`${API_BASE}${path}`, { ...options, headers });

  if (response.status === 401) {
    // Token expired or invalid — force logout
    removeToken();
    removeUser();
    window.location.href = 'login.html';
    return;
  }

  const contentType = response.headers.get('content-type') || '';
  const data = contentType.includes('application/json')
    ? await response.json()
    : await response.text();

  if (!response.ok) {
    const message = (data && (data.detail || data.error)) || `HTTP ${response.status}`;
    throw new Error(message);
  }

  return data;
}

// ── Auth API ──────────────────────────────────────────────────────────────────
export const api = {
  async register({ full_name, email, password }) {
    const data = await apiFetch('/auth/register', {
      method: 'POST',
      body: JSON.stringify({ full_name, email, password }),
    });
    setToken(data.access_token);
    setUser(data.user);
    return data;
  },

  async login({ email, password }) {
    const data = await apiFetch('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });
    setToken(data.access_token);
    setUser(data.user);
    return data;
  },

  async getMe() {
    return apiFetch('/auth/me');
  },

  // ── README API ──────────────────────────────────────────────────────────────
  async generate({ repo_url, style = 'standard', include_badges = true, include_toc = true, custom_sections = null }) {
    return apiFetch('/generate', {
      method: 'POST',
      body: JSON.stringify({ repo_url, style, include_badges, include_toc, custom_sections }),
    });
  },

  async regenerate({ repo_url, current_readme, feedback, style = 'standard', include_badges = true, include_toc = true }) {
    return apiFetch('/regenerate', {
      method: 'POST',
      body: JSON.stringify({ repo_url, current_readme, feedback, style, include_badges, include_toc }),
    });
  },

  async getHistory(limit = 20, skip = 0) {
    return apiFetch(`/history?limit=${limit}&skip=${skip}`);
  },

  async getHealth() {
    return apiFetch('/health');
  },
};

// ── Utility: Download file ────────────────────────────────────────────────────
export function downloadMarkdown(content, filename = 'README.md') {
  const blob = new Blob([content], { type: 'text/markdown' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}

// ── Utility: Copy to clipboard ────────────────────────────────────────────────
export async function copyToClipboard(text) {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    // Fallback
    const el = document.createElement('textarea');
    el.value = text;
    document.body.appendChild(el);
    el.select();
    document.execCommand('copy');
    document.body.removeChild(el);
    return true;
  }
}

// ── Utility: Toast notification ───────────────────────────────────────────────
export function showToast(message, type = 'success', duration = 3000) {
  const colors = {
    success: 'bg-emerald-500',
    error: 'bg-red-500',
    info: 'bg-blue-500',
    warning: 'bg-amber-500',
  };

  const toast = document.createElement('div');
  toast.className = `fixed bottom-6 right-6 z-[9999] px-5 py-3 rounded-xl text-white text-sm font-semibold shadow-2xl transform transition-all duration-300 translate-y-4 opacity-0 ${colors[type] || colors.info}`;
  toast.textContent = message;
  document.body.appendChild(toast);

  requestAnimationFrame(() => {
    toast.classList.remove('translate-y-4', 'opacity-0');
    toast.classList.add('translate-y-0', 'opacity-100');
  });

  setTimeout(() => {
    toast.classList.add('translate-y-4', 'opacity-0');
    setTimeout(() => toast.remove(), 300);
  }, duration);
}

// ── Preferences (localStorage) ────────────────────────────────────────────────
export const prefs = {
  get(key, fallback = null) {
    try {
      const raw = localStorage.getItem(`readme_ai_pref_${key}`);
      return raw ? JSON.parse(raw) : fallback;
    } catch { return fallback; }
  },
  set(key, value) {
    localStorage.setItem(`readme_ai_pref_${key}`, JSON.stringify(value));
  },
};
