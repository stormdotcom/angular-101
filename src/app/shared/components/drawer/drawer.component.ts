import { ChangeDetectionStrategy, Component, EventEmitter, HostListener, Input, Output } from '@angular/core';

/**
 * Slide-in side drawer. Same projection pattern as the modal:
 *   <app-drawer [open]="isOpen()" (closed)="isOpen.set(false)">...</app-drawer>
 */
@Component({
  selector: 'app-drawer',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div
      class="fixed inset-0 pointer-events-none"
      [class.pointer-events-auto]="open"
      [style.zIndex]="900"
    >
      <div
        class="absolute inset-0 transition-opacity bg-black/50"
        [style.opacity]="open ? 1 : 0"
        (click)="close()"
      ></div>
      <aside
        class="absolute top-0 bottom-0 bg-slate-900 border-l border-slate-700 shadow-2xl transition-transform w-80 max-w-full"
        [class.translate-x-0]="open"
        [class.translate-x-full]="!open"
        [style.right.px]="0"
        role="dialog"
        aria-modal="true"
      >
        <div class="flex items-center justify-between p-4 border-b border-slate-700">
          <h3 class="font-semibold">{{ title }}</h3>
          <button type="button" class="text-slate-400 hover:text-white" (click)="close()">✕</button>
        </div>
        <div class="p-4 overflow-y-auto h-[calc(100%-57px)]">
          <ng-content></ng-content>
        </div>
      </aside>
    </div>
  `,
})
export class DrawerComponent {
  @Input() open = false;
  @Input() title = 'Drawer';
  @Output() closed = new EventEmitter<void>();

  @HostListener('document:keydown.escape')
  onEscape() {
    if (this.open) this.close();
  }

  close() {
    this.closed.emit();
  }
}
