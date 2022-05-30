import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  moduleId: module.id,
  selector: 'login',
  templateUrl: 'login.component.html',
  styleUrls: ['login.compoennt.scss'],
})
export class LoginComponent implements OnInit {
  public loginForm!: FormGroup;

  emailControl!: FormControl;
  passwordControl!: FormControl;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {

    this.emailControl = new FormControl('', [
      Validators.required,
      Validators.email,
    ]),
    this.passwordControl = new FormControl('', [
      Validators.required,
      Validators.minLength(6),
    ]),

    this.loginForm = new FormGroup({
      email: this.emailControl,
      password: this.passwordControl
    });
  }

  login() {
    console.log(this.loginForm.value);
    this.authService.login(this.loginForm.value);
  }
}
