import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AngularFireModule } from 'angularfire2';
import {environment} from '../environments/environment';
import { AppComponent } from './app.component';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { RouterModule, Routes } from '@angular/router';
import { StarService } from './star.service';
import { StarReviewComponent } from './star-review/star-review.component';


@NgModule({
  declarations: [
    AppComponent,
    StarReviewComponent
  ],
  imports: [
    BrowserModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule
  ],
  providers: [StarService],
  bootstrap: [AppComponent]
})
export class AppModule { }
