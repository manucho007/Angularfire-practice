import * as PostActions from '../actions/post.actions';
import { Post } from '../models/post.model';

export type Action = PostActions.All;

// default app State
const defaultState: Post ={
text: 'Hello, I am the default post',
likes: 0
}

// helper function to create new state object
// each state object is inmutable, so we can't just edit properties
const newState = (state, newData) =>{
// We'll create a new Object passing an empty object, the state and the newData
return Object.assign({}, state, newData);
}

// reducer function
export function postReducer( state: Post = defaultState, action: Action){
  console.log(action.type, state);
  switch(action.type){
    case PostActions.EDIT_TEXT:
      return newState(state, {text:action.payload});

    case PostActions.UPVOTE:
      return newState(state,{likes: state.likes +1});

    case PostActions.DOWNVOTE:
      return newState(state,{likes: state.likes -1});

    case PostActions.RESET:
      return defaultState;

    default:
    return state;
  }
}
