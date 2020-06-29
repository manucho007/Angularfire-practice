import { Action} from '@ngrx/store';

// Takes the current state and copies it to the new state based on the changes the actions is making
export function simpleReducer(state:string = 'Hello World', action: Action){
  console.log(action.type, state);
  switch(action.type){
    case 'SPANISH':
    return state = 'Hola Mundo'

    case 'FRENCH':
    return state = 'Bonjour le monde'

    default:
    return state;
  }
}
