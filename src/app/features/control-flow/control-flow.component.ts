import { ChangeDetectionStrategy, Component, computed, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TopicHeaderComponent } from '../../shared/components/topic-header/topic-header.component';

interface Fruit { id: number; name: string; color: 'red' | 'green' | 'yellow'; }

@Component({
  selector: 'app-control-flow',
  standalone: true,
  imports: [FormsModule, TopicHeaderComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <app-topic-header
      title="Control Flow"
      mode="WORKED + EXERCISE"
      description="Angular 17+ replaces *ngIf / *ngFor with @if / @for / @switch built into the template syntax. @for requires a track expression for diffing."
    />

    <section class="space-y-8">
      <div>
        <h2 class="font-semibold mb-2">&#64;if / &#64;else</h2>
        <button
          type="button"
          class="px-3 py-1.5 rounded bg-sky-700 hover:bg-sky-600"
          (click)="show.set(!show())"
        >Toggle</button>
        @if (show()) {
          <p class="mt-2 text-emerald-300">Visible because show() is true.</p>
        } @else {
          <p class="mt-2 text-rose-300">Hidden — show() is false.</p>
        }
            <button
          type="button"
          class="px-3 py-1.5 rounded"
          [class.bg-green-700]="secondShow()"
          [class.bg-sky-700]="!secondShow()"
          (click)="secondShow.set(!secondShow())"
        >Toggle Second Show</button>
        @if (secondShow()) {
          <p> Second show is {{secondShow()}}.</p>
        } @else {
          <p> Second Show is  {{secondShow()}}
        }
      </div>

      <div>
        <h2 class="font-semibold mb-2">&#64;switch</h2>
        <select [ngModel]="status()" (ngModelChange)="status.set($event)"
                class="px-3 py-2 rounded bg-slate-800 border border-slate-700">
          <option value="idle">idle</option>
          <option value="loading">loading</option>
          <option value="error">error</option>
          <option value="done">done</option>
        </select>
        @switch (status()) {
          @case ('idle')    { <p class="mt-2 text-slate-300">Waiting to start.</p> }
          @case ('loading') { <p class="mt-2 text-sky-300">Loading…</p> }
          @case ('error')   { <p class="mt-2 text-rose-300">Something broke.</p> }
          @case ('done')    { <p class="mt-2 text-emerald-300">All good!</p> }
        }
      </div>

      <div>
        <h2 class="font-semibold mb-2">&#64;for with track</h2>
        <ul class="list-disc pl-5 space-y-1">
          @for (f of fruits(); track f.id) {
            <li>{{ f.name }} ({{ f.color }})</li>
          } @empty {
            <li class="text-slate-400">No fruits.</li>
          }
        </ul>
      </div>

      <hr class="border-slate-700" />

      <div>
        <h2 class="font-semibold text-amber-300">## EXERCISE — filtered list</h2>
        <p class="text-slate-300 mb-3">Pick a colour and render only the matching fruits.</p>

        <label class="block text-sm text-slate-400 mb-1">Filter by colour</label>
        <select [ngModel]="colorFilter()" (ngModelChange)="colorFilter.set($event)"
                class="px-3 py-2 rounded bg-slate-800 border border-slate-700">
          <option value="">All</option>
          <option value="red">red</option>
          <option value="green">green</option>
          <option value="yellow">yellow</option>
        </select>

        <ul class="list-disc pl-5 space-y-1 mt-3">
          <!--
            TODO(you):
              1. Create a computed() signal called \`filteredFruits\` that returns
                 fruits() filtered by colorFilter() (when '' show all).
              2. Replace fruits() below with filteredFruits().
              3. Add an @empty branch that says "No fruits match.".
          -->
          @for (f of filteredFruits(); track f.id) {
            <li>{{ f.name }} ({{ f.color }})</li>
          }
        </ul>
      </div>
    </section>
  `,
})
export class ControlFlowComponent {
  readonly show = signal(true);
  readonly secondShow = signal(false);
  readonly status = signal<'idle' | 'loading' | 'error' | 'done'>('idle');

  readonly fruits = signal<Fruit[]>([
    { id: 1, name: 'Apple',      color: 'red' },
    { id: 2, name: 'Pear',       color: 'green' },
    { id: 3, name: 'Banana',     color: 'yellow' },
    { id: 4, name: 'Strawberry', color: 'red' },
    { id: 5, name: 'Lime',       color: 'green' },
  ]);

  readonly colorFilter = signal<'' | 'red' | 'green' | 'yellow'>('');

  // Reference computed pattern for the exercise:
  readonly _hint = computed(() => this.fruits().length); // delete in your solution if you want
  readonly filteredFruits = computed(() => {
    const filter = this.colorFilter();
    return filter ? this.fruits().filter(f => f.color === filter) : this.fruits();
  });
}
