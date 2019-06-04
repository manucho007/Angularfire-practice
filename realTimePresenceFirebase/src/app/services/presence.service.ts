import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireDatabase } from '@angular/fire/database';
import * as firebase from 'firebase/app';
import { tap, map, switchMap, first } from 'rxjs/operators';
import { TouchSequence } from 'selenium-webdriver';
import { of } from 'rxjs';
import { AuthService } from './auth.service';

// 1. Signed-in and usign app (online)
// 2. Signed-in but app is closed (offline)
// 3. Signed-in but on a different browser tab (away)
// 4. Signed-out but app is still opened (offline)
// 5. Signed-out and app closed (offline)

@Injectable({
  providedIn: 'root'
})
export class PresenceService {

  constructor(private afAuth: AngularFireAuth, private db: AngularFireDatabase, private auth: AuthService) {
    // The presence
    this.updateOnUser().subscribe();
    this.updateOnDisconnect().subscribe();
    this.updateOnAway();
  }

  //  Listen to user status based on it's uid in firebase
  getPresence(uid: string) {
    return this.db.object(`status/${uid}`).valueChanges();
  }

  //  return the authState as a promise
  getUser() {
    return this.afAuth.authState.pipe(first()).toPromise();
  }

  // Async Method sets the presence
  async setPresence(status: string) {
    const user = await this.getUser();
    if (user) {
      return this.db.object(`status/${user.uid}`).update({ status, timestamp: this.timestamp });
    }
  }

  // gets the server value timestamp
  get timestamp() {
    return firebase.database.ServerValue.TIMESTAMP;
  }

  // returns a boolean if the device is connected 
  updateOnUser() {
    // Realtime db has special location called .info/connected that returns
    // true or false if the device is connected
    const connection = this.db.object('.info/connected').valueChanges().pipe(
      map(connected => connected ? 'online' : 'offline')
    );

    // connects status to user id
    // returns an observavble that tells if an users device is connected to the db
    return this.afAuth.authState.pipe(
      switchMap(user => user ? connection : of('offline')),
      // When the status changes is updated in the db
      tap(status => this.setPresence(status))
    )
  }

  // Use page visibility API
  // Case 3
  // Method will set event handler for the onvisibilitychange
  updateOnAway() {
    document.onvisibilitychange = (e) => {

      if (document.visibilityState === 'hidden') {
        this.setPresence('away');
      } else {
        this.setPresence('online');
      }
    };
  }

  // Signs out and sets presence to offline
  async signOut() {
    await this.setPresence('offline');
    this.auth.signOut();
  }

  // Runs an update after the app is closed
  // Cases 2 ad 5
  updateOnDisconnect() {
    return this.afAuth.authState.pipe(
      tap(user => {
        if (user) {
          this.db.object(`status/${user.uid}`).query.ref.onDisconnect()
            .update({
              status: 'offline',
              timestamp: this.timestamp
            });
        }
      })
    );
  }
}
