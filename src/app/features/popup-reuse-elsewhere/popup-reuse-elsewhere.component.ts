import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { ModalComponent } from '../../shared/components/modal/modal.component';
import { TopicHeaderComponent } from '../../shared/components/topic-header/topic-header.component';

/**
 * EXERCISE — totally different feature, same shared <app-modal>.
 * The skeleton has the modal already wired with hard-coded content; your job
 * is to trigger it from a custom button and project unique content.
 */
@Component({
  selector: 'app-popup-reuse-elsewhere',
  standalone: true,
  imports: [TopicHeaderComponent, ModalComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <app-topic-header
      title="Popup Reuse Elsewhere"
      mode="EXERCISE"
      description="Prove the modal is reusable: import the SAME <app-modal> in a different feature and project completely different content. Skeleton below — wire it yourself."
    />

    <!--
      ## EXERCISE — wire your own trigger
      TODO(you):
        1. Replace the button below so its (click) sets isOpen.set(true).
        2. Inside <app-modal>, project content that is RELATED TO A DIFFERENT
           DOMAIN than the one in /reusable-popup (e.g. a "Delete account?"
           prompt with a destructive-looking button).
        3. Listen to (closed) to flip isOpen back.
    -->

    <button type="button"
      class="px-4 py-2 rounded bg-rose-700/40 text-rose-200 cursor-not-allowed"
      disabled>
      TODO: wire me to open the modal
    </button>

    <app-modal
      [open]="isOpen()"
      title="(Change this title)"
      (closed)="isOpen.set(false)"
    >
      <p class="text-slate-300">Replace this paragraph with your own content.</p>
    </app-modal>
  `,
})
export class PopupReuseElsewhereComponent {
  readonly isOpen = signal(false);
}
