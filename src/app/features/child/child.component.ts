import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-child',
  imports: [],
  templateUrl: './child.component.html',
  styleUrl: './child.component.scss'
})
export class ChildComponent {

  @Input() score: number = 0;

  @Output() changeScore = new EventEmitter<void>();

  value: number = 0;

  @Output() changeValue = new EventEmitter<number>();

  onButtonClick() {
    this.changeScore.emit();
  }
  increaseValue() {
   this.value += 1;
   this.changeValue.emit(this.value);
  }


}
