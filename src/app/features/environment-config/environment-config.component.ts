import { ChangeDetectionStrategy, Component } from '@angular/core';
import { environment } from '../../../environments/environment';
import { TopicHeaderComponent } from '../../shared/components/topic-header/topic-header.component';

@Component({
  selector: 'app-environment-config',
  standalone: true,
  imports: [TopicHeaderComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <app-topic-header
      title="Environment Config"
      mode="WORKED"
      description="Hard-coded API URLs leak into your code and become a chore to change. Angular's environment.ts files give you a typed, swappable config object."
    />

    <section class="space-y-4">
      <pre class="bg-slate-900 border border-slate-700 rounded p-3 text-xs overflow-x-auto">{{ asJson }}</pre>

      <ul class="text-slate-300 text-sm space-y-1">
        <li><b>src/environments/environment.ts</b> — used during <code>ng serve</code> and dev builds.</li>
        <li><b>src/environments/environment.prod.ts</b> — used by production builds.</li>
        <li>ApiService and the interceptors read <code>environment.apiBaseUrl</code> and <code>environment.authToken</code>.</li>
      </ul>
    </section>
  `,
})
export class EnvironmentConfigComponent {
  readonly asJson = JSON.stringify(environment, null, 2);
}
