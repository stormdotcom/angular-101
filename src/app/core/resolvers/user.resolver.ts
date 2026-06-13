import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { User } from '../models/user.model';
import { UserService } from '../services/user.service';

/**
 * Functional resolver — pre-fetches user #1 before the route activates.
 * Wired in app.routes.ts via `resolve: { user: userResolver }`.
 */
export const userResolver: ResolveFn<User> = () => {
  return inject(UserService).getById(1);
};
