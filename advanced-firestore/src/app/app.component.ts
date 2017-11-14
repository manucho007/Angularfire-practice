import { Component,OnInit } from '@angular/core';
import { Observable} from 'rxjs/Observable';
import { AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollection} from 'angularfire2/firestore';
import { FirestoreService} from './firestore.service';


interface Item {
  id?:string;
  description : string;
  title : string;
  location?:object;
}
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  ref :AngularFirestoreCollection<Item>;
  items: Observable<Item[]>;
  itemsDoc:AngularFirestoreDocument<Item>;
  itemDoc:Observable<Item>;
  constructor(public db:FirestoreService, private afs:AngularFirestore){}

  ngOnInit(){
    // Old Way -classic
    // this.ref =this.afs.collection('items');
    // this.items = this.ref.valueChanges();

    // New way
    // this.items = this.db.col$('items'); //collection
    this.itemDoc =this.db.doc$('items/y69XCoi5jD4ab9kfeurY'); //Single doc
    // *** Usage
    // this.items =this.db.col$('items', ref => ref.where('title', '==', 'Item 3'))

    // With ids old Way
    // this.ref = this.afs.collection('items');
    // this.items = this.ref.snapshotChanges().map(actions=>{
    //   return actions.map(a=>{
    //     const data = a.payload.doc.data();
    //     const id = a.payload.doc.id;
    //     return {id,...data};
    //   });
    // });
    // With ids new way
    this.items = this.db.colWithIds$('items');
    // this.items = this.db.colWithIds$('items', ref => ref.orderBy("description"));

// We call our custom set add update methods from the FirestoreService
    // const data:Item={
    //   description:'item 5',
    //   title: 'Item 5'
    // }
    // this.db.set('items/item 4',data); // adds createdAt field
    // this.db.update('items/ID', data)  // adds updatedAt field
    // this.db.add('items', data)       // adds createdAt `field`
  }
// We create the functions so doesn't auto init
setItem(){
const dataSet:Item={
  description:'item 6',
  title: 'Item 6'
}
this.db.set('items/item 6',dataSet);
}
updateItem(){
  const data ={location: this.db.geopoint(38,-119)}
  this.db.update('items/TPkMe1JrzGQkUXLMXPYY',data)
}
addItem(){
const loc= {location: this.db.geopoint(38,-119)};
const data:Item={
  description:'item 7',
  title: 'Item 7',
  location: loc
}
this.db.add('items',data);
}


}
