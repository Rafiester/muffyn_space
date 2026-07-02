import { defineNuxtRouteMiddleware, navigateTo, useCookie } from '#app';

const safeBase64UrlDecode = (str: string): any => {
  let base64 = str.replace(/-/g, '+').replace(/_/g, '/');
  while (base64.length % 4) {
    base64 += '=';
  }
  return JSON.parse(atob(base64));
};

const isTokenExpired = (token: string | null): boolean => {
  if (!token) return true;
  try {
    const parts = token.split('.');
    if (parts.length !== 3) return true;
    const decoded = safeBase64UrlDecode(parts[1]);
    if (decoded.exp) {
      const now = Math.floor(Date.now() / 1000);
      return decoded.exp < now;
    }
    return false;
  } catch (e) {
    return true;
  }
};

export default defineNuxtRouteMiddleware((to) => {
  const token = useCookie('admin-access-token');
  const isAuthed = !!token.value && !isTokenExpired(token.value);

  const cleanPath = to.path.replace(/\/$/, '');

  if (cleanPath === '/th3w3b4dm1n') {
    if (!isAuthed) {
      return navigateTo('/th3w3b4dm1n/login');
    }
  }

  if (cleanPath === '/th3w3b4dm1n/login') {
    if (isAuthed) {
      return navigateTo('/th3w3b4dm1n');
    }
  }
});
