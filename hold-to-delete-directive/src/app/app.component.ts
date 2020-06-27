import { Component } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styles: [
    `
      progress::-webkit-progress-value {
        transition: 0.1s all ease;
      }
    `,
  ],
})
export class AppComponent {
  customers$;
  constructor(private afs: AngularFirestore) {
    this.customers$ = this.collection$('customers');
  }
  holdHandler(e) {
    console.log(e);
  }

  // Helper to map collectiondoc IDs to Observable
  collection$(path, query?) {
    return this.afs
      .collection(path, query)
      .snapshotChanges()
      .pipe(
        map((actions) => {
          return actions.map((a) => {
            const data: any = a.payload.doc.data();
            const id = a.payload.doc.id;
            return { id, ...data };
          });
        })
      );
  }
}
