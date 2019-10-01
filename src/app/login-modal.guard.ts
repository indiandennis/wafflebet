import {Injectable} from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs';
import {DialogService} from './dialog.service';

@Injectable({
  providedIn: 'root'
})
export class LoginModalGuard implements CanActivate {
  constructor(public dialog: DialogService) {
  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    console.log('guard run');
    if (!this.dialog.loginDialogRef) {
      this.dialog.openLogin();
    }
    return true;
  }

}
