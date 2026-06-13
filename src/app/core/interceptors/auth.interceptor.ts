import { HttpInterceptorFn } from '@angular/common/http';
import { environment } from '../../../environments/environment';

/**
 * Functional interceptor — registered in app.config.ts via withInterceptors([...]).
 * Adds a fake Authorization header to every outgoing request.
 */
export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const cloned = req.clone({
    setHeaders: { Authorization: `Bearer ${environment.authToken}` },
  });
  return next(cloned);
};
