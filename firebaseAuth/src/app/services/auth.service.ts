import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

// Firebase imports
import { auth } from 'firebase/app';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import * as firebase from 'firebase/app';

// RXJS imports
import { Observable, of } from 'rxjs';
import { switchMap, first } from 'rxjs/operators';

// Interface import
import { User } from './user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  // Define user Document to be shared across components
  user$: Observable<User>;

  constructor(
    private afAuth: AngularFireAuth,
    private afs: AngularFirestore,
    private router: Router
  ) {
    
    // Get the auth state, then fetch the Firestore user document or return null
    this.user$ = this.afAuth.authState.pipe(
      switchMap(user => {
        // Logged in
        if (user) {
          return this.afs.doc<User>(`users/${user.uid}`).valueChanges();
        } else {
          // Logged out
          return of(null);
        }
      })
    );
  }

  // Get the auth state and return it as a promise
  getUser():Promise<any>{
    return this.afAuth.authState.pipe(first()).toPromise();    
  }

  // Triggers the Google Signin popup window and authenticates the user.
  // It returns a Promise that resolves with the auth credential.
  googleLogin() {
    const provider = new auth.GoogleAuthProvider();
    return this.oAuthLogin(provider);
  }

  // Facebook provider
  facebookLogin() {
    const provider = new auth.FacebookAuthProvider();
    return this.oAuthLogin(provider);
  }

  // Twitter provider
  twitterLogin() {
    const provider = new auth.TwitterAuthProvider();
    return this.oAuthLogin(provider);
  }

  // Github provider
  githubLogin() {
    const provider = new auth.GithubAuthProvider();
    return this.oAuthLogin(provider);
  }

  // Anonymous Login
  async anonymousLogin() {
    const credential = await this.afAuth.auth.signInAnonymously()
    return this.updateUserData(credential.user) // if using firestore
      .catch(error => this.handleError(error));
  }

  // Function receives the provider and sends the user credential to another function
  async oAuthLogin(provider) {
    const credential = await this.afAuth.auth.signInWithPopup(provider);
    return this.updateUserData(credential.user)
      .catch(error => this.handleError(error));
  }


  // This is how we initialize custom data in Firestore.
  // The { merge: true } option is required to make this a non-destructive set for returning users.
  private updateUserData(user: User) {
    // Sets user data to firestore on login
    const userRef: AngularFirestoreDocument<User> = this.afs.doc(`users/${user.uid}`);
    const data: User = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName || "Anonymous User",
      photoURL: user.photoURL || 'https://goo.gl/Fz9nrQ'
    };
    return userRef.set(data, { merge: true });
  }
  // Does what it says, plus navigates the user to a safe route.
  async signOut() {
    await this.afAuth.auth.signOut();
    this.router.navigate(['/']);
  }
  // If error, console log and notify user
  private handleError(error) {
    console.error(error)
  }
}
