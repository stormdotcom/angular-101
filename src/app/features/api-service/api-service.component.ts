import { ChangeDetectionStrategy, Component, OnInit, inject, signal } from '@angular/core';
import { User } from '../../core/models/user.model';
import { UserService } from '../../core/services/user.service';
import { TopicHeaderComponent } from '../../shared/components/topic-header/topic-header.component';

@Component({
  selector: 'app-api-service',
  standalone: true,
  imports: [TopicHeaderComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <app-topic-header
      title="API Service"
      mode="WORKED"
      description="A typed UserService backed by HttpClient. GET on init populates a list; POST creates a new user. Loading and error UI is driven by local signals."
    />

    <section class="space-y-4">
      <div class="flex gap-2">
        <button type="button"
          class="px-3 py-1.5 rounded bg-sky-600 hover:bg-sky-500"
          (click)="load()">Reload</button>
        <button type="button"
          class="px-3 py-1.5 rounded bg-emerald-600 hover:bg-emerald-500"
          (click)="createDemo()">Create demo user</button>
      </div>

      @if (loading()) {
        <p class="text-sky-300">Loading users…</p>
      } @else if (error()) {
        <p class="text-rose-300">{{ error() }}</p>
      } @else {
        <ul class="divide-y divide-slate-800 border border-slate-800 rounded">
          @for (u of users(); track u.id) {
            <li class="px-3 py-2 flex justify-between">
              <span>{{ u.name }}</span>
              <span class="text-slate-400 text-sm">{{ u.email }}</span>
            </li>
          } @empty {
            <li class="px-3 py-4 text-center text-slate-400">No users.</li>
          }
        </ul>
      }

      @if (created()) {
        <p class="text-emerald-300">Created user id={{ created()?.id }} (jsonplaceholder fakes the write).</p>
      }
    </section>
  `,
})
export class ApiServiceComponent implements OnInit {
  private users$ = inject(UserService);

  readonly loading = signal(false);
  readonly error = signal<string | null>(null);
  readonly users = signal<User[]>([]);
  readonly created = signal<User | null>(null);

  ngOnInit() { this.load(); }

  load() {
    this.loading.set(true);
    this.error.set(null);
    this.users$.list().subscribe({
      next: list => { this.users.set(list); this.loading.set(false); },
      error: err => { this.error.set(err?.userMessage ?? 'Failed to load.'); this.loading.set(false); },
    });
  }

  createDemo() {
    this.users$.create({ name: 'Demo Person', email: 'demo@example.com', username: 'demo' })
      .subscribe(u => this.created.set(u));
  }
}
