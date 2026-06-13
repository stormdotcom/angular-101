import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { TopicHeaderComponent } from '../../shared/components/topic-header/topic-header.component';

@Component({
  selector: 'app-lazy-loading',
  standalone: true,
  imports: [TopicHeaderComponent, RouterOutlet, RouterLink, RouterLinkActive],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <app-topic-header
      title="Lazy Loading"
      mode="WORKED"
      description="Every feature in this syllabus is already lazy-loaded via loadComponent. This page also demonstrates loadChildren — open DevTools' Network tab and click 'Sub' to see a fresh chunk fetched on demand."
    />

    <nav class="flex gap-3 text-sm mb-4">
      <a routerLink="home" routerLinkActive="text-sky-300 underline" class="text-slate-300">Home (this chunk)</a>
      <a routerLink="sub" routerLinkActive="text-sky-300 underline" class="text-slate-300">Sub (nested lazy chunk)</a>
    </nav>

    <div class="border border-slate-700 rounded p-4 bg-slate-900">
      <router-outlet />
    </div>
  `,
})
export class LazyLoadingComponent {}
