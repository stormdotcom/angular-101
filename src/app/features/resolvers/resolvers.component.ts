import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { User } from '../../core/models/user.model';
import { TopicHeaderComponent } from '../../shared/components/topic-header/topic-header.component';

/**
 * The `user` data is pre-fetched by userResolver (registered in app.routes.ts)
 * and arrives via component input binding — the component never has to deal
 * with a loading state.
 */
@Component({
  selector: 'app-resolvers',
  standalone: true,
  imports: [TopicHeaderComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <app-topic-header
      title="Resolvers"
      mode="WORKED + EXERCISE"
      description="Resolvers pre-fetch data before the route activates. By the time this component renders, 'user' is already populated — no loading flicker on entry."
    />

    <section class="space-y-2">
      @if (user) {
        <p>Name: <b>{{ user.name }}</b></p>
        <p>Email: <b>{{ user.email }}</b></p>
        <p>Company: <b>{{ user.company?.name }}</b></p>
      } @else {
        <p class="text-slate-400">No user resolved.</p>
      }
    </section>

    <hr class="border-slate-700 my-6" />

    <section>
      <h2 class="font-semibold text-amber-300">## EXERCISE — error path</h2>
      <p class="text-slate-300 mt-2">
        Currently the resolver always fetches user #1. Modify it so:
      </p>
      <ol class="list-decimal pl-5 text-slate-300 mt-1 space-y-1">
        <li>It reads <code>:id</code> from <code>ActivatedRouteSnapshot</code>.</li>
        <li>If the API errors, it returns <code>EMPTY</code> (router cancels nav).</li>
        <li>Add a new route <code>/resolvers/:id</code> protected by the resolver.</li>
        <li>Link to id 1 (works) and id 9999 (fails / nav cancelled).</li>
      </ol>
    </section>
  `,
})
export class ResolversComponent {
  /** Bound from route's resolve: { user: ... } via component input binding. */
  @Input() user!: User;
}
