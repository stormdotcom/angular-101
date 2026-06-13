import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TopicHeaderComponent } from '../../shared/components/topic-header/topic-header.component';

/**
 * Two-way binding: a [(value)] convention requires:
 *   - @Input() value
 *   - @Output() valueChange
 * Then Angular synthesizes the banana-in-a-box syntax.
 */
@Component({
  selector: 'app-temperature-slider',
  standalone: true,
  imports: [FormsModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <input type="range" min="0" max="40"
      [ngModel]="value" (ngModelChange)="valueChange.emit($event)"
      class="w-full" />
    <p class="text-xs text-slate-400 mt-1">Child value: {{ value }} °C</p>
  `,
})
export class TemperatureSliderComponent {
  @Input() value = 20;
  @Output() valueChange = new EventEmitter<number>();
}

@Component({
  selector: 'app-parent-child',
  standalone: true,
  imports: [FormsModule, TopicHeaderComponent, TemperatureSliderComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <app-topic-header
      title="Parent ↔ Child"
      mode="WORKED"
      description="@Input flows data down, @Output flows events up. Pair them as [value] and (valueChange) and Angular gives you the two-way [(value)] shorthand."
    />

    <section class="space-y-6 max-w-md">
      <div>
        <h2 class="font-semibold mb-2">Two-way binding [(value)]</h2>
        <app-temperature-slider [(value)]="temp" />
        <p class="text-slate-300 mt-2">Parent reads child: <b>{{ temp }} °C</b></p>
      </div>

      <div>
        <h2 class="font-semibold mb-2">Set from parent</h2>
        <div class="flex gap-2">
          <button type="button" class="px-3 py-1.5 rounded bg-slate-700"
            (click)="temp = 5">Cold (5)</button>
          <button type="button" class="px-3 py-1.5 rounded bg-slate-700"
            (click)="temp = 22">Room (22)</button>
          <button type="button" class="px-3 py-1.5 rounded bg-slate-700"
            (click)="temp = 35">Hot (35)</button>
        </div>
      </div>
    </section>
  `,
})
export class ParentChildComponent {
  temp = 20;
}
