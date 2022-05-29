import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

import {
  SuccessSnackbar,
  ErrorSnackbar,
} from 'src/app/common/snackbar.component';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class AuthService {
  loggedIn = new BehaviorSubject<boolean>(false);
  loggedIn$ = this.loggedIn.asObservable();

  constructor(
    private _router: Router,
    private _snackBar: MatSnackBar,
    private auth: AngularFireAuth
  ) {
    this.auth.onAuthStateChanged((user) => {
      console.log(user);
      if (user) {
        this.loggedIn.next(true);
      } else {
        // not logged in
        this.loggedIn.next(false);
      }
    });
  }

  async register(user: any) {
    const { fullName, email, password } = user;

    try {
      const resp = await this.auth.createUserWithEmailAndPassword(
        email,
        password
      );
      await resp.user?.updateProfile({ displayName: fullName });

      this._router.navigate(['']);
      this._snackBar.openFromComponent(SuccessSnackbar, {
        data: 'User Created Successfully',
        duration: 2000,
      });
    } catch (error) {
      console.log(error);
      this._snackBar.openFromComponent(ErrorSnackbar, {
        data: 'Something went wrong.',
        duration: 2000,
      });
    }
  }

  async login(user: any) {
    const { email, password } = user;

    try {
      const resp = await this.auth.signInWithEmailAndPassword(email, password);
      this._router.navigate(['']);
      this._snackBar.openFromComponent(SuccessSnackbar, {
        data: 'Login Successful',
        duration: 2000,
      });
    } catch (error: any) {
      this._snackBar.openFromComponent(ErrorSnackbar, {
        data: error.message,
        duration: 2000,
      });
    }
  }

  logout() {
    this.auth.signOut();
    this._router.navigate(['/auth/login']);
  }

  isLoggedIn() {
    return !!this.auth.user;
  }
}
