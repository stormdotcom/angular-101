import { Injectable, computed, signal } from '@angular/core';

/**
 * Mini signal-based store. Used by:
 *  - /cross-component-data (a producer + consumer demo)
 *  - /signal-store         (the mini-store-pattern walkthrough)
 *
 * Pattern:
 *   - Private writable signals hold state.
 *   - Public readonly signals + computed signals expose it.
 *   - Methods are the only way to mutate.
 */
export interface Note {
  id: number;
  text: string;
  createdAt: number;
}

@Injectable({ providedIn: 'root' })
export class NotesStoreService {
  private readonly _notes = signal<Note[]>([]);
  private nextId = 1;

  readonly notes = this._notes.asReadonly();
  readonly count = computed(() => this._notes().length);
  readonly latest = computed(() => this._notes().at(-1) ?? null);

  add(text: string) {
    if (!text.trim()) return;
    this._notes.update(list => [...list, { id: this.nextId++, text: text.trim(), createdAt: Date.now() }]);
  }

  remove(id: number) {
    this._notes.update(list => list.filter(n => n.id !== id));
  }

  clear() {
    this._notes.set([]);
  }
}
