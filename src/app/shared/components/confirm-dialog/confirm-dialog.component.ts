import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { ModalComponent } from '../modal/modal.component';

/**
 * Confirm dialog built on top of the generic <app-modal>. Returns a result
 * (true = confirmed, false = cancelled) via the (result) output.
 *
 * Used by /popup-over-popup to stack on top of another open modal.
 */
@Component({
  selector: 'app-confirm-dialog',
  standalone: true,
  imports: [ModalComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <app-modal
      [open]="open"
      [title]="title"
      [stackLevel]="stackLevel"
      (closed)="onResult(false)"
    >
      <p class="text-slate-300 mb-6">{{ message }}</p>
      <div class="flex justify-end gap-2">
        <button
          type="button"
          class="px-4 py-2 rounded bg-slate-700 hover:bg-slate-600"
          (click)="onResult(false)"
        >{{ cancelText }}</button>
        <button
          type="button"
          class="px-4 py-2 rounded bg-rose-600 hover:bg-rose-500"
          (click)="onResult(true)"
        >{{ confirmText }}</button>
      </div>
    </app-modal>
  `,
})
export class ConfirmDialogComponent {
  @Input() open = false;
  @Input() title = 'Are you sure?';
  @Input() message = 'This action cannot be undone.';
  @Input() confirmText = 'Confirm';
  @Input() cancelText = 'Cancel';
  @Input() stackLevel = 1;

  @Output() result = new EventEmitter<boolean>();

  onResult(value: boolean) {
    this.result.emit(value);
  }
}
