import { Injectable } from '@angular/core';
import { Observable, delay, of } from 'rxjs';

/**
 * Fake "is this username taken?" service for the async-validator demo.
 * A few names are pre-claimed; everything else is free.
 */
@Injectable({ providedIn: 'root' })
export class UsernameService {
  private readonly taken = new Set(['admin', 'root', 'ajmal', 'test']);

  checkAvailable(username: string): Observable<{ available: boolean }> {
    const available = !this.taken.has(username.toLowerCase().trim());
    return of({ available }).pipe(delay(600)); // simulate network latency
  }
}
