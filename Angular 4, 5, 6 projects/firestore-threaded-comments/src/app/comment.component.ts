import { Component, OnInit, Input } from '@angular/core';
import { DbService } from './db.service'

@Component({
  selector: 'app-comment',
  template: `
    <div *ngIf="comment | async as c" class="indent">
      {{ c.text }}

      <div *ngIf="c.kids">

        <app-comment *ngFor="let kid of c.kids"
          [commentId]="kid">
        </app-comment>
      </div>
    </div>

  `,
  styles: []
})
export class CommentComponent implements OnInit {

  @Input() commentId;

  comment;

  constructor(private db: DbService) { }

  ngOnInit() {
    this.comment = this.db.getComment(this.commentId);
  }

}
