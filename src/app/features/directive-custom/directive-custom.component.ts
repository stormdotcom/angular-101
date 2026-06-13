import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { TopicHeaderComponent } from '../../shared/components/topic-header/topic-header.component';
import { HighlightDirective } from '../../shared/directives/highlight.directive';

@Component({
  selector: 'app-directive-custom',
  standalone: true,
  imports: [TopicHeaderComponent, HighlightDirective],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <app-topic-header
      title="Custom Directive"
      mode="WORKED + EXERCISE"
      description="Attribute directives attach behaviour to existing elements without rendering a new template. The worked example highlights on hover; the exercise asks you to write one that disables a button driven by a signal."
    />

    <section class="space-y-8">
      <div>
        <h2 class="font-semibold mb-2">WORKED — hover highlight</h2>
        <p
          appHighlight
          color="rgba(59,130,246,0.35)"
          class="p-3 border border-slate-700 rounded cursor-pointer"
        >Hover me — directive sets backgroundColor on mouseenter/mouseleave.</p>

        <p appHighlight class="p-3 border border-slate-700 rounded cursor-pointer mt-2">
          Hover me too — using the directive's default green colour.
        </p>
      </div>

      <hr class="border-slate-700" />

      <div>
        <h2 class="font-semibold text-amber-300">## EXERCISE — busy-disable directive</h2>
        <p class="text-slate-300 mb-3">
          Build <code class="bg-slate-800 px-1.5 py-0.5 rounded">appDisableWhile</code> — when the
          bound signal is true, the host button must be disabled and visually dimmed.
        </p>

        <button
          type="button"
          class="px-4 py-2 rounded bg-emerald-600 hover:bg-emerald-500"
          (click)="toggleBusy()"
        >Toggle busy ({{ busy() ? 'on' : 'off' }})</button>

        <!--
          TODO(you):
            1. Create src/app/shared/directives/disable-while.directive.ts
            2. Selector: [appDisableWhile]
            3. @Input() appDisableWhile = signal/boolean. When true:
                 - set el.nativeElement.disabled = true
                 - add classes "opacity-50 cursor-not-allowed"
               When false, reverse both.
            4. Add it to the imports array and the button below.
        -->
        <button
          type="button"
          class="ml-3 px-4 py-2 rounded bg-sky-600 hover:bg-sky-500"
          (click)="onSave()"
        >Save (should disable while busy)</button>

        @if (savedAt()) {
          <p class="text-xs text-slate-400 mt-2">Last saved: {{ savedAt() }}</p>
        }
      </div>
    </section>
  `,
})
export class DirectiveCustomComponent {
  readonly busy = signal(false);
  readonly savedAt = signal<string | null>(null);

  toggleBusy() { this.busy.set(!this.busy()); }
  onSave() { this.savedAt.set(new Date().toLocaleTimeString()); }
}
