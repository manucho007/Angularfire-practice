import { Injectable } from '@angular/core';
import * as firebase from 'firebase/app';
import { AngularFireAuth} from 'angularfire2/auth';
import { AngularFirestore,AngularFirestoreDocument} from 'angularfire2/firestore';
import { Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/switchMap'
import { Router } from '@angular/router';
import { NotifyService } from './notify.service';


interface User {
  uid: string;
  email: string;
  photoURL?: string;
  displayName: string;
  catchPhrase?:string;
}
@Injectable()
export class AuthService {
  user: Observable<User>;

  constructor(private afAuth: AngularFireAuth,
              private afs: AngularFirestore,
              private router: Router,
              private notify: NotifyService) {

// Keeps track of the current user
      this.user = this.afAuth.authState
        .switchMap(user => {
          if (user) {
            return this.afs.doc<User>(`users/${user.uid}`).valueChanges()
          } else {
            return Observable.of(null)
          }
        })

  }

  ////// OAuth Methods /////


  googleLogin() {
    const provider = new firebase.auth.GoogleAuthProvider()
    return this.oAuthLogin(provider);
  }

  githubLogin() {
    const provider = new firebase.auth.GithubAuthProvider()
    return this.oAuthLogin(provider);
  }

  facebookLogin() {
    const provider = new firebase.auth.FacebookAuthProvider()
    return this.oAuthLogin(provider);
  }

  twitterLogin() {
    const provider = new firebase.auth.TwitterAuthProvider()
    return this.oAuthLogin(provider);
  }


  private oAuthLogin(provider) {
    return this.afAuth.auth.signInWithPopup(provider)
      .then((credential) => {
        this.notify.update('Welcome to Firestarter!!!', 'success')
        return this.updateUserData(credential.user)
      })
      .catch(error => this.handleError(error) );
  }


  //// Anonymous Auth ////

  anonymousLogin() {
    return this.afAuth.auth.signInAnonymously()
      .then((user) => {
        this.notify.update('Welcome to Firestarter!!!', 'success')
        return this.updateUserData(user) // if using firestore
      })
      .catch(error => this.handleError(error) );
  }

  //// Email/Password Auth ////

  emailSignUp(email: string, password: string) {
    return this.afAuth.auth.createUserWithEmailAndPassword(email, password)
      .then((user) => {
        this.notify.update('Welcome to Firestarter!!!', 'success')
        return this.updateUserData(user) // if using firestore
      })
      .catch(error => this.handleError(error) );
  }

updateUser(user:User, data:any){
  return this.afs.doc(`users/${user.uid}`).update(data);
};

  emailLogin(email: string, password: string) {
    return this.afAuth.auth.signInWithEmailAndPassword(email, password)
      .catch(error => this.handleError(error) );
  }

  // Sends email allowing user to reset password
  resetPassword(email: string) {
    const fbAuth = firebase.auth();

    return fbAuth.sendPasswordResetEmail(email)
      .then(() => this.notify.update('Password update email sent', 'info'))
      .catch((error) => this.handleError(error) )
  }


  signOut() {
    this.afAuth.auth.signOut().then(() => {
        this.router.navigate(['/']);
    });
  }

  // If error, console log and notify user
  private handleError(error) {
    console.error(error)
    this.notify.update(error.message, 'error')
  }

  // Sets user data to firestore after succesful login
  private updateUserData(user) {

    const userRef: AngularFirestoreDocument<User> = this.afs.doc(`users/${user.uid}`);

    const data: User = {
      uid: user.uid,
      email: user.email || null,
      displayName: user.displayName || 'nameless user',
      photoURL: user.photoURL || 'https://goo.gl/Fz9nrQ'
    }

    // return userRef.set(data) //old
    // Checks if the user exists instead of creating a new one every time
    return  userRef.update(data)
      .then(() => {
        // update successful (document exists)
        console.log('Usuario existe');
      })
      .catch((error) => {
        // console.log('Error updating user', error); // (document does not exists)
        userRef.set(data);
      })

  }
}
