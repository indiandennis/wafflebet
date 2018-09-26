import {Injectable} from '@angular/core';
import {AngularFireAuth} from '@angular/fire/auth';
import {from, Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  ret = false;
  user: firebase.User;

  constructor(public afAuth: AngularFireAuth) {}

  logout() {
    this.afAuth.auth.signOut();
  }

  login(email: string, password: string) {
    this.afAuth.auth.setPersistence('local');
    return from(this.afAuth.auth.signInWithEmailAndPassword(email, password));
  }

  createUser(email: string, password: string) {
    this.afAuth.auth.setPersistence('local');
    return from(
      this.afAuth.auth.createUserWithEmailAndPassword(email, password)
    );
  }

  verifyEmail(): void {
    this.afAuth.auth.currentUser.sendEmailVerification().then(function() {
      console.log('Verification email sent');
    });
  }

  resetPass(email: string) {
    return from(this.afAuth.auth.sendPasswordResetEmail(email));
  }

  getAuthState(): Observable<firebase.User> {
    return this.afAuth.authState;
  }
}
