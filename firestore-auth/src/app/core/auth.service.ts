import { Injectable } from '@angular/core';
import {Router} from '@angular/router';
import * as firebase from 'firebase/app';
import {AngularFireAuth} from 'angularfire2/auth';
import {AngularFirestore, AngularFirestoreDocument} from 'angularfire2/firestore';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/switchMap';

interface User{
  uid: string;
  email: string;
  photoURL?: string;
  displayName?: string;
  favoriteColor?: string;
}

@Injectable()
export class AuthService {
  user: Observable<User>;
  constructor(private afAuth: AngularFireAuth,
              private afs: AngularFirestore,
              private router: Router) {
    ///Get aut data, then get firestore user document
    this.user = this.afAuth.authState
          //Gives user data
          .switchMap(user=>{
            if(user){
              //Return from the reference in the Collection
              //valueChanges brings the Observable
              return this.afs.doc<User>('users/${user.id}').valueChanges();
            }else{
              return Observable.of(null);
            }
          })
   }

//Uses the GoogleAuthProvider
googleLogin(){
  const provider = new firebase.auth.GoogleAuthProvider();
  return this.oAuthLogin(provider);
};

//Open the popup from the provider given
private oAuthLogin(provider){
  return this.afAuth.auth.signInWithPopup(provider)
    .then((credential)=>{
      this.updateUserData(credential.user);
    })
}


private updateUserData(user){
  //Sets user dara to firestore on Login
  const userRef: AngularFirestoreDocument<User> = this.afs.doc('users/${user.uid}');
  const data:User ={
    uid: user.uid,
    email: user.email,
    displayName: user.displayName,
    photoURL: user.photoURL
  }
  return userRef.set(data);
}
}
