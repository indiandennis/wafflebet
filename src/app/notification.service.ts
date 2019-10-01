import {Injectable} from '@angular/core';
import {MatSnackBar, MatSnackBarRef, SimpleSnackBar} from '@angular/material';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  notificationRef: MatSnackBarRef<SimpleSnackBar>;

  open(message: string, duration: number = 60000) {
    this.notificationRef = this.snackBar.open(message, 'Resend', {duration: duration});
  }

  close() {
    this.snackBar.dismiss();
  }

  constructor(public snackBar: MatSnackBar) {
  }
}
