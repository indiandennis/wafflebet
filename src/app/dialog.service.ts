import {Injectable} from '@angular/core';
import {MatDialog, MatDialogRef} from '@angular/material';
import {LoginDialogComponent} from './login-dialog/login-dialog.component';
import {Router} from '@angular/router';
import {SettingsDialogComponent} from './settings-dialog/settings-dialog.component';

@Injectable({
  providedIn: 'root'
})
export class DialogService {
  loginDialogRef: MatDialogRef<any>;
  settingsDialogRef: MatDialogRef<any>;

  constructor(public dialog: MatDialog,
              public router: Router
  ) {
  }

  openLogin(): void {
    this.loginDialogRef = this.dialog.open(LoginDialogComponent, {
      id: 'login'
    });
    this.loginDialogRef.afterClosed().subscribe(() => {
      this.router.navigate([{outlets: {loginModal: null}}]);
      this.loginDialogRef = null;
    });
  }

  openSettings(): void {
    this.settingsDialogRef = this.dialog.open(SettingsDialogComponent);
  }
}
