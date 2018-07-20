import { Component } from '@angular/core';
import { Store, Action} from './store.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  spanish;
  french;
  constructor(private store:Store){
    this.spanish = store.select('spanish.hola');
    this.french = store.select('french.bonjour');
  }

  set(){
    this.store.dispatch(new Action('SET', {hello:'world'}));
  }
  update(){
    this.store.dispatch(new Action('UPDATE',{spanish:{hola:'mundo'},french:{bonjour:'le monde'}}));
  }
  delete(){
    this.store.dispatch(new Action('DELETE','spanish'));
  }
}
