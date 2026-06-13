import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

/**
 * Functional guard — referenced from app.routes.ts as `canActivate: [authGuard]`.
 * Sends unauthenticated users to /route-guards (the demo's "login" page).
 */
export const authGuard: CanActivateFn = () => {
  const auth = inject(AuthService);
  const router = inject(Router);
  if (auth.isLoggedIn()) return true;
  return router.createUrlTree(['/route-guards'], { queryParams: { reason: 'auth-required' } });
};
