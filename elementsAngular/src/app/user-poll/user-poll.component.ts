import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument } from 'angularfire2/firestore';
import { tap } from 'rxjs/operators';
@Component({
  selector: 'user-poll',
  templateUrl: './user-poll.component.html',
  styleUrls: ['./user-poll.component.css'],
  // this will encapsulate all our css styles in the shadow dom
  // so all css willbe compiled in javascript
  encapsulation: ViewEncapsulation.Native
})
export class UserPollComponent implements OnInit {

  yes: number;
  no: number;
  hasVoted = false;
  pollRef: AngularFirestoreDocument<any>;
  constructor(private afs: AngularFirestore) {
    // fixes problem with timestamps
    afs.firestore.settings({timestampsInSnapshots:true})
  }

  ngOnInit() {
    this.pollRef = this.afs.doc('poll/elements');
    this.pollRef.valueChanges().pipe(
      tap(doc => {
        this.yes = doc.yes;
        this.no = doc.no;
      })
    )
      .subscribe();
  }

  vote(val: string) {
    this.hasVoted = true;
    this.pollRef.update({ [val]: this[val] + 1 });
  };

  get yesPercent() {
    return (this.yes / (this.yes + this.no)) * 100;
  };

  get noPercent() {
    return (this.no / (this.yes + this.no)) * 100;
  }
}
