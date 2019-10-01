import {Component, OnDestroy, OnInit} from '@angular/core';
import {AuthService} from '../auth.service';
import {NotificationService} from '../notification.service';
import {Subscription} from 'rxjs';
import {MediaChange, ObservableMedia} from '@angular/flex-layout';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit, OnDestroy {
  tooltipMessage = 'Create a new bet';
  numCols = 1;
  user = {
    name: 'testUser'
  };
  watcher: Subscription;
  activeMediaQuery = '';
  spaceBetweenCards = '14px';
  cardHeight = '200px';


  constructor(public auth: AuthService, public notification: NotificationService, media: ObservableMedia) {
    this.watcher = media.subscribe((change: MediaChange) => {
      this.activeMediaQuery = change ? `'${change.mqAlias}' = (${change.mediaQuery})` : '';
      if (change.mqAlias === 'xl') {
        this.numCols = 3;
        this.spaceBetweenCards = '14px';
        this.cardHeight = '175px';
      } else if (change.mqAlias === 'lg' || change.mqAlias === 'md') {
        this.numCols = 2;
        this.spaceBetweenCards = '8px';
        this.cardHeight = '200px';
      } else if (change.mqAlias === 'sm' || change.mqAlias === 'xs') {
        this.numCols = 1;
        this.spaceBetweenCards = '6px';
        this.cardHeight = '200px';
      }
    });
  }

  ngOnInit() {
    this.auth.afAuth.auth.onAuthStateChanged(user => {
      if (!user.emailVerified) {
        // this.notification.open('Please verify your email');
        this.tooltipMessage = 'Verify your email to create bets';
      } else {
        //  this.notification.close();
        this.tooltipMessage = 'Create a bet';
      }
    });

  }

  ngOnDestroy() {
    this.watcher.unsubscribe();
  }


}
