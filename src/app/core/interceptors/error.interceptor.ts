import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { catchError, retry, throwError, timer } from 'rxjs';

/**
 * Functional interceptor that retries once on 5xx, then maps errors to a
 * user-friendly message attached on the error object.
 */
export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  return next(req).pipe(
    retry({
      count: 1,
      delay: (error, attempt) => {
        if (error instanceof HttpErrorResponse && error.status >= 500) {
          return timer(300 * attempt);
        }
        return throwError(() => error);
      },
    }),
    catchError((err: HttpErrorResponse) => {
      const message = mapErrorToMessage(err);
      return throwError(() => ({ ...err, userMessage: message }));
    }),
  );
};

function mapErrorToMessage(err: HttpErrorResponse): string {
  if (err.status === 0) return 'Network unreachable. Check your connection.';
  if (err.status === 401) return 'You are not authorized. Please sign in.';
  if (err.status === 403) return 'You do not have permission to do this.';
  if (err.status === 404) return 'The thing you asked for was not found.';
  if (err.status >= 500) return 'Server is having a bad day. Try again shortly.';
  return err.message || 'Something went wrong.';
}
