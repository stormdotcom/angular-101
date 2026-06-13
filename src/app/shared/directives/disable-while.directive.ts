import { Directive, ElementRef, HostListener, Input, OnChanges, inject } from '@angular/core';

/**
 * Attribute directive — applies a background colour while the host element
 * is hovered. Usage: <p appHighlight color="rgba(59,130,246,0.25)">hi</p>
 */
@Directive({
  selector: '[appDisableWhile]',
  standalone: true,
})
export class DisableWhileDirective implements OnChanges  {
  @Input() appDisableWhile: boolean | undefined;

  private el = inject(ElementRef<HTMLElement>);

  ngOnChanges() {
    const disabled = !!this.appDisableWhile;
    this.el.nativeElement.disabled = disabled;
    this.el.nativeElement.classList.toggle('opacity-50', disabled);
    this.el.nativeElement.classList.toggle('cursor-not-allowed', disabled);
  }
}
