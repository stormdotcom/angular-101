import { Injectable, signal } from '@angular/core';

/**
 * Global UI state — used by the loading interceptor exercise to flip a
 * spinner on while any HTTP request is in flight.
 */
@Injectable({ providedIn: 'root' })
export class UiStateService {
  readonly globalLoading = signal(false);
  private inFlight = 0;

  startRequest() {
    this.inFlight++;
    this.globalLoading.set(true);
  }

  endRequest() {
    this.inFlight = Math.max(0, this.inFlight - 1);
    if (this.inFlight === 0) this.globalLoading.set(false);
  }
}
