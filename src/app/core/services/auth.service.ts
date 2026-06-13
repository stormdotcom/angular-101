import { Injectable, signal } from '@angular/core';

/**
 * Fake auth service for the route-guards demo. Real apps would call a backend
 * and store tokens in HttpOnly cookies or a secure store.
 */
@Injectable({ providedIn: 'root' })
export class AuthService {
  readonly isLoggedIn = signal(false);
  readonly user = signal<{ name: string } | null>(null);

  login(name: string) {
    this.isLoggedIn.set(true);
    this.user.set({ name });
  }

  logout() {
    this.isLoggedIn.set(false);
    this.user.set(null);
  }
}
