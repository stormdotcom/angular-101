import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-secret-page',
  standalone: true,
  imports: [RouterLink],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <h1 class="text-2xl font-semibold mb-2">🤫 The Secret</h1>
    <p class="text-slate-300">If you're reading this, the guard let you in.</p>
    <a routerLink="/route-guards" class="text-sky-300 underline mt-3 inline-block">← back</a>
  `,
})
export class SecretPageComponent {}
