import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { ContentfulService } from './contentful.service';
import { MdToHtmlPipe } from './md-to-html.pipe';


@NgModule({
  declarations: [
    AppComponent,
    MdToHtmlPipe
  ],
  imports: [
    BrowserModule
  ],
  providers: [ContentfulService],
  bootstrap: [AppComponent]
})
export class AppModule { }
