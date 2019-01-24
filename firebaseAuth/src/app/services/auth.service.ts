import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

// Firebase imports
import { auth } from 'firebase/app';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';

// RXJS imports
import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';

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

  // Triggers the Google Signin popup window and authenticates the user.
  // It returns a Promise that resolves with the auth credential.
   async googleSignin() {
    const provider = new auth.GoogleAuthProvider();
    const credential = await this.afAuth.auth.signInWithPopup(provider);
    return this.updateUserData(credential.user);
  }

  // This is how we initialize custom data in Firestore.
  // The { merge: true } option is required to make this a non-destructive set for returning users.
  private updateUserData({uid, email, displayName, photoURL}: User) {
    // Sets user data to firestore on login
    const userRef: AngularFirestoreDocument<User> = this.afs.doc(`users/${uid}`);

    const data = {
      uid,
      email,
      displayName,
      photoURL
    };

    return userRef.set(data, { merge: true });

  }
// Does what it says, plus navigates the user to a safe route.
  async signOut() {
    await this.afAuth.auth.signOut();
    this.router.navigate(['/']);
  }
}
