import { ChangeDetectionStrategy, Component } from '@angular/core';
import { SYLLABUS } from './syllabus';

@Component({
  selector: 'app-welcome',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <h2 class="text-2xl font-semibold">Welcome 👋</h2>
    <p class="text-slate-300 mt-2 max-w-prose">
      Pick a topic from the side-nav. Each topic page starts with a short
      description, shows a worked demo, and (often) ends with an
      <code class="bg-slate-800 px-1.5 py-0.5 rounded">## EXERCISE</code>
      section where you fill in <code class="bg-slate-800 px-1.5 py-0.5 rounded">// TODO(you): …</code>
      blocks.
    </p>
    <p class="text-slate-400 mt-4 text-sm">
      Legend: <span class="text-emerald-300">W</span> = worked,
      <span class="text-amber-300">E</span> = exercise,
      <span class="text-sky-300">W+E</span> = both.
    </p>
    <ul class="mt-6 text-sm text-slate-400 space-y-1">
      <li>Total topics: {{ total }}</li>
      <li>Worked-only: {{ worked }} · Exercise-only: {{ exercise }} · Mixed: {{ mixed }}</li>
    </ul>
  `,
})
export class WelcomeComponent {
  readonly total = SYLLABUS.length;
  readonly worked = SYLLABUS.filter(i => i.mode === 'WORKED').length;
  readonly exercise = SYLLABUS.filter(i => i.mode === 'EXERCISE').length;
  readonly mixed = SYLLABUS.filter(i => i.mode === 'WORKED + EXERCISE').length;
}
