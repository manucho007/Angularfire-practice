import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AlertButtonComponent } from './alert-button/alert-button.component';

import { AngularFireModule } from "@angular/fire";
import { environment } from "../environments/environment";
import { MessageService } from './message.service';
@NgModule({
  declarations: [
    AppComponent,
    AlertButtonComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase)
  ],
  providers: [MessageService],
  bootstrap: [AppComponent]
})
export class AppModule { }
