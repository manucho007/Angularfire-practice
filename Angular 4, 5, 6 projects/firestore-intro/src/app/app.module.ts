import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {AngularFireModule} from 'angularfire2';
import {AngularFirestoreModule} from 'angularfire2/firestore';
import { AppComponent } from './app.component';
import {environment} from '../environments/environment';
import { ListComponent } from './ui/list/list.component';
import { RouterModule, Routes } from '@angular/router';
import {FormsModule} from '@angular/forms';
const app_routes: Routes = [
  { path: '', component: ListComponent },
  { path: '**', pathMatch: 'full', redirectTo: '' }
];



@NgModule({
  declarations: [
    AppComponent,
    ListComponent
  ],
  imports: [
    BrowserModule,
    // enablePersistence allows to keep the data offline
    AngularFirestoreModule.enablePersistence(),
    AngularFireModule.initializeApp(environment.firebase),
    RouterModule.forRoot(app_routes),
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
