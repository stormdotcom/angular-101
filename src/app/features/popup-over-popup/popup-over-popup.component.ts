import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { ConfirmDialogComponent } from '../../shared/components/confirm-dialog/confirm-dialog.component';
import { ModalComponent } from '../../shared/components/modal/modal.component';
import { TopicHeaderComponent } from '../../shared/components/topic-header/topic-header.component';

@Component({
  selector: 'app-popup-over-popup',
  standalone: true,
  imports: [TopicHeaderComponent, ModalComponent, ConfirmDialogComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <app-topic-header
      title="Popup over Popup"
      mode="WORKED + EXERCISE"
      description="Stack a confirm dialog on top of an open editor modal. Each modal owns a stackLevel that bumps its z-index. ESC closes only the topmost dialog. Your exercise: have the confirm dialog return its result to the caller."
    />

    <button type="button"
      class="px-4 py-2 rounded bg-sky-600 hover:bg-sky-500"
      (click)="editorOpen.set(true)">Open editor</button>

    <app-modal
      [open]="editorOpen()"
      title="Edit document"
      [stackLevel]="0"
      [closeOnEscape]="!confirmOpen()"
      (closed)="editorOpen.set(false)"
    >
      <p class="text-slate-300 mb-4">
        You have unsaved changes. Try clicking "Delete" — a stacked confirm dialog
        appears on top. ESC closes the topmost dialog only.
      </p>
      <div class="flex justify-end gap-2">
        <button type="button"
          class="px-3 py-1.5 rounded bg-slate-700"
          (click)="editorOpen.set(false)">Cancel</button>
        <button type="button"
          class="px-3 py-1.5 rounded bg-rose-600 hover:bg-rose-500"
          (click)="confirmOpen.set(true)">Delete…</button>
      </div>
    </app-modal>

    <app-confirm-dialog
      [open]="confirmOpen()"
      title="Delete this document?"
      message="This action cannot be undone."
      confirmText="Delete"
      [stackLevel]="1"
      (result)="onConfirmResult($event)"
    />

    @if (lastConfirm() !== null) {
      <p class="mt-4 text-sm" [class.text-emerald-300]="lastConfirm()" [class.text-slate-300]="!lastConfirm()">
        Confirm dialog returned: <b>{{ lastConfirm() }}</b>
      </p>
    }

    <hr class="border-slate-700 my-6" />

    <section>
      <h2 class="font-semibold text-amber-300">## EXERCISE — promise-style result</h2>
      <p class="text-slate-300 mt-2">
        Right now the confirm dialog reports via an output. Refactor so you can
        await its result.
      </p>
      <!--
        TODO(you):
          1. Replace the (result) handler with a Promise-based flow:
               askConfirm(): Promise<boolean>
                 - sets confirmOpen.set(true)
                 - resolves when (result) fires, then sets confirmOpen.set(false)
          2. When the "Delete…" button is clicked, await askConfirm() and only
             call deleteThing() if it resolves true.
          3. Show a toast/banner saying "Deleted" or "Kept" accordingly.
      -->
    </section>
  `,
})
export class PopupOverPopupComponent {
  readonly editorOpen = signal(false);
  readonly confirmOpen = signal(false);
  readonly lastConfirm = signal<boolean | null>(null);

  onConfirmResult(value: boolean) {
    this.confirmOpen.set(false);
    this.lastConfirm.set(value);
    if (value) this.editorOpen.set(false);
  }
}
