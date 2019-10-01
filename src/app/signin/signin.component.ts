import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { LoginDialogComponent } from '../login-dialog/login-dialog.component';
import { Router } from '@angular/router';

import {
  trigger,
  state,
  style,
  animate,
  transition
} from '@angular/animations';

import {
  FormGroup,
  FormGroupDirective,
  NgForm,
  Validators,
  FormControl,
  FormControlDirective,
  FormControlName
} from '@angular/forms';

import { MatDialogRef } from '@angular/material';
import { ErrorStateMatcher } from '@angular/material/core';

// Changes when form inputs show errors (needed to fix some weird things after incorrect password, etc.)
export class CustomErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(
    control: FormControl | null,
    form: FormGroupDirective | NgForm | null
  ): boolean {
    return !!(control && control.invalid && (control.dirty || control.touched));
  }
}

// Allows focusing directly on inputs within FormControl
const originFormControlNgOnChanges = FormControlDirective.prototype.ngOnChanges;
FormControlDirective.prototype.ngOnChanges = function() {
  this.form.nativeElement = this.valueAccessor._elementRef.nativeElement;
  return originFormControlNgOnChanges.apply(this, arguments);
};
const originFormControlNameNgOnChanges = FormControlName.prototype.ngOnChanges;
FormControlName.prototype.ngOnChanges = function() {
  const result = originFormControlNameNgOnChanges.apply(this, arguments);
  this.control.nativeElement = this.valueAccessor._elementRef.nativeElement;
  return result;
};

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {
  matcher = new CustomErrorStateMatcher();

  loginForm = new FormGroup({
    email: new FormControl('', [Validators.email, Validators.required]),
    password: new FormControl('', [Validators.required])
  });

  emailError: string;
  passwordError: string;

  login(): void {
    if (this.loginForm.valid) {
      this.auth
        .login(this.loginForm.value.email, this.loginForm.value.password)
        .subscribe(
          value => {
            console.log('Logged in');
            this.dialogRef.close();
          },
          err => {
            console.error('Oops:', err.message);
            switch (err.code) {
              case 'auth/invalid-email':
                this.emailError = 'Invalid email';
                this.resetEmailErrorState();
                break;
              case 'auth/user-not-found':
                this.emailError = 'No user found with email';
                this.loginForm.reset();
                this.resetEmailErrorState();
                break;
              case 'auth/user-disabled':
                this.emailError = 'User has been disabled';
                this.loginForm.reset();
                this.resetEmailErrorState();
                break;
              case 'auth/wrong-password':
                this.emailError = 'Enter your email';
                this.passwordError = 'Incorrect password';
                console.log(this.loginForm);
                const password: any = this.loginForm.controls.password;
                password.nativeElement.focus();
                this.loginForm.controls.password.setValue('');
                break;
            }
          },
          () => {}
        );
    }
  }

  // Set focus on the email input, reset the entire form state, reset the password error to default
  resetEmailErrorState(): void {
    const email: any = this.loginForm.controls.email;
    email.nativeElement.focus();
    this.loginForm.reset();
    this.loginForm.controls.email.markAsDirty();
    this.passwordError = 'Enter your password';
  }

  switchToSignUp(): void {
    this.router.navigate(['', { outlets: { loginModal: 'signup' } }]);
  }

  switchToForgotPass(): void {
    this.router.navigate(['', { outlets: { loginModal: 'forgotpass' } }]);
  }

  constructor(
    private auth: AuthService,
    private dialogRef: MatDialogRef<LoginDialogComponent>,
    private router: Router
  ) {
    this.emailError = 'Enter your email';
    this.passwordError = 'Please enter your password';
  }

  ngOnInit() {}
}
