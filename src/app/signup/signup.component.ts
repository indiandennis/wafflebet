import {Component, OnInit} from '@angular/core';

import {
  FormGroup,
  FormGroupDirective,
  NgForm,
  Validators,
  FormControl,
  FormControlDirective,
  FormControlName
} from '@angular/forms';

import {Router} from '@angular/router';

import {LoginDialogComponent} from '../login-dialog/login-dialog.component';

import {MatDialogRef} from '@angular/material';
import {ErrorStateMatcher} from '@angular/material/core';

import {AuthService} from '../auth.service';

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
FormControlDirective.prototype.ngOnChanges = function () {
  this.form.nativeElement = this.valueAccessor._elementRef.nativeElement;
  return originFormControlNgOnChanges.apply(this, arguments);
};
const originFormControlNameNgOnChanges = FormControlName.prototype.ngOnChanges;
FormControlName.prototype.ngOnChanges = function () {
  const result = originFormControlNameNgOnChanges.apply(this, arguments);
  this.control.nativeElement = this.valueAccessor._elementRef.nativeElement;
  return result;
};

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  matcher = new CustomErrorStateMatcher();

  loginForm = new FormGroup({
    email: new FormControl('', [Validators.email, Validators.required]),
    password: new FormControl('', [Validators.required])
  });

  emailError: string;
  passwordError: string;
  state = 'signUp';

  resetEmailErrorState(): void {
    const email: any = this.loginForm.controls.email;
    email.nativeElement.focus();
    this.loginForm.reset();
    this.loginForm.controls.email.markAsDirty();
    this.passwordError = 'Enter a password';
  }

  signUp(): void {
    if (this.loginForm.valid) {
      this.auth
        .createUser(this.loginForm.value.email, this.loginForm.value.password)
        .subscribe(
          value => {
            this.auth.verifyEmail();
            console.log(`We're done here!`);
            this.state = 'signUpSuccess';
          },
          err => {
            console.log('Auth error: ');
            console.log(err.code);
            switch (err.code) {
              case 'auth/email-already-in-use':
                this.emailError = 'Email already in use';
                this.resetEmailErrorState();
                break;
              case 'auth/invalid-email':
                this.emailError = 'Invalid email';
                this.resetEmailErrorState();
                break;
              case 'auth/operation-not-allowed':
                this.emailError = 'Account creation disabled';
                this.resetEmailErrorState();
                break;
              case 'auth/weak-password':
                this.emailError = 'Enter your email';
                this.passwordError = 'Weak password';
                const password: any = this.loginForm.controls.password;
                password.nativeElement.focus();
                this.loginForm.controls.password.setValue('');
                break;
            }
          },
          () => {
          }
        );
    }
  }

  switchToSignIn(): void {
    this.router.navigate([{outlets: {loginModal: 'signin'}}]);
  }

  constructor(
    private auth: AuthService,
    private dialogRef: MatDialogRef<LoginDialogComponent>,
    private router: Router
  ) {
  }

  ngOnInit() {
  }
}
