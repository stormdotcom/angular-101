import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-lazy-sub',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <p class="text-emerald-300">
      Hi from the nested lazy chunk — check the Network tab; you should have just
      seen a new JS file fetched the first time you clicked Sub.
    </p>
  `,
})
export class LazySubComponent {}
