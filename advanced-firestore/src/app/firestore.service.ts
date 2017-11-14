import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollection} from 'angularfire2/firestore';
import { Observable} from 'rxjs/Observable';
import * as firebase from 'firebase/app';
// The T is a Typescript generic that allows us to use our custom interfaces
type CollectionPredicate<T> = string | AngularFirestoreCollection<T>;
type DocPredicate<T>        = string | AngularFirestoreDocument<T>;
@Injectable()
export class FirestoreService {

  constructor(private afs: AngularFirestore) { }

// Methods wraps the afsdoc and collection, so the service can be used as a drop and replacement for AngularFirestore
// If we pass a string is going to return a AngularFirestoreCollection ref
// But if we pass a ref, then it'll just returnthe ref
col<T>(ref:CollectionPredicate<T>,queryFn?):AngularFirestoreCollection<T>{
return typeof ref ==='string' ? this.afs.collection<T>(ref,queryFn): ref;
}

doc<T>(ref:DocPredicate<T>):AngularFirestoreDocument<T>{
  return typeof ref ==='string' ? this.afs.doc<T>(ref): ref;
}

// Thank to the changes in angularfire2 the Reference is decoupled from the observable data

// ****Get Data ******
doc$<T>(ref: DocPredicate<T>):Observable<T>{
 return this.doc(ref).snapshotChanges().map(doc=>{
   return doc.payload.data() as T;
 })
}

col$<T>(ref:CollectionPredicate<T>,queryFn?):Observable<T[]>{
  return this.col(ref, queryFn).snapshotChanges().map(docs =>{
    return docs.map(a=>a.payload.doc.data()) as T[];
  })
}

// return the collection with the ids
colWithIds$<T>(ref:CollectionPredicate<T>,queryFn?):Observable<any[]>{
return this.col(ref,queryFn).snapshotChanges().map(actions =>{
  return actions.map(a=>{
    const data = a.payload.doc.data();
    const id = a.payload.doc.id;
    return {id,...data};
  });
});
}


// Write Data
// firebase serve timestamp
get timestamp() {
    return firebase.firestore.FieldValue.serverTimestamp()
  }

//****Custom Methods
// Custom update method
update<T>(ref: DocPredicate<T>, data: any) {
  return this.doc(ref).update({
    ...data,
    updatedAt: this.timestamp
  })
}
// custom set method
set<T>(ref: DocPredicate<T>, data: any) {
  const timestamp = this.timestamp
  return this.doc(ref).set({
    ...data,
    updatedAt: timestamp,
    createdAt: timestamp
  })
}
// Custom add Method
add<T>(ref: CollectionPredicate<T>, data) {
  const timestamp = this.timestamp
  return this.col(ref).add({
    ...data,
    updatedAt: timestamp,
    createdAt: timestamp
  })
}

// Use of geopoint
geopoint(lat: number, lng: number) {
  return new firebase.firestore.GeoPoint(lat, lng);
}




}
