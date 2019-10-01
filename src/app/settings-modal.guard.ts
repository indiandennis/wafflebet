import {Injectable} from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs';
import {DialogService} from './dialog.service';

@Injectable({
  providedIn: 'root'
})
export class SettingsModalGuard implements CanActivate {
  constructor(private dialog: DialogService) {
  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    console.log('guard 2 run');
    if (!this.dialog.settingsDialogRef) {
      this.dialog.openSettings();
    }
    console.log('settings opened');
    return true;
  }
}
