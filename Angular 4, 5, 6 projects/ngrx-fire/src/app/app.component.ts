import { Component } from '@angular/core';

// The store works like a service, we can inject it in the components
import { Store} from '@ngrx/store';
import { Observable} from 'rxjs/Observable';

import { Post } from'./models/post.model';
import * as PostActions from './actions/post.actions';

// First usage
interface AppState1{
  message: string;
}

// Second usage
interface AppState2{
post:Post;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  message$: Observable<string>;
  post: Observable<Post>;
  text: string; //form input val
  constructor(private store1:Store<AppState1>,
              private store2: Store<AppState2>){
    this.message$ = this.store1.select('message')
    this.post = this.store2.select('post');
    }

// First example
// Functions send actions to the reducer function to change the data
spanishMessage(){
  this.store1.dispatch({type:'SPANISH'});
}
frenchMessage(){
  this.store1.dispatch({type:'FRENCH'});
}

// Second example
editText(){
  this.store2.dispatch(new PostActions.EditText(this.text));
}
resetPost(){
  this.store2.dispatch(new PostActions.Reset());
}
upvote(){
  this.store2.dispatch(new PostActions.Upvote());
}
downvote(){
  this.store2.dispatch(new PostActions.Downvote());
}
}
