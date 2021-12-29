import {Injectable, NgZone} from '@angular/core';
import {AngularFireAuth} from "@angular/fire/compat/auth";
import {Router} from "@angular/router";
import User = firebase.User;
import firebase from "firebase/compat";
import {sendEmailVerification} from "@angular/fire/auth";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {CreateUser} from "../models/user";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  userData: any;

  constructor(
    public afAuth: AngularFireAuth,
    public router: Router,
    public ngZone: NgZone,
    public http: HttpClient,
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
        if(result.user?.emailVerified) {
          this.ngZone.run(() => {
            this.router.navigate(['/home']);
          });
        }
        else{
          this.afAuth.signOut();
          throw new Error("emailIsNotVerified");
        }
      }).catch((error) => {
        throw error;
      })
  }

  SignUp(email: string, password: string) {
    return this.afAuth.createUserWithEmailAndPassword(email, password)
      .then((result) => {
        this.afAuth.signOut();
        if(result.user != null) {
          this.SendVerificationMail(result.user);
        }
        return result.user;
      }).catch((error) => {
        throw error;
      })
  }

  SendVerificationMail(user: User) {
    return sendEmailVerification(user)
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

  getDistricts() {
    return this.http.get('https://localhost:5001/District')
  }

  signUpDatabase(data: CreateUser) {
    const httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json'})
    }
    return this.http.post('https://localhost:5001/User', JSON.stringify(data), httpOptions)
  }

}
