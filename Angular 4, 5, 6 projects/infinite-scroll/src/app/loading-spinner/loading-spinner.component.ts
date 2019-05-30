import { Component, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-loading-spinner',
  templateUrl: './loading-spinner.component.html',
  styleUrls: ['./loading-spinner.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class LoadingSpinnerComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
