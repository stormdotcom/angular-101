import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TopicHeaderComponent } from '../../shared/components/topic-header/topic-header.component';

/**
 * A tiny child component to demonstrate @Input / @Output.
 */
@Component({
  selector: 'app-counter-card',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="border border-slate-700 rounded p-4 bg-slate-900">
      <div class="flex items-center justify-between">
        <span class="text-slate-300">{{ label }}: <b>{{ value }}</b></span>
        <div class="flex gap-2">
          <button class="px-2 py-1 bg-slate-700 rounded" type="button" (click)="dec.emit()">−</button>
          <button class="px-2 py-1 bg-sky-700 rounded" type="button" (click)="inc.emit()">+</button>
        </div>
      </div>
    </div>
  `,
})
export class CounterCardComponent {
  @Input({ required: true }) label!: string;
  @Input() value = 0;
  @Output() inc = new EventEmitter<void>();
  @Output() dec = new EventEmitter<void>();
}

@Component({
  selector: 'app-components-binding',
  standalone: true,
  imports: [FormsModule, TopicHeaderComponent, CounterCardComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <app-topic-header
      title="Components & Binding"
      mode="WORKED"
      description="The four flavours of template binding: interpolation (double-curly value), property binding ([attr]), event binding ((event)), and @Input/@Output between parent and child."
    />

    <section class="space-y-6">
      <div class="space-y-2">
        <h2 class="font-semibold">Interpolation & property binding</h2>
        <p>Hello <b>{{ name() }}</b> — your name has <b>{{ name().length }}</b> characters.</p>
        <input
          [value]="name()"
          (input)="onNameInput($any($event.target).value)"
          placeholder="Your name"
          class="px-3 py-2 rounded bg-slate-800 border border-slate-700 w-64"
        />
        <p class="text-xs text-slate-400">
          [value] is property binding · (input) is event binding · the &#64;Input on the child below is one-way binding.
        </p>
      </div>

      <div class="space-y-2">
        <h2 class="font-semibold">&#64;Input down, &#64;Output up</h2>
        <app-counter-card
          label="Clicks"
          [value]="clicks()"
          (inc)="clicks.set(clicks() + 1)"
          (dec)="clicks.set(clicks() - 1)"
        />
      </div>
    </section>
  `,
})
export class ComponentsBindingComponent {
  readonly name = signal('Ada');
  readonly clicks = signal(0);

  onNameInput(v: string) { this.name.set(v); }
}
