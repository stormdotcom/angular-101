import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NotesStoreService } from '../../core/services/notes-store.service';
import { TopicHeaderComponent } from '../../shared/components/topic-header/topic-header.component';

/**
 * Producer — has no @Input/@Output relationship to the consumer.
 * Both sides talk to NotesStoreService.
 */
@Component({
  selector: 'app-notes-producer',
  standalone: true,
  imports: [FormsModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="border border-slate-700 rounded p-3">
      <h3 class="font-semibold mb-2">Producer</h3>
      <div class="flex gap-2">
        <input [ngModel]="draft()" (ngModelChange)="draft.set($event)"
          placeholder="Write a note…"
          class="flex-1 px-3 py-2 rounded bg-slate-800 border border-slate-700" />
        <button type="button"
          class="px-3 py-2 rounded bg-emerald-600 hover:bg-emerald-500"
          (click)="add()">Add</button>
      </div>
    </div>
  `,
})
export class NotesProducerComponent {
  private store = inject(NotesStoreService);
  readonly draft = signal('');
  add() {
    this.store.add(this.draft());
    this.draft.set('');
  }
}

/**
 * Consumer — also has no @Input. Reads from the same store.
 * (Re-uses NotesStoreService since it's providedIn root, so the producer's
 * mutations show up here automatically thanks to signals.)
 */
@Component({
  selector: 'app-notes-consumer',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="border border-slate-700 rounded p-3">
      <h3 class="font-semibold mb-2">Consumer ({{ store.count() }})</h3>
      <ul class="space-y-1">
        @for (n of store.notes(); track n.id) {
          <li class="flex justify-between text-sm">
            <span>{{ n.text }}</span>
            <button type="button" class="text-rose-300 hover:text-rose-200"
              (click)="store.remove(n.id)">✕</button>
          </li>
        } @empty {
          <li class="text-slate-400 text-sm">No notes yet.</li>
        }
      </ul>
    </div>
  `,
})
export class NotesConsumerComponent {
  readonly store = inject(NotesStoreService);
}

@Component({
  selector: 'app-cross-component-data',
  standalone: true,
  imports: [TopicHeaderComponent, NotesProducerComponent, NotesConsumerComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <app-topic-header
      title="Cross-Component Data"
      mode="WORKED + EXERCISE"
      description="Two siblings with no parent–child relationship share state through a providedIn-root signal store. Add a note on the left → it appears on the right immediately."
    />

    <section class="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-3xl">
      <app-notes-producer />
      <app-notes-consumer />
    </section>

    <hr class="border-slate-700 my-6" />

    <section>
      <h2 class="font-semibold text-amber-300">## EXERCISE — second consumer</h2>
      <p class="text-slate-300 mt-2">
        Below should be a SECOND consumer component that shows only the count and the
        latest note (use <code class="bg-slate-800 px-1.5 py-0.5 rounded">store.count()</code>
        and <code class="bg-slate-800 px-1.5 py-0.5 rounded">store.latest()</code>).
      </p>

      <!--
        TODO(you):
          1. Create a new standalone component <app-notes-summary> in this folder
             (or co-located in this file like the others above).
          2. It should inject NotesStoreService and render:
                "Total: N · Latest: ..." (or "no notes" when empty).
          3. Import it in the imports array above and place its selector below.
      -->
      <div class="mt-3 border border-dashed border-amber-700 rounded p-3 text-amber-300 text-sm">
        &lt;app-notes-summary /&gt; goes here once you build it.
      </div>
    </section>
  `,
})
export class CrossComponentDataComponent {}
