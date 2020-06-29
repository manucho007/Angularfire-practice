import { Component, OnInit } from '@angular/core';
import { ContentfulService} from './contentful.service';
import { Observable} from 'rxjs/Observable';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
lessons$:Observable<any>;
constructor(private contentful: ContentfulService){}

ngOnInit(){
  this.contentful.logContent('1PLfaWMCpSS8gI6EAuWiai');
  this.lessons$ = this.contentful.getContent('15ZX1kvIt8acigaMymcCmI')
}
}
