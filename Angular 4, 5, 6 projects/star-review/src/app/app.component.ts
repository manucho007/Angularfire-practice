import { Component, OnInit } from '@angular/core';
import {AngularFirestore,AngularFirestoreDocument} from 'angularfire2/firestore';
import {Observable} from 'rxjs/Observable';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'app';

  userDoc: AngularFirestoreDocument<any>;
  movieDoc:AngularFirestoreDocument<any>;

  user: Observable<any>;
  movie: Observable<any>;

  constructor(private afs: AngularFirestore){}

  ngOnInit(){
    this.userDoc = this.afs.doc('users/test-user-1')
    this.movieDoc = this.afs.doc('Movies/interstellar')

    this.movie= this.movieDoc.valueChanges();
    this.user = this.userDoc.valueChanges();
  }
  get movieId(){
    return this.movieDoc.ref.id;
  }
  get userId(){
    return this.userDoc.ref.id;
  }
}
