import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { ModalComponent } from '../../shared/components/modal/modal.component';
import { TopicHeaderComponent } from '../../shared/components/topic-header/topic-header.component';

@Component({
  selector: 'app-reusable-popup',
  standalone: true,
  imports: [TopicHeaderComponent, ModalComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <app-topic-header
      title="Reusable Popup"
      mode="WORKED"
      description="The generic <app-modal> lives in shared/components/modal. Content is projected via <ng-content>. Each feature that needs a popup imports the same component."
    />

    <button type="button"
      class="px-4 py-2 rounded bg-sky-600 hover:bg-sky-500"
      (click)="open.set(true)">Open popup</button>

    <app-modal
      [open]="open()"
      title="Hello from the reusable modal"
      (closed)="open.set(false)"
    >
      <p class="text-slate-300">
        This dialog body is projected via <code>&lt;ng-content&gt;</code>. The next
        topic (<b>Popup Reuse Elsewhere</b>) opens the same component again, proving
        it's a real shared primitive — not a one-off.
      </p>
      <div class="mt-4 flex justify-end">
        <button type="button"
          class="px-3 py-1.5 rounded bg-slate-700"
          (click)="open.set(false)">Close</button>
      </div>
    </app-modal>
  `,
})
export class ReusablePopupComponent {
  readonly open = signal(false);
}
