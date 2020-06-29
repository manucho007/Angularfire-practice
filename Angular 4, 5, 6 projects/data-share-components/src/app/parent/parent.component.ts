import { Component, OnInit, ViewChild, AfterViewInit} from '@angular/core';
import {ChildComponent} from '../child/child.component';

@Component({
  selector: 'app-parent',
  templateUrl: './parent.component.html',
  styleUrls: ['./parent.component.css']
})
export class ParentComponent implements OnInit, AfterViewInit {

@ViewChild(ChildComponent) child;
  constructor() { }
message: string = "Message from parent";
  ngOnInit() {
  }
  // Method 3
  // WE import ViewChild and AfterViewInit
  // Loads the data from the begining without the need of using an event
  ngAfterViewInit(){
    this.message = this.child.message;
  }
receiveMessage($event){
  this.message = $event;
};
}
