import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import {
  AbstractControl, AsyncValidatorFn, FormBuilder, ReactiveFormsModule, ValidationErrors, Validators,
} from '@angular/forms';
import { Observable, debounceTime, first, map, of, switchMap } from 'rxjs';
import { UsernameService } from '../../core/services/username.service';
import { TopicHeaderComponent } from '../../shared/components/topic-header/topic-header.component';

/**
 * Cross-field validator: returns an error on the GROUP if password != confirm.
 * Attached at the FormGroup level via { validators: [...] }.
 */
function passwordMatch(group: AbstractControl): ValidationErrors | null {
  const a = group.get('password')?.value;
  const b = group.get('confirmPassword')?.value;
  if (!a || !b) return null;
  return a === b ? null : { passwordsMustMatch: true };
}

/**
 * Async validator factory — hits a (fake) service to check whether the
 * username is taken. Returns null when free.
 */
function usernameTakenValidator(service: UsernameService): AsyncValidatorFn {
  return (control: AbstractControl): Observable<ValidationErrors | null> => {
    const value = (control.value ?? '').toString().trim();
    if (!value) return of(null);
    return of(value).pipe(
      debounceTime(300),
      switchMap(v => service.checkAvailable(v)),
      map(res => (res.available ? null : { usernameTaken: true })),
      first(),
    );
  };
}

@Component({
  selector: 'app-form-validation',
  standalone: true,
  imports: [ReactiveFormsModule, TopicHeaderComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <app-topic-header
      title="Form Validation"
      mode="WORKED + EXERCISE"
      description="Built-in validators (required, minlength, email), a custom sync validator, a cross-field validator (password === confirm), and an async validator (username taken via API). Errors only render after the control is touched or the form is submitted."
    />

    <form [formGroup]="form" (ngSubmit)="onSubmit()" class="grid grid-cols-1 gap-4 max-w-xl">
      <div>
        <label class="block text-sm text-slate-300 mb-1">Username (async-validated)</label>
        <input formControlName="username"
          class="w-full px-3 py-2 rounded bg-slate-800 border border-slate-700" />
        @if (showError('username')) {
          @if (f['username'].errors?.['required']) { <p class="text-rose-400 text-xs mt-1">Required.</p> }
          @if (f['username'].errors?.['minlength']) { <p class="text-rose-400 text-xs mt-1">At least 3 characters.</p> }
          @if (f['username'].errors?.['usernameTaken']) { <p class="text-rose-400 text-xs mt-1">That username is taken.</p> }
          @if (f['username'].pending) { <p class="text-slate-400 text-xs mt-1">Checking…</p> }
        }
      </div>

      <div>
        <label class="block text-sm text-slate-300 mb-1">Email</label>
        <input formControlName="email" type="email"
          class="w-full px-3 py-2 rounded bg-slate-800 border border-slate-700" />
        @if (showError('email')) {
          @if (f['email'].errors?.['required']) { <p class="text-rose-400 text-xs mt-1">Required.</p> }
          @if (f['email'].errors?.['email']) { <p class="text-rose-400 text-xs mt-1">Must be a valid email.</p> }
        }
      </div>

      <div formGroupName="passwords" class="grid gap-2">
        <div>
          <label class="block text-sm text-slate-300 mb-1">Password</label>
          <input formControlName="password" type="password"
            class="w-full px-3 py-2 rounded bg-slate-800 border border-slate-700" />
        </div>
        <div>
          <label class="block text-sm text-slate-300 mb-1">Confirm password</label>
          <input formControlName="confirmPassword" type="password"
            class="w-full px-3 py-2 rounded bg-slate-800 border border-slate-700" />
        </div>
        @if (form.get('passwords')?.errors?.['passwordsMustMatch'] && (form.get('passwords')?.touched || submitTried())) {
          <p class="text-rose-400 text-xs">Passwords don't match.</p>
        }
      </div>

      <!--
        ## EXERCISE — no-spaces custom validator
        TODO(you):
          1. Write a sync validator function noSpaces(control):
                returns { hasSpaces: true } if /\\s/.test(control.value), else null.
          2. Attach it to the 'nickname' control below.
          3. Show a "Nickname can't contain spaces." error after touch/submit.
      -->
      <div>
        <label class="block text-sm text-slate-300 mb-1">Nickname (no spaces allowed)</label>
        <input formControlName="nickname"
          class="w-full px-3 py-2 rounded bg-slate-800 border border-slate-700" />
        @if (showError('nickname') && f['nickname'].errors?.['hasSpaces']) {
          <p class="text-rose-400 text-xs mt-1">Nickname can't contain spaces.</p>
        }
      </div>

      <div class="flex gap-2">
        <button type="submit"
          class="px-4 py-2 rounded bg-emerald-600 hover:bg-emerald-500">Submit</button>
      </div>
    </form>

    @if (submittedAt()) {
      <p class="text-emerald-300 mt-4">Submitted at {{ submittedAt() }}.</p>
    }
  `,
})
export class FormValidationComponent {
  private fb = inject(FormBuilder);
  private usernameService = inject(UsernameService);

  readonly form = this.fb.group({
    username: ['', {
      validators: [Validators.required, Validators.minLength(3)],
      asyncValidators: [usernameTakenValidator(this.usernameService)],
      updateOn: 'blur' as const,
    }],
    email: ['', [Validators.required, Validators.email]],
    passwords: this.fb.group({
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required],
    }, { validators: [passwordMatch] }),
    nickname: [''],
  });

  readonly submitTried = signal(false);
  readonly submittedAt = signal<string | null>(null);

  /** Convenience accessor so templates stay tidy. */
  get f() {
    return this.form.controls as Record<string, AbstractControl>;
  }

  showError(name: string): boolean {
    const c = this.form.get(name);
    if (!c) return false;
    return c.invalid && (c.touched || this.submitTried());
  }

  onSubmit() {
    this.submitTried.set(true);
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    this.submittedAt.set(new Date().toLocaleTimeString());
  }
}
