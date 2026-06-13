import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { ApiService } from '../../core/services/api.service';
import { UiStateService } from '../../core/services/ui-state.service';
import { TopicHeaderComponent } from '../../shared/components/topic-header/topic-header.component';

@Component({
  selector: 'app-interceptors',
  standalone: true,
  imports: [TopicHeaderComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <app-topic-header
      title="Interceptors"
      mode="WORKED + EXERCISE"
      description="Functional HTTP interceptors are registered in app.config.ts via withInterceptors([...]). The auth interceptor adds Authorization to every request; the error interceptor retries 5xx once and maps errors to a userMessage. Your exercise wires a loading interceptor."
    />

    <section class="space-y-4">
      <div class="grid grid-cols-2 gap-3">
        <button type="button"
          class="px-3 py-2 rounded bg-emerald-600 hover:bg-emerald-500"
          (click)="doOk()">GET /users/1 (OK)</button>
        <button type="button"
          class="px-3 py-2 rounded bg-rose-600 hover:bg-rose-500"
          (click)="do404()">GET /users/99999 (404)</button>
      </div>

      <div class="text-sm">
        <p>Global loading flag: <b>{{ ui.globalLoading() ? 'true' : 'false' }}</b></p>
        <p class="text-slate-400 text-xs">Once you build the loading interceptor it'll flip true while requests are in flight.</p>
      </div>

      @if (lastResult()) {
        <pre class="bg-slate-900 border border-slate-700 rounded p-3 text-xs overflow-x-auto">{{ lastResult() }}</pre>
      }
    </section>

    <hr class="border-slate-700 my-6" />

    <section>
      <h2 class="font-semibold text-amber-300">## EXERCISE — loading interceptor</h2>
      <ol class="list-decimal pl-5 text-slate-300 space-y-1 mt-2">
        <li>Create <code>src/app/core/interceptors/loading.interceptor.ts</code>.</li>
        <li>Inject <code>UiStateService</code> via <code>inject(UiStateService)</code>.</li>
        <li>Before <code>next(req)</code>: call <code>ui.startRequest()</code>.</li>
        <li>Wrap the return with <code>finalize(() => ui.endRequest())</code> from rxjs.</li>
        <li>Register it in <code>app.config.ts</code> inside the <code>withInterceptors([...])</code> array.</li>
        <li>Click the buttons above — the "Loading…" bar at the top of the page should flash.</li>
      </ol>
    </section>
  `,
})
export class InterceptorsComponent {
  private api = inject(ApiService);
  readonly ui = inject(UiStateService);

  readonly lastResult = signal<string | null>(null);

  doOk() {
    this.api.get<unknown>('/users/1').subscribe({
      next: v => this.lastResult.set(JSON.stringify(v, null, 2)),
      error: e => this.lastResult.set(`ERROR: ${e?.userMessage ?? e?.message}`),
    });
  }

  do404() {
    this.api.get<unknown>('/users/99999').subscribe({
      next: v => this.lastResult.set(JSON.stringify(v, null, 2)),
      error: e => this.lastResult.set(`ERROR: ${e?.userMessage ?? e?.message}`),
    });
  }
}
