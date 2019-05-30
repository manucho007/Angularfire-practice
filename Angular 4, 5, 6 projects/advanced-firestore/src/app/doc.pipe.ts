import { Pipe, PipeTransform } from '@angular/core';
import { FirestoreService } from './firestore.service';
import { Observable } from 'rxjs/Observable';

@Pipe({
  name: 'doc'
})
export class DocPipe implements PipeTransform {

  constructor(private db: FirestoreService) {}
  transform(value: any): Observable<any> {
    return this.db.doc$(value.path)
  }

}
