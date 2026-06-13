import { ChangeDetectionStrategy, Component, Input, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
import { TopicHeaderComponent } from '../../shared/components/topic-header/topic-header.component';

@Component({
  selector: 'app-route-guards',
  standalone: true,
  imports: [TopicHeaderComponent, RouterLink],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <app-topic-header
      title="Route Guards"
      mode="WORKED + EXERCISE"
      description="A functional CanActivate guard reads AuthService. Visiting /route-guards/secret while logged out redirects back here with a reason query param."
    />

    @if (reason === 'auth-required') {
      <div class="border border-amber-700/50 bg-amber-900/20 rounded p-3 mb-4 text-amber-200 text-sm">
        You tried to open a guarded page. Sign in below first.
      </div>
    }

    <section class="space-y-4">
      <div class="flex items-center gap-3">
        <span>Status:
          @if (auth.isLoggedIn()) {
            <b class="text-emerald-300">logged in as {{ auth.user()?.name }}</b>
          } @else {
            <b class="text-rose-300">logged out</b>
          }
        </span>

        @if (!auth.isLoggedIn()) {
          <button type="button"
            class="px-3 py-1.5 rounded bg-emerald-600 hover:bg-emerald-500"
            (click)="auth.login('Demo User')">Sign in</button>
        } @else {
          <button type="button"
            class="px-3 py-1.5 rounded bg-slate-700 hover:bg-slate-600"
            (click)="auth.logout()">Sign out</button>
        }
      </div>

      <div class="flex gap-2">
        <a routerLink="/route-guards/secret"
          class="px-3 py-1.5 rounded bg-sky-600 hover:bg-sky-500 inline-block">
          Try the guarded route →
        </a>
      </div>
    </section>

    <hr class="border-slate-700 my-6" />

    <section>
      <h2 class="font-semibold text-amber-300">## EXERCISE — role-based guard</h2>
      <p class="text-slate-300 mt-2">
        Extend AuthService with a <code>role</code> signal (<code>'user' | 'admin'</code>).
        Build a second functional guard <code>adminGuard</code> that only allows
        through when the role is <code>'admin'</code>. Add a new route
        <code>/route-guards/admin</code> protected by it and verify it redirects
        when the role is wrong.
      </p>
    </section>
  `,
})
export class RouteGuardsComponent {
  readonly auth = inject(AuthService);

  /** Bound via withComponentInputBinding(): ?reason=... → @Input() reason */
  @Input() reason?: string;
}
