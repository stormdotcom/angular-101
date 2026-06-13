import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { TopicHeaderComponent } from '../../shared/components/topic-header/topic-header.component';

@Component({
  selector: 'app-routing-basics',
  standalone: true,
  imports: [TopicHeaderComponent, RouterOutlet, RouterLink, RouterLinkActive],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <app-topic-header
      title="Routing Basics"
      mode="WORKED"
      description="Each feature route can host its own child routes. Below: an inner <router-outlet>, links that pass route params, and the child component reading those params via input binding."
    />

    <nav class="flex gap-3 mb-4 text-sm">
      <a routerLink="overview" routerLinkActive="text-sky-300 underline" class="text-slate-300">Overview</a>
      <a [routerLink]="['detail', 1]" routerLinkActive="text-sky-300 underline" class="text-slate-300">Detail #1</a>
      <a [routerLink]="['detail', 2]" routerLinkActive="text-sky-300 underline" class="text-slate-300">Detail #2</a>
      <a [routerLink]="['detail', 3]" routerLinkActive="text-sky-300 underline" class="text-slate-300">Detail #3</a>
    </nav>

    <div class="border border-slate-700 rounded p-4 bg-slate-900">
      <router-outlet />
    </div>
  `,
})
export class RoutingBasicsComponent {}
