import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Seed } from './seed';
import { take, tap, map } from 'rxjs/operators';

@Injectable()
export class DbService {
  constructor(private afs: AngularFirestore) { }



    // Set with bucket aggregation
    async set(id: string, data: any) {
      const batch = this.afs.firestore.batch()
      const docRef = this.afs.doc(`comments/${id}`)
      const aggRef = this.afs.doc(`agg/feb_2018`)

      batch.set(docRef.ref, data)

      batch.set(aggRef.ref, { [id]: data })

      return await batch.commit()

    }




    seedMe() {

      const users = this.afs.collection('users')

      for (const i of Array(10) ) {
        const user = Seed.user()
        users.add(user)
      }
    }




    seedComments() {


      const comments = this.afs.collection('comments')

      for (const i of Array(3) ) {
        const c = Seed.comment(null);
        const parent = this.afs.doc(`comments/${c.id}`)
        parent.set(c)

        const kids = []

        for (const ii of Array(3) ) {
          const kids2 = []

          const c2 = Seed.comment(c.id);
          const child = this.afs.doc(`comments/${c2.id}`)
          child.set(c2)
          kids.push(c2.id)

          for (const iii of Array(1) ) {
            const c3 = Seed.comment(c2.id);
            this.afs.doc(`comments/${c3.id}`).set(c3)
            kids2.push(c3.id)
          }
          child.set({ kids: kids2 }, { merge: true })

        }

        parent.set({ kids }, { merge: true })
      }

    }

    getComments() {
      return this.afs.collection('comments', ref => ref

          .orderBy('createdAt', 'desc')
          .where('parent', '==', null)

        )
        .valueChanges()
    }

    getComment(id) {
      return this.afs.doc(`comments/${id}`).valueChanges()
    }



    commentAggregation() {

      const aggregateDoc = this.afs.doc(`agg/comments`)

      this.afs.collection(`comments`, ref => ref.orderBy('createdAt', 'desc')).valueChanges().pipe(
        take(1),
        tap(arr => {
          const data = {
            total: arr.length,
            lastComment: arr[0]
          }
          aggregateDoc.set(data)
        })
      )
      .subscribe()
    }

  }
