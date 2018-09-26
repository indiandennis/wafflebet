import {Component, OnInit} from '@angular/core';
import {AngularFireAuth} from '@angular/fire/auth';
import {Router} from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  user: firebase.User;
  loggedIn: boolean;

  constructor(
    public afAuth: AngularFireAuth,
    public router: Router
  ) {
  }

  checkLogin(): boolean {
    return this.loggedIn;
  }

  loginHandler(user: firebase.User) {
    if (user) {
      this.user = user;
      this.loggedIn = true;
    } else {
      this.user = null;
      this.loggedIn = false;
    }
    console.log('login handler called: ' + this.loggedIn);
  }

  logout() {
    this.afAuth.auth.signOut();
  }

  openSignUpModal() {
    this.router.navigate([{outlets: {loginModal: 'signin'}}]);
  }

  ngOnInit() {
    this.afAuth.user.subscribe(user => {
      console.log(user);
      this.loginHandler(user);
    });
  }
}
