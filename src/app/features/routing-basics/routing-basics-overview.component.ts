import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-routing-basics-overview',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <p class="text-slate-300">
      This is the default child route. Click "Detail #N" above to navigate to
      a sibling child that reads <code>:id</code> from the URL.
    </p>
  `,
})
export class RoutingBasicsOverviewComponent {}
