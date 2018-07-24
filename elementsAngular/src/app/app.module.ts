import { BrowserModule } from '@angular/platform-browser';
// We import injector and createCustomElement
import { NgModule, Injector } from '@angular/core';
import { createCustomElement } from '@angular/elements';

import { UserPollComponent } from './user-poll/user-poll.component';

import { environment } from '../environments/environment';
import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule} from 'angularfire2/firestore';

@NgModule({
  declarations: [
    // AppComponent,
    UserPollComponent
  ],
  imports: [
    BrowserModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule
  ],
  entryComponents:[
    // Declare component
    UserPollComponent
  ],
  providers: [],
  bootstrap: []
})
export class AppModule {
  constructor(private injector:Injector){
    // this method converts an angular component into a custom element
    // with native dom API
  }
    ngDoBootstrap() {
      const el = createCustomElement(UserPollComponent,{injector:this.injector});
      // We define the element
      customElements.define('user-poll',el)
  }
 }
