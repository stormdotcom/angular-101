import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { UiStateService } from '../core/services/ui-state.service';
import { SYLLABUS } from './syllabus';

/**
 * The application shell. Renders the side-nav (which IS the syllabus) and the
 * router outlet next to it. Lazy-loaded feature routes appear inside the outlet.
 */
@Component({
  selector: 'app-shell',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="flex h-screen">
      <aside class="w-72 shrink-0 overflow-y-auto bg-slate-950 border-r border-slate-800">
        <header class="px-4 py-3 border-b border-slate-800">
          <h1 class="text-base font-semibold">Angular 19 Syllabus</h1>
          <p class="text-xs text-slate-400 mt-1">4-day hands-on scaffold</p>
        </header>
        @for (group of groupedByDay(); track group.day) {
          <section class="px-3 py-2">
            <div class="text-xs uppercase tracking-wide text-slate-500 px-2 py-1">{{ group.label }}</div>
            <ul class="space-y-0.5">
              @for (item of group.items; track item.path) {
                <li>
                  <a
                    [routerLink]="['/', item.path]"
                    routerLinkActive="bg-slate-800 text-white"
                    [routerLinkActiveOptions]="{ exact: false }"
                    class="flex items-center justify-between gap-2 rounded px-2 py-1.5 text-sm text-slate-300 hover:bg-slate-800/60"
                  >
                    <span class="truncate">{{ item.title }}</span>
                    <span
                      class="shrink-0 text-[10px] rounded px-1.5 py-0.5 font-medium"
                      [class.bg-emerald-900]="item.mode === 'WORKED'"
                      [class.text-emerald-300]="item.mode === 'WORKED'"
                      [class.bg-amber-900]="item.mode === 'EXERCISE'"
                      [class.text-amber-300]="item.mode === 'EXERCISE'"
                      [class.bg-sky-900]="item.mode === 'WORKED + EXERCISE'"
                      [class.text-sky-300]="item.mode === 'WORKED + EXERCISE'"
                    >{{ shortMode(item.mode) }}</span>
                  </a>
                </li>
              }
            </ul>
          </section>
        }
      </aside>

      <main class="flex-1 overflow-y-auto">
        @if (ui.globalLoading()) {
          <div class="sticky top-0 z-50 bg-sky-700/30 text-sky-200 text-xs px-4 py-1 backdrop-blur">
            Loading…
          </div>
        }
        <div class="p-6 max-w-4xl">
          <router-outlet />
        </div>
      </main>
    </div>
  `,
})
export class ShellComponent {
  readonly ui = inject(UiStateService);

  readonly groupedByDay = computed(() => {
    const labels: Record<number, string> = {
      1: 'Day 1 — Fundamentals',
      2: 'Day 2 — Forms',
      3: 'Day 3 — Services & API',
      4: 'Day 4 — Composition & Overlays',
      5: 'Day 5 — Foundations',
    };
    const days = [...new Set(SYLLABUS.map(i => i.day))].sort();
    return days.map(d => ({
      day: d,
      label: labels[d],
      items: SYLLABUS.filter(i => i.day === d),
    }));
  });

  shortMode(mode: string) {
    if (mode === 'WORKED + EXERCISE') return 'W+E';
    return mode === 'WORKED' ? 'W' : 'E';
  }
}
