import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth.service';


export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const isAuthenticated = localStorage.getItem('auth') === 'true'; //CON LOCAL STORAGE PER ORA
  const authService = inject(AuthService)
  if (isAuthenticated) {
    return true;
  } else {
    router.navigate(['/user']);
    return false;
  }
};
