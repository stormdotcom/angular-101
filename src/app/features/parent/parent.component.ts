import { Component, Input } from '@angular/core';
import { ChildComponent } from '../child/child.component';

@Component({
  selector: 'app-parent',
  imports: [ChildComponent],
  templateUrl: './parent.component.html',
  styleUrl: './parent.component.scss'
})
export class ParentComponent {

  score: number = 0;

  changeScore() {
    this.score += 10;
  }

  lastValue: number = 0;

  onChildValueChange(newValue: number) {
    this.lastValue = newValue;
  }
}
