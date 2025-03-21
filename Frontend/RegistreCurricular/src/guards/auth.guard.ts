// import { CanActivateFn, Router } from '@angular/router';
// import { inject } from '@angular/core';
// import { jwtDecode } from 'jwt-decode';

// export const authGuard: CanActivateFn = (route, state) => {
//   const router = inject(Router);
//   const token = localStorage.getItem('authToken');

//   if (!token) {
//     router.navigate(['/login']);
//     return false;
//   }

//   try {
//     const decodedToken: any = jwtDecode(token);

//     if (decodedToken.role === 'user') {
//       return true;
//     } else {
//       router.navigate(['/login']);
//       return false;
//     }
//   } catch (error) {
//     router.navigate(['/login']);
//     return false;
//   }
// };
