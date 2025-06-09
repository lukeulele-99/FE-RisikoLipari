import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const isAuthenticated = localStorage.getItem('auth') === 'true'; //CON LOCAL STORAGE PER ORA

  if (isAuthenticated) {
    return true;
  } else {
    router.navigate(['/user']);         
    return false;
  }
};
