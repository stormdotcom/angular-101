import { AsyncPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { Observable, interval, map, startWith, take } from 'rxjs';
import { UserService } from '../../core/services/user.service';
import { User } from '../../core/models/user.model';
import { InitialsPipe } from '../../shared/pipes/initials.pipe';
import { TopicHeaderComponent } from '../../shared/components/topic-header/topic-header.component';

@Component({
  selector: 'app-pipes',
  standalone: true,
  imports: [TopicHeaderComponent, AsyncPipe, InitialsPipe],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <app-topic-header
      title="Pipes"
      mode="WORKED + EXERCISE"
      description="Pipes transform values in templates. The worked example shows a custom 'initials' pipe and the built-in async pipe (which subscribes/unsubscribes for you)."
    />

    <section class="space-y-6">
      <div>
        <h2 class="font-semibold mb-2">Custom pipe — initials</h2>
        <ul class="space-y-1">
          @for (n of names; track n) {
            <li>
              <span class="inline-block w-9 h-9 rounded-full bg-sky-700 text-white text-center leading-9 mr-2">
                {{ n | initials }}
              </span>
              {{ n }}
            </li>
          }
        </ul>
      </div>

      <div>
        <h2 class="font-semibold mb-2">Built-in <code>async</code> pipe</h2>
        <p>Countdown: <b>{{ countdown$ | async }}</b></p>
        <p>First user (from API): <b>{{ (firstUser$ | async)?.name ?? 'loading…' }}</b></p>
      </div>
    </section>

    <hr class="border-slate-700 my-6" />

    <section>
      <h2 class="font-semibold text-amber-300">## EXERCISE — relative-time pipe</h2>
      <p class="text-slate-300 mt-2">
        Build a <code>relativeTime</code> pipe that turns a Date or number into
        "just now", "3m ago", "2h ago", etc. Make it pure: false so it refreshes
        as time passes (or, better, use a signal + computed).
      </p>
    </section>
  `,
})
export class PipesComponent {
  readonly names = ['Ada Lovelace', 'Alan Turing', 'Grace Hopper', 'Linus Torvalds'];

  readonly countdown$: Observable<number> = interval(1000).pipe(
    take(11),
    map(i => 10 - i),
    startWith(10),
  );

  private users$ = inject(UserService);
  readonly firstUser$: Observable<User> = this.users$.getById(1);
}
