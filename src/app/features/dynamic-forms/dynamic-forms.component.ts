import { JsonPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { TopicHeaderComponent } from '../../shared/components/topic-header/topic-header.component';

interface PhoneFormShape {
  label: FormControl<string>;
  number: FormControl<string>;
}

/**
 * WORKED — a FormArray of phone numbers. Each row is a small FormGroup.
 * The Add button pushes a new group; the Remove button (your exercise) should
 * splice one out.
 */
@Component({
  selector: 'app-dynamic-forms',
  standalone: true,
  imports: [ReactiveFormsModule, TopicHeaderComponent, JsonPipe],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <app-topic-header
      title="Dynamic Forms"
      mode="WORKED + EXERCISE"
      description="A FormArray lets you add/remove form groups at runtime. The skeleton wires Add — your exercise wires Remove and adds per-row validation."
    />

    <form [formGroup]="form" (ngSubmit)="onSubmit()" class="max-w-xl">
      <div formArrayName="phones" class="space-y-3">
        @for (group of phones.controls; track $index; let i = $index) {
          <fieldset [formGroupName]="i"
            class="border border-slate-700 rounded p-3 grid grid-cols-[1fr_2fr_auto] gap-2 items-end">
            <div>
              <label class="block text-xs text-slate-300 mb-1">Label</label>
              <input formControlName="label" placeholder="home, work…"
                class="w-full px-2 py-1.5 rounded bg-slate-800 border border-slate-700" />
            </div>
            <div>
              <label class="block text-xs text-slate-300 mb-1">Number</label>
              <input formControlName="number" placeholder="+91 …"
                class="w-full px-2 py-1.5 rounded bg-slate-800 border border-slate-700" />
            </div>

            <!--
              ## EXERCISE — remove + per-row validation
              TODO(you):
                1. Wire the button below to remove row at index i
                   (call removePhone(i) — already defined on the component).
                2. Make the "number" control required AND require pattern
                   /^[+()0-9 -]{7,}$/. Show a small error message under it.
                3. Disable the Submit button if any row is invalid.
            -->
            <button type="button"
              class="px-3 py-2 rounded bg-rose-700/40 text-rose-200 cursor-not-allowed"
              disabled
              title="TODO: wire to removePhone(i)">Remove</button>
          </fieldset>
        }
      </div>

      <div class="mt-4 flex gap-2">
        <button type="button"
          class="px-3 py-1.5 rounded bg-slate-700 hover:bg-slate-600"
          (click)="addPhone()">+ Add phone</button>
        <button type="submit"
          class="px-3 py-1.5 rounded bg-emerald-600 hover:bg-emerald-500">Submit</button>
      </div>
    </form>

    @if (snapshot()) {
      <section class="mt-6">
        <h3 class="font-semibold mb-2">Submitted</h3>
        <pre class="bg-slate-900 border border-slate-700 rounded p-3 text-xs overflow-x-auto">{{ snapshot() | json }}</pre>
      </section>
    }
  `,
})
export class DynamicFormsComponent {
  private fb = inject(FormBuilder);

  readonly form = this.fb.group({
    phones: this.fb.array<FormGroup<PhoneFormShape>>([
      this.buildPhone('home', ''),
    ]),
  });

  readonly snapshot = signal<unknown | null>(null);

  get phones() {
    return this.form.controls.phones;
  }

  private buildPhone(label = '', number = ''): FormGroup<PhoneFormShape> {
    return this.fb.group({
      label: this.fb.nonNullable.control(label, Validators.required),
      number: this.fb.nonNullable.control(number),
    });
  }

  addPhone() {
    this.phones.push(this.buildPhone());
  }

  removePhone(index: number) {
    this.phones.removeAt(index);
  }

  onSubmit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    this.snapshot.set(this.form.getRawValue());
  }
}
