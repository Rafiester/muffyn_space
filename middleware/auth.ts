import { defineNuxtRouteMiddleware, navigateTo, useCookie } from '#app';

const isTokenExpired = (token: string | null): boolean => {
  if (!token) return true;
  try {
    const parts = token.split('.');
    if (parts.length !== 3) return true;
    const payloadUrl = parts[1];
    const base64 = payloadUrl.replace(/-/g, '+').replace(/_/g, '/');
    const decoded = JSON.parse(atob(base64));
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
