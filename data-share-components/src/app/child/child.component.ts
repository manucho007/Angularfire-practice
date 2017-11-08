import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-child',
  templateUrl: './child.component.html',
  styleUrls: ['./child.component.css']
})
export class ChildComponent implements OnInit {
  //allows variable to be received from the parent component
  //The variable is in the HTML Method 1
  // @Input() message: string;

  // Method2
  message:string="Message from child";
  @Output() messageEvent = new EventEmitter<string>();
  constructor() { }

  ngOnInit() {
  }

  sendMessage(){
    this.messageEvent.emit(this.message);
  };
}
// For the 1 method we import input
// For the 2 method we import Output and EventEmitter
