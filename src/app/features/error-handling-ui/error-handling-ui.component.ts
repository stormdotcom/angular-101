import { ChangeDetectionStrategy, Component, OnInit, inject, signal } from '@angular/core';
import { ApiService } from '../../core/services/api.service';
import { Post } from '../../core/models/user.model';
import { TopicHeaderComponent } from '../../shared/components/topic-header/topic-header.component';

@Component({
  selector: 'app-error-handling-ui',
  standalone: true,
  imports: [TopicHeaderComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <app-topic-header
      title="Error Handling UI"
      mode="WORKED + EXERCISE"
      description="Three states every async UI must handle: loading (skeleton), error (inline message + retry), and empty. The error scenario is forced by toggling 'Force 500' before clicking Load."
    />

    <section class="space-y-4">
      <div class="flex flex-wrap items-center gap-3">
        <label class="flex items-center gap-2 text-sm">
          <input type="checkbox" [checked]="forceError()" (change)="forceError.set($any($event.target).checked)" />
          Force a failing URL
        </label>
        <button type="button"
          class="px-3 py-1.5 rounded bg-sky-600 hover:bg-sky-500"
          (click)="load()">Load</button>
      </div>

      @if (loading()) {
        <div class="space-y-2" aria-busy="true">
          @for (_ of skeletonRows; track $index) {
            <div class="h-6 rounded bg-slate-800 animate-pulse"></div>
          }
        </div>
      } @else if (error()) {
        <div class="border border-rose-700/50 bg-rose-900/20 rounded p-4">
          <p class="text-rose-300">{{ error() }}</p>
          <button type="button"
            class="mt-2 px-3 py-1 rounded bg-rose-700 hover:bg-rose-600"
            (click)="load()">Retry</button>
        </div>
      } @else {
        <ul class="divide-y divide-slate-800 border border-slate-800 rounded">
          @for (p of posts(); track p.id) {
            <li class="px-3 py-2">
              <b>{{ p.title }}</b>
              <p class="text-slate-400 text-sm">{{ p.body }}</p>
            </li>
          } @empty {
            <!--
              ## EXERCISE — empty state
              TODO(you):
                Build a nicer empty-state block here:
                  - a centered illustration emoji (📭),
                  - a heading "Nothing yet",
                  - a button labelled "Reload" that calls load().
            -->
            <li class="px-3 py-4 text-center text-slate-400">No posts. (replace with your empty state)</li>
          }
        </ul>
      }
    </section>
  `,
})
export class ErrorHandlingUiComponent implements OnInit {
  private api = inject(ApiService);

  readonly loading = signal(false);
  readonly error = signal<string | null>(null);
  readonly posts = signal<Post[]>([]);
  readonly forceError = signal(false);

  readonly skeletonRows = Array.from({ length: 4 });

  ngOnInit() { this.load(); }

  load() {
    this.loading.set(true);
    this.error.set(null);
    const path = this.forceError() ? '/this-endpoint-does-not-exist' : '/posts?_limit=5';
    this.api.get<Post[]>(path).subscribe({
      next: list => { this.posts.set(list); this.loading.set(false); },
      error: err => { this.error.set(err?.userMessage ?? 'Failed.'); this.loading.set(false); },
    });
  }
}
