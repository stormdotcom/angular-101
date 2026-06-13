import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NotesStoreService } from '../../core/services/notes-store.service';
import { TopicHeaderComponent } from '../../shared/components/topic-header/topic-header.component';

@Component({
  selector: 'app-signal-store',
  standalone: true,
  imports: [FormsModule, TopicHeaderComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <app-topic-header
      title="Signal Store"
      mode="WORKED + EXERCISE"
      description="A 'mini store' pattern: private writable signals hold state, public asReadonly()/computed expose it, methods are the only mutation entry-points. This is the same NotesStoreService used by /cross-component-data."
    />

    <section class="space-y-4 max-w-md">
      <p class="text-slate-300">Count: <b>{{ store.count() }}</b></p>
      <p class="text-slate-300">Latest: <b>{{ store.latest()?.text ?? '—' }}</b></p>

      <div class="flex gap-2">
        <input [ngModel]="draft()" (ngModelChange)="draft.set($event)"
          placeholder="Add a note…"
          class="flex-1 px-3 py-2 rounded bg-slate-800 border border-slate-700" />
        <button type="button"
          class="px-3 py-2 rounded bg-emerald-600 hover:bg-emerald-500"
          (click)="add()">Add</button>
      </div>

      <ul class="border border-slate-700 rounded divide-y divide-slate-800">
        @for (n of store.notes(); track n.id) {
          <li class="px-3 py-2 flex justify-between">
            <span>{{ n.text }}</span>
            <button type="button" class="text-rose-300 hover:text-rose-200"
              (click)="store.remove(n.id)">✕</button>
          </li>
        } @empty {
          <li class="px-3 py-2 text-slate-400 text-sm">Empty.</li>
        }
      </ul>

      <button type="button"
        class="px-3 py-1.5 rounded bg-slate-700 hover:bg-slate-600"
        (click)="store.clear()">Clear all</button>
    </section>

    <hr class="border-slate-700 my-6" />

    <section>
      <h2 class="font-semibold text-amber-300">## EXERCISE — derived state</h2>
      <p class="text-slate-300 mt-2">
        Add a <code>computed()</code> on <code>NotesStoreService</code> called
        <code>charCount</code> that returns the total characters across all notes.
        Render it on this page. Then add an exposed method
        <code>removeOldestIfOver(n)</code> that pops the oldest note when total
        notes exceed <code>n</code>. Wire it to a button.
      </p>
    </section>
  `,
})
export class SignalStoreComponent {
  readonly store = inject(NotesStoreService);
  readonly draft = signal('');

  add() {
    this.store.add(this.draft());
    this.draft.set('');
  }
}
