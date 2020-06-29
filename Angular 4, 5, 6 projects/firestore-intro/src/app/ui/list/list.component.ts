import { Component, OnInit } from '@angular/core';
import {AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument} from 'angularfire2/firestore';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';

interface Note {
  content: string;
  hearths: number;
  id?: string;
}
@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

    // Ref to a collection
    notesCollection: AngularFirestoreCollection<Note>;
    // get data as an Observable
    notes: Observable<Note[]>;
    // // If we need the extra metadata we call snapshot
    // snapshot: any;

    // we'll get individual documents
    noteDoc: AngularFirestoreDocument<Note>;
    note: Observable<Note>;

    // We'll bind this data from the input to update the content
    newContent: string;

  constructor(private afs: AngularFirestore) { }

  ngOnInit() {
    // Reference to the collection
    // We pass a callback to the doc ref to sort the data
    // Using the firestore query languaje
    //     this.notesCollection = this.afs.collection('notes', ref=>{
    //       //We can take full advantage using limits and sorting in many ways
    //           // return ref.orderBy('hearths').limit(1)
    //       // If we combine two orderBy it gives us the option to create indexes
    //             // return ref.orderBy('hearths').orderBy('content')
    //       // where gives us more freedom to do more complex querys
    //       return ref.where('hearths', '>=', 4)
    //     })
// This one gets the whole collection
   this.notesCollection = this.afs.collection('notes')
    // Get Observable data back
    // Kind of equivalent to firebase list observable send raw data
   this.notes = this.notesCollection.valueChanges();
    //     // We'll get ll the metadata
    //     this.snapshot = this.notesCollection.snapshotChanges()
    //       .map(arr =>{
    //         console.log("arr");
    //         arr.map(snap => snap.payload.doc.data())
    //       })
  // This one points to an specific document
    this.noteDoc = this.afs.doc('notes/lnfJ9cPMwkKchgF4dfOR')
    this.note = this.noteDoc.valueChanges()
    }

    updateContent(){
      this.noteDoc.update({content: this.newContent})
    };

}
