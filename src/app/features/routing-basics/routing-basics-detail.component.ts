import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

/**
 * Because app.config registers provideRouter(..., withComponentInputBinding()),
 * route params are bound directly to @Input() — no ActivatedRoute boilerplate.
 */
@Component({
  selector: 'app-routing-basics-detail-section',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports:[RouterOutlet, RouterLink, RouterLinkActive],
  template: `
    <p class="text-slate-300">
      Reading <code>:id</code> via component input binding: <b>{{ id }}</b>
    </p>
    <p class="text-xs text-slate-400 mt-2">
      Try a deep link: <code>/routing-basics/detail/42</code>
    </p>

      <nav class="flex gap-3 my-3 text-sm">
      <a [routerLink]="['intro']"   routerLinkActive="text-sky-300 underline" class="text-slate-400">Intro</a>
      <a [routerLink]="['specs']"   routerLinkActive="text-sky-300 underline" class="text-slate-400">Specs</a>
      <a [routerLink]="['reviews']" routerLinkActive="text-sky-300 underline" class="text-slate-400">Reviews</a>
    </nav>
<div class="border border-slate-700 rounded p-3 bg-slate-950">
      <router-outlet />
    </div>

  `,
})
export class RoutingBasicsDetailComponent {
   @Input() id?: string;         // from parent :id param
  @Input() sectionId?: string;  // own :sectionId param
}
