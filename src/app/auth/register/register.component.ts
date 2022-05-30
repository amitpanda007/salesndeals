import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { AuthService } from 'src/app/core/services/auth.service';
import { ValidatorService } from 'src/app/core/services/validator.service';

@Component({
  moduleId: module.id,
  selector: 'register',
  templateUrl: 'register.component.html',
  styleUrls: ['register.compoennt.scss'],
})
export class RegisterComponent implements OnInit {
  public registerForm: FormGroup;

  fullNameControl!: FormControl;
  emailControl!: FormControl;
  passwordControl!: FormControl;
  confirmPasswordControl!: FormControl;

  constructor(private authService: AuthService, private v: ValidatorService) {}

  ngOnInit(): void {
    this.fullNameControl = new FormControl('', [Validators.required]),
      this.emailControl = new FormControl('', [
        Validators.required,
        Validators.email,
      ]),
      this.passwordControl = new FormControl('', [
        Validators.required,
        Validators.minLength(6),
      ]),
      this.confirmPasswordControl = new FormControl('', [
        Validators.required
      ]),

      this.registerForm = new FormGroup({
        fullName: this.fullNameControl,
        email: this.emailControl,
        password: this.passwordControl,
        confirmPassword: this.confirmPasswordControl,
      },
      { validators: this.v.passwordMatch('password', 'confirmPassword') }
      );
  }

  register() {
    console.log(this.registerForm.value);
    console.log(this.registerForm.valid);
    this.authService.register(this.registerForm.value);
  }
}
