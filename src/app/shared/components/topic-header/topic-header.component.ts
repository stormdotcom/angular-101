import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

/**
 * Header block printed at the top of every feature route — title, description,
 * and a "WORKED / EXERCISE" tag so you know what to expect on this page.
 */
@Component({
  selector: 'app-topic-header',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <header class="border-b border-slate-800 pb-4 mb-6">
      <div class="flex items-baseline gap-3">
        <h1 class="text-2xl font-semibold">{{ title }}</h1>
        <span
          class="text-[10px] rounded px-2 py-0.5 font-medium"
          [class.bg-emerald-900]="mode === 'WORKED'"
          [class.text-emerald-300]="mode === 'WORKED'"
          [class.bg-amber-900]="mode === 'EXERCISE'"
          [class.text-amber-300]="mode === 'EXERCISE'"
          [class.bg-sky-900]="mode === 'WORKED + EXERCISE'"
          [class.text-sky-300]="mode === 'WORKED + EXERCISE'"
        >{{ mode }}</span>
      </div>
      <p class="text-slate-300 mt-2 max-w-prose leading-relaxed">{{ description }}</p>
    </header>
  `,
})
export class TopicHeaderComponent {
  @Input({ required: true }) title!: string;
  @Input({ required: true }) description!: string;
  @Input({ required: true }) mode!: 'WORKED' | 'EXERCISE' | 'WORKED + EXERCISE';
}
