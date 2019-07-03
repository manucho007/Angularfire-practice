import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { timer } from 'rxjs';
import { MessageService } from "../message.service";
@Component({
  selector: 'alert-button',
  templateUrl: './alert-button.component.html',
  styleUrls: ['./alert-button.component.scss']
})
export class AlertButtonComponent implements OnInit {

  contentOb: Observable<any>;

  content = 'you have been warned';
  hideContent = true;
  severity = 423;

  constructor(private msgService: MessageService) { }

  ngOnInit() {
    this.contentOb = this.msgService.getContent();
  }

  toggle() {
    this.hideContent = !this.hideContent;
  }

  toggleAsync() {
    timer(500).subscribe(() => {
      this.toggle();
    });
  }


}
