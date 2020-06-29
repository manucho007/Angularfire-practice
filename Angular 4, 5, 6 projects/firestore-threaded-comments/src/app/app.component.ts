import { Component,OnInit, ChangeDetectionStrategy } from '@angular/core';
import { DbService } from './db.service'
import { Observable } from 'rxjs/Observable';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  comments;

  constructor(public db: DbService) { }

  ngOnInit() {
    this.comments = this.db.getComments();
  }


}
