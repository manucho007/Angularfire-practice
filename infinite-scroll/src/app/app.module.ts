import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import {PaginationService} from './pagination.service';
import { AppComponent } from './app.component';
import {AngularFireModule} from 'angularfire2';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import {environment} from '../environments/environment';
import { ScrollableDirective } from './scrollable.directive';
import { LoadingSpinnerComponent } from './loading-spinner/loading-spinner.component';
@NgModule({
  declarations: [
    AppComponent,
    ScrollableDirective,
    LoadingSpinnerComponent
  ],
  imports: [
    BrowserModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule
  ],
  providers: [PaginationService],
  bootstrap: [AppComponent]
})
export class AppModule { }
