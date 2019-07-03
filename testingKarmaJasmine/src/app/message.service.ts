import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AngularFireDatabase } from "@angular/fire/database";
@Injectable({
  providedIn: 'root'
})
export class MessageService {

  constructor(private db: AngularFireDatabase) { }

  getContent(): Observable<any> {
    const ref = this.db.object('alerts/testAlert');
    return ref.valueChanges();
  }
}
