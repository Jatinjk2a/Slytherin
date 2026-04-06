/**
 * auth.js — Route guards and auth utilities for README AI frontend
 */

import { isAuthenticated, removeToken, removeUser } from './api.js';

const PAGES = {
  login: 'login.html',
  signup: 'stitch-signup.html',
  dashboard: 'stitch-dashboard.html',
  landing: 'landing.html',
};

/**
 * Call this at the top of every protected page.
 * Redirects to login if no token is present.
 */
export function requireAuth() {
  if (!isAuthenticated()) {
    window.location.href = PAGES.login;
    return false;
  }
  return true;
}

/**
 * Call this on auth pages (login/signup).
 * Redirects to dashboard if already logged in.
 */
export function redirectIfAuth() {
  if (isAuthenticated()) {
    window.location.href = PAGES.dashboard;
    return true;
  }
  return false;
}

/**
 * Log out — clear tokens and redirect to landing.
 */
export function logout() {
  removeToken();
  removeUser();
  window.location.href = PAGES.landing;
}
