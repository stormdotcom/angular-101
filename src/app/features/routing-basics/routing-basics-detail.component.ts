import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

/**
 * Because app.config registers provideRouter(..., withComponentInputBinding()),
 * route params are bound directly to @Input() — no ActivatedRoute boilerplate.
 */
@Component({
  selector: 'app-routing-basics-detail',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <p class="text-slate-300">
      Reading <code>:id</code> via component input binding: <b>{{ id }}</b>
    </p>
    <p class="text-xs text-slate-400 mt-2">
      Try a deep link: <code>/routing-basics/detail/42</code>
    </p>
  `,
})
export class RoutingBasicsDetailComponent {
  @Input() id?: string;
}
