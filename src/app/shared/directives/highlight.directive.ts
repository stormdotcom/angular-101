import { Directive, ElementRef, HostListener, Input, inject } from '@angular/core';

/**
 * Attribute directive — applies a background colour while the host element
 * is hovered. Usage: <p appHighlight color="rgba(59,130,246,0.25)">hi</p>
 */
@Directive({
  selector: '[appHighlight]',
  standalone: true,
})
export class HighlightDirective {
  @Input('appHighlight') colorInput: string | undefined;
  @Input() color = 'rgba(34,197,94,0.25)';

  private el = inject(ElementRef<HTMLElement>);

  @HostListener('mouseenter') onEnter() {
    this.set(this.colorInput || this.color);
  }
  @HostListener('mouseleave') onLeave() {
    this.set('');
  }

  private set(value: string) {
    this.el.nativeElement.style.backgroundColor = value;
  }
}
