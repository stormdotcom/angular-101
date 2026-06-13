import { ChangeDetectionStrategy, Component, EventEmitter, HostListener, Input, Output, booleanAttribute } from '@angular/core';

/**
 * Generic modal. Content is projected via <ng-content>.
 * Consumers control visibility with [open] and listen to (closed).
 *
 * Layered stacking is handled by giving each instance a [stackLevel] that
 * bumps the z-index (used by /popup-over-popup).
 */
@Component({
  selector: 'app-modal',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    @if (open) {
      <div
        class="fixed inset-0 flex items-center justify-center"
        [style.zIndex]="1000 + stackLevel * 10"
      >
        <div
          class="absolute inset-0 bg-black/60"
          (click)="onBackdropClick()"
        ></div>
        <div
          role="dialog"
          aria-modal="true"
          class="relative bg-slate-900 border border-slate-700 rounded-lg shadow-2xl w-full max-w-lg mx-4 p-6"
        >
          @if (title) {
            <div class="flex items-center justify-between mb-4">
              <h2 class="text-lg font-semibold">{{ title }}</h2>
              <button
                type="button"
                class="text-slate-400 hover:text-white"
                (click)="close('x')"
                aria-label="Close"
              >✕</button>
            </div>
          }
          <ng-content></ng-content>
        </div>
      </div>
    }
  `,
})
export class ModalComponent {
  @Input() open = false;
  @Input() title = '';
  @Input({ transform: booleanAttribute }) closeOnBackdrop = true;
  @Input({ transform: booleanAttribute }) closeOnEscape = true;
  @Input() stackLevel = 0;

  @Output() closed = new EventEmitter<'x' | 'backdrop' | 'escape'>();

  @HostListener('document:keydown.escape')
  onEscape() {
    if (this.open && this.closeOnEscape) this.close('escape');
  }

  onBackdropClick() {
    if (this.closeOnBackdrop) this.close('backdrop');
  }

  close(reason: 'x' | 'backdrop' | 'escape') {
    this.closed.emit(reason);
  }
}
