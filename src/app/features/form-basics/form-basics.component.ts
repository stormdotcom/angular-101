import { JsonPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { TopicHeaderComponent } from '../../shared/components/topic-header/topic-header.component';

/**
 * WORKED — a FormGroup wired with FormBuilder, demonstrating every common
 * field type. Each control is bound with formControlName inside the template.
 *
 * The submitted snapshot is shown beneath the form so you can verify the
 * shape of the value object.
 */
@Component({
  selector: 'app-form-basics',
  standalone: true,
  imports: [ReactiveFormsModule, TopicHeaderComponent, JsonPipe],
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrl: './form-basics.component.scss',
  template: `
    <app-topic-header
      title="Form Basics"
      mode="WORKED + EXERCISE"
      description="Reactive Forms — a typed FormGroup built with FormBuilder, covering text, email, number, textarea, select, radio, checkbox, toggle, and date. The submitted snapshot is rendered below so you can confirm the value shape."
    />

    <form [formGroup]="form" (ngSubmit)="onSubmit()" class="grid grid-cols-1 gap-4 max-w-xl">
      <div>
        <label class="block text-sm text-slate-300 mb-1">Full name (text)</label>
        <input formControlName="fullName"
          class="w-full px-3 py-2 rounded bg-slate-800 border border-slate-700" />
      </div>

      <div>
        <label class="block text-sm text-slate-300 mb-1">Email</label>
        <input formControlName="email" type="email"
          class="w-full px-3 py-2 rounded bg-slate-800 border border-slate-700" />
      </div>

      <div>
        <label class="block text-sm text-slate-300 mb-1">Age (number)</label>
        <input formControlName="age" type="number" min="0"
          class="w-full px-3 py-2 rounded bg-slate-800 border border-slate-700" />
      </div>

      <div>
        <label class="block text-sm text-slate-300 mb-1">Bio (textarea)</label>
        <textarea formControlName="bio" rows="3"
          class="w-full px-3 py-2 rounded bg-slate-800 border border-slate-700"></textarea>
      </div>

      <div>
        <label class="block text-sm text-slate-300 mb-1">Country (select)</label>
        <select formControlName="country"
          class="w-full px-3 py-2 rounded bg-slate-800 border border-slate-700">
          <option value="">— pick one —</option>
          <option value="IN">India</option>
          <option value="US">United States</option>
          <option value="DE">Germany</option>
          <option value="JP">Japan</option>
        </select>
      </div>

      <fieldset class="border border-slate-700 rounded p-3">
        <legend class="text-sm text-slate-300 px-1">Plan (radio)</legend>
        <label class="flex items-center gap-2 mb-1">
          <input type="radio" formControlName="plan" value="free" /> Free
        </label>
        <label class="flex items-center gap-2 mb-1">
          <input type="radio" formControlName="plan" value="pro" /> Pro
        </label>
        <label class="flex items-center gap-2">
          <input type="radio" formControlName="plan" value="enterprise" /> Enterprise
        </label>
      </fieldset>

      <label class="flex items-center gap-2">
        <input type="checkbox" formControlName="acceptTerms" />
        <span class="text-sm text-slate-300">Accept terms (checkbox)</span>
      </label>

      <label class="flex items-center gap-2">
        <span class="text-sm text-slate-300">Notifications (toggle)</span>
        <input type="checkbox" formControlName="notifications" class="toggle" />
      </label>

      <div>
        <label class="block text-sm text-slate-300 mb-1">Date of birth</label>
        <input formControlName="dob" type="date"
          class="px-3 py-2 rounded bg-slate-800 border border-slate-700" />
      </div>
      
      <div>
        <label class="block text-sm text-slate-300 mb-1">Phone Number</label>
        <input formControlName="phone" type="tel"
          class="px-3 py-2 rounded bg-slate-800 border border-slate-700" />
          <!-- validation -->
          <div *ngIf="form.get('phone')?.invalid && form.get('phone')?.touched" class="text-red-500 text-sm mt-1">
            <div *ngIf="form.get('phone')?.errors?.['required']">Phone number is required.</div>
            <div *ngIf="form.get('phone')?.errors?.['pattern']">Invalid phone number format.</div>
          </div>
      </div>


      <!--
        ## EXERCISE — phone field
        TODO(you):
          1. Add a "phone" control to the FormGroup below (FormBuilder).
          2. Validators: required + pattern(/^[+()0-9 -]{7,}$/).
          3. Render an <input formControlName="phone"> with a label.
          4. Show an error message under the input when invalid + touched.
      -->

      <div class="flex gap-2">
        <button type="submit"
          class="px-4 py-2 rounded bg-emerald-600 hover:bg-emerald-500">Submit</button>
        <button type="button"
          class="px-4 py-2 rounded bg-slate-700 hover:bg-slate-600"
          (click)="form.reset(initial())">Reset</button>
      </div>
    </form>

    @if (submitted()) {
      <section class="mt-6">
        <h3 class="font-semibold mb-2">Submitted value</h3>
        <pre class="bg-slate-900 border border-slate-700 rounded p-3 text-xs overflow-x-auto">{{ submitted() | json }}</pre>
      </section>
    }
  `,
})
export class FormBasicsComponent {
  private fb = inject(FormBuilder);

  readonly initial = signal({
    fullName: '',
    email: '',
    age: null as number | null,
    bio: '',
    country: '',
    plan: 'free',
    acceptTerms: false,
    notifications: true,
    dob: '',
    phone: '',
  });

  readonly form = this.fb.group({
    fullName: ['', [Validators.required, Validators.minLength(2)]],
    email: ['', [Validators.required, Validators.email]],
    age: [null as number | null, [Validators.min(0), Validators.max(120)]],
    bio: [''],
    country: ['', Validators.required],
    plan: ['free'],
    acceptTerms: [false, Validators.requiredTrue],
    notifications: [true],
    dob: [''],
    phone: ['', [Validators.required, Validators.pattern(/^[+()0-9 -]{7,}$/)]],
  });

  readonly submitted = signal<unknown | null>(null);

  onSubmit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    this.submitted.set(this.form.getRawValue());
  }
}
