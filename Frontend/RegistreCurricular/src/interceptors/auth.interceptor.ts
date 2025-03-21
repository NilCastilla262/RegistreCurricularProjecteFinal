// import { HttpInterceptorFn } from '@angular/common/http';
// import { inject } from '@angular/core';
// import { Router } from '@angular/router';
// import { LoginService } from '../services/auth/login/login.service';
// import { throwError } from 'rxjs';
// import { catchError, tap } from 'rxjs/operators';
// import { HttpEventType } from '@angular/common/http';
// import { jwtDecode } from 'jwt-decode';

// export const authInterceptor: HttpInterceptorFn = (req, next) => {
//   const loginService = inject(LoginService);
//   const router = inject(Router);

//   if (req.url.includes('/login') || req.url.includes('/register')) {
//     return next(req);
//   }

//   const token = loginService.getToken();

//   let clonedRequest = req;
//   if (token) {
//     clonedRequest = req.clone({ setHeaders: { Authorization: `Bearer ${token}` } });
//     try {
//       const decodedToken: any = jwtDecode(token);
//       const currentTime = Date.now() / 1000;

//       if (decodedToken.exp && decodedToken.exp < currentTime) {
//         loginService.clearToken();
//         router.navigate(['/login']);
//         return throwError(() => new Error('Token caducat.'));
//       }
//     } catch (error) {
//       loginService.clearToken();
//       router.navigate(['/login']);
//       return throwError(() => new Error('Token no vàlid.'));
//     }
//   }

//   return next(clonedRequest).pipe(
//     tap((event) => {
//       if (event.type === HttpEventType.Response) {
//         const newToken = event.headers.get('Authorization')?.replace('Bearer ', '');
//         if (newToken) {
//           loginService.saveToken(newToken);
//         }
//       }
//     }),
//     catchError((error) => {
//       if (error.status === 401) {
//         loginService.clearToken();
//         router.navigate(['/login']);
//       }
//       return throwError(() => error);
//     })
//   );
// };
