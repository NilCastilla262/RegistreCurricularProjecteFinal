// src/app/guards/teacher.guard.ts
import { CanActivateFn, Router, UrlTree } from '@angular/router';
import { inject } from '@angular/core';

export const TeacherGuard: CanActivateFn = (
  route,
  state
): boolean | UrlTree => {
  const router = inject(Router);
  const token = localStorage.getItem('token');
  if (!token) {
    return router.parseUrl('/login');
  }

  try {
    const payload = JSON.parse(atob(token.split('.')[1]));
    if (payload.centerRole === 1 || payload.centerRole === 2) {
      return true;
    }
  } catch (e) {
    console.warn('JWT no vàlid', e);
  }

  return router.parseUrl('/unauthorized');
};
