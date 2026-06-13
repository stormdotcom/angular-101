import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-lazy-home',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <p class="text-slate-300">
      You're in the parent lazy chunk. Click "Sub" to fetch a nested one.
      To verify: open DevTools → Network → JS, then click around.
    </p>
  `,
})
export class LazyHomeComponent {}
