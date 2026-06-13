import { ChangeDetectionStrategy, Component, OnInit, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { User } from '../../core/models/user.model';
import { UserService } from '../../core/services/user.service';
import { TopicHeaderComponent } from '../../shared/components/topic-header/topic-header.component';

@Component({
  selector: 'app-form-api-integration',
  standalone: true,
  imports: [ReactiveFormsModule, TopicHeaderComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <app-topic-header
      title="Form + API"
      mode="WORKED + EXERCISE"
      description="On init: GET /users/1 and patchValue the form. On Create: POST. Exercise: wire the Update path with PUT and a different success banner."
    />

    <div class="flex items-center gap-2 mb-4">
      <button type="button"
        class="px-3 py-1.5 rounded bg-slate-700 hover:bg-slate-600"
        (click)="loadUser(prevId())">◀ Prev</button>
      <span class="text-slate-300 text-sm">Editing user id <b>{{ userId() }}</b></span>
      <button type="button"
        class="px-3 py-1.5 rounded bg-slate-700 hover:bg-slate-600"
        (click)="loadUser(nextId())">Next ▶</button>
    </div>

    @if (loading()) {
      <p class="text-sky-300">Loading…</p>
    }

    <form [formGroup]="form" (ngSubmit)="onCreate()" class="grid gap-3 max-w-xl">
      <div>
        <label class="block text-sm text-slate-300 mb-1">Name</label>
        <input formControlName="name"
          class="w-full px-3 py-2 rounded bg-slate-800 border border-slate-700" />
      </div>
      <div>
        <label class="block text-sm text-slate-300 mb-1">Email</label>
        <input formControlName="email" type="email"
          class="w-full px-3 py-2 rounded bg-slate-800 border border-slate-700" />
      </div>
      <div>
        <label class="block text-sm text-slate-300 mb-1">Username</label>
        <input formControlName="username"
          class="w-full px-3 py-2 rounded bg-slate-800 border border-slate-700" />
      </div>

      <div class="flex gap-2">
        <button type="submit"
          [disabled]="submitting() || form.invalid"
          class="px-4 py-2 rounded bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 disabled:cursor-not-allowed">
          {{ submitting() ? 'Saving…' : 'Create (POST)' }}
        </button>

        <!--
          ## EXERCISE — wire the Update (PUT) path
          TODO(you):
            1. Implement onUpdate() below:
                  - read this.userId() and this.form.getRawValue()
                  - call UserService.update(id, value)
                  - on success: this.updateBanner.set('Updated user N at HH:mm:ss')
            2. Bind the button below to (click)="onUpdate()" and remove [disabled]="true".
            3. Make sure to set submitting() while the PUT is in flight.
        -->
        <button type="button"
          [disabled]="true"
          class="px-4 py-2 rounded bg-sky-600 hover:bg-sky-500 disabled:opacity-50 disabled:cursor-not-allowed">
          Update (PUT)
        </button>
      </div>
    </form>

    @if (createBanner()) {
      <p class="text-emerald-300 mt-3">{{ createBanner() }}</p>
    }
    @if (updateBanner()) {
      <p class="text-sky-300 mt-3">{{ updateBanner() }}</p>
    }
    @if (error()) {
      <p class="text-rose-300 mt-3">{{ error() }}</p>
    }
  `,
})
export class FormApiIntegrationComponent implements OnInit {
  private fb = inject(FormBuilder);
  private users$ = inject(UserService);

  readonly form = this.fb.group({
    name: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    username: ['', Validators.required],
  });

  readonly userId = signal(1);
  readonly loading = signal(false);
  readonly submitting = signal(false);
  readonly createBanner = signal<string | null>(null);
  readonly updateBanner = signal<string | null>(null);
  readonly error = signal<string | null>(null);

  ngOnInit() { this.loadUser(this.userId()); }

  prevId() { return Math.max(1, this.userId() - 1); }
  nextId() { return Math.min(10, this.userId() + 1); }

  loadUser(id: number) {
    this.userId.set(id);
    this.loading.set(true);
    this.error.set(null);
    this.users$.getById(id).subscribe({
      next: u => {
        this.form.patchValue({ name: u.name, email: u.email, username: u.username });
        this.loading.set(false);
      },
      error: err => { this.error.set(err?.userMessage ?? 'Failed to load.'); this.loading.set(false); },
    });
  }

  onCreate() {
    if (this.form.invalid) { this.form.markAllAsTouched(); return; }
    this.submitting.set(true);
    const value = this.form.getRawValue();
    this.users$.create(value as Partial<User>).subscribe({
      next: u => {
        this.createBanner.set(`Created user id=${u.id} at ${new Date().toLocaleTimeString()}`);
        this.submitting.set(false);
      },
      error: err => { this.error.set(err?.userMessage ?? 'Failed to save.'); this.submitting.set(false); },
    });
  }

  // EXERCISE — implement and wire to the Update button.
  onUpdate() {
    // TODO(you): see template comment above.
  }
}
