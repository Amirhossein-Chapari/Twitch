import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators, ValidationErrors, AbstractControl, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../../shared/shared.module';

@Component({
  selector: 'app-register',
  imports: [CommonModule, SharedModule, ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
})
export class RegisterComponent {

  inSubmission = false;

  registerForm = new FormGroup({
    name: new FormControl<string | null>(null, [Validators.required, Validators.minLength(3)]),
    email: new FormControl<string | null>(null, [
      Validators.required,
      Validators.email,
      Validators.pattern(/[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/),
    ]),
    age: new FormControl<number | null>(null, [Validators.required, Validators.min(3)]),
    phone: new FormControl<string | null>(null, [
      Validators.required,
      Validators.pattern(/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/),
    ]),
    password: new FormControl<string | null>(null, [
      Validators.required,
      Validators.pattern(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/),
    ]),
    confirmPassword: new FormControl<string | null>(null, [Validators.required]),
  }, { validators: RegisterComponent.passwordMatchValidator });

  static passwordMatchValidator(form: AbstractControl): ValidationErrors | null {
    const password = form.get('password')?.value;
    const confirmPassword = form.get('confirmPassword')?.value;
    return password && confirmPassword && password !== confirmPassword ? { mismatch: true } : null;
  }

  showAlert: boolean = false;
  alertMessage: string = ''
  color: string = ''

  onSubmit() {
    this.showAlert = true;
    this.alertMessage = 'لطفا صبر کنید اکانت شما در حال ساخته شدن است';
    this.color = 'blue'
  }

}
