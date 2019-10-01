import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { LoginDialogComponent } from '../login-dialog/login-dialog.component';
import { Router } from '@angular/router';

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
  selector: 'app-forgot-pass',
  templateUrl: './forgot-pass.component.html',
  styleUrls: ['./forgot-pass.component.css']
})
export class ForgotPassComponent implements OnInit {
  matcher = new CustomErrorStateMatcher();
  emailError: string;
  state: string;
  loginForm = new FormGroup({
    email: new FormControl('', [Validators.email, Validators.required])
  });

  resetEmailErrorState(): void {
    const email: any = this.loginForm.controls.email;
    email.nativeElement.focus();
    this.loginForm.reset();
    this.loginForm.controls.email.markAsDirty();
  }

  forgotPass(): void {
    if (this.loginForm.controls.email.valid) {
      this.auth.resetPass(this.loginForm.value.email).subscribe(
        value => {
          this.state = 'forgotPassSuccess';
        },
        err => {
          switch (err.code) {
            case 'auth/invalid-email':
              this.emailError = 'Invalid email';
              this.resetEmailErrorState();
              break;
            case 'auth/user-not-found':
              this.emailError = 'No user with this email';
              this.resetEmailErrorState();
              break;
          }
        },
        () => {}
      );
    }
  }

  switchToSignIn(): void {
    this.router.navigate([{ outlets: { loginModal: 'signin' } }]);
  }

  constructor(
    private auth: AuthService,
    private dialogRef: MatDialogRef<LoginDialogComponent>,
    private router: Router
  ) {
    this.emailError = 'Please enter your email';
    this.state = 'forgotPass';
  }

  ngOnInit() {}
}
