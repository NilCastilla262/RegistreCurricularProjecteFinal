import { HttpInterceptorFn, HttpEventType } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { jwtDecode } from 'jwt-decode';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (req.url.includes('/login') || 
    req.url.includes('/choose-center') || 
    req.url.includes('/auth/google-login') ||
    req.url.includes('/auth/choose-center')) {
    return next(req);
  }

  const token = authService.getToken();
  if (!token) {
    router.navigate(['/login']);
    return throwError(() => new Error('No token provided.'));
  }

  const clonedRequest = req.clone({
    setHeaders: { Authorization: `Bearer ${token}` }
  });

  try {
    const decodedToken: any = jwtDecode(token);
    const currentTime = Date.now() / 1000;
    if (decodedToken.exp && decodedToken.exp < currentTime) {
      authService.clearToken();
      router.navigate(['/login']);
      return throwError(() => new Error('Token expired.'));
    }
  } catch (error) {
    authService.clearToken();
    router.navigate(['/login']);
    return throwError(() => new Error('Invalid token.'));
  }

  return next(clonedRequest).pipe(
    tap(event => {
      if (event.type === HttpEventType.Response) {
        const newToken = event.headers.get('Authorization')?.replace('Bearer ', '');
        if (newToken) {
          authService.saveToken(newToken);
        }
      }
    }),
    catchError(error => {
      if (error.status === 401) {
        authService.clearToken();
        router.navigate(['/login']);
      }
      return throwError(() => error);
    })
  );
};
