import {Injectable, NgZone} from '@angular/core';
import {AngularFireAuth} from "@angular/fire/compat/auth";
import {Router} from "@angular/router";
import User = firebase.User;
import firebase from "firebase/compat";
import {sendEmailVerification} from "@angular/fire/auth";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  userData: any;

  constructor(
    public afAuth: AngularFireAuth,
    public router: Router,
    public ngZone: NgZone,
  ) {
    this.afAuth.authState.subscribe(user => {
      if (user) {
        this.userData = user;
        localStorage.setItem('user', JSON.stringify(this.userData));
        JSON.parse(<string>localStorage.getItem('user'));
      } else {
        // @ts-ignore
        localStorage.setItem('user', null);
        JSON.parse(<string>localStorage.getItem('user'));
      }
    })
  }

  SignIn(email: string, password: string) {
    return this.afAuth.signInWithEmailAndPassword(email, password)
      .then((result) => {
        this.ngZone.run(() => {
          this.router.navigate(['/home']);
        });
      }).catch((error) => {
        throw error;
      })
  }

  SignUp(email: string, password: string) {
    return this.afAuth.createUserWithEmailAndPassword(email, password)
      .then((result) => {
        if(result.user != null) {
          this.SendVerificationMail(result.user);
        }
      }).catch((error) => {
        window.alert(error.message)
      })
  }

  SendVerificationMail(user: User) {
    return sendEmailVerification(user)
      .then(() => {
        this.router.navigate(['verify-email-address']);
      })
  }

  ForgotPassword(passwordResetEmail: string) {
    return this.afAuth.sendPasswordResetEmail(passwordResetEmail)
      .then(() => {
        window.alert('Email para redefinir a sua palavra-passe enviado, verifique o seu email.');
      }).catch((error) => {
        window.alert(error)
      })
  }

  get isLoggedIn(): boolean {
    const user = JSON.parse(<string>localStorage.getItem('user'));
    return (user !== null /*&& user.emailVerified !== false*/);
  }

  SignOut() {
    return this.afAuth.signOut().then(() => {
      localStorage.removeItem('user');
      this.router.navigate(['/home']);
    })
  }

}
