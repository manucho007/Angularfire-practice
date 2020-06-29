import { Injectable } from '@angular/core';
import { Subject, Observable, pipe } from 'rxjs';
import { scan, map, distinctUntilChanged, shareReplay } from 'rxjs/operators';
import { omit, get, isEqual } from 'lodash';

const win = window as any;

export class Action {
  constructor(public type: string, public payload?: any) { }
}

@Injectable({
  providedIn: 'root'
})
export class Store {
  // Inmutable object as an observable
  state: Observable<any>;
  // Rxjs Subjecta
  actions: Subject<Action> = new Subject();
  constructor() {
    // state determined by actions
    this.state = this.actions.pipe(
      reducer(),
      // Subscriber won't recieve data emitted in the past save last emitted state
      // so user will always get a value when they subscribe
      shareReplay(1)
    );
    // Redux Dev Tools
    win.devTools = win.__REDUX_DEVTOOLS_EXTENSION__.connect();
  }
  
  // dispatch actions and select state
  dispatch(action: Action) {
    this.actions.next(action);
  }

  // select slice of the state
  select(path: string) {
    return this.state.pipe(select(path));
  }
}

// Custom Rx Operators
export const reducer = () =>
  // returns scan, scan provdides acumulated object(state) and the action
  scan<any>((state, action) => {
    // return next state based on input
    let next;
    switch (action.type) {
      case 'SET':
        next = action.payload;
        break;
      case 'UPDATE':
        next = { ...state, ...action.payload };
        break;
      case 'DELETE':
        next = omit(state, action.payload);
        break;
      default:
        next = state;
        break;
    }
    win.devTools.send(action.type, next);
    return next;
  }, {});

export const select = path =>
  pipe(
    map(state => get(state, path, null)),
    distinctUntilChanged(isEqual)
  );
