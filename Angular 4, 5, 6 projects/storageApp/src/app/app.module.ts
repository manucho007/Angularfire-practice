import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { FileUploadComponent } from './file-upload/file-upload.component';

import { AngularFireModule } from 'angularfire2';
import{ environment } from '../environments/environment';

import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularFireStorageModule } from 'angularfire2/storage';
import { FileSizePipe } from './file-size.pipe';
import { DropZoneDirective } from './drop-zone.directive';
import { DownloadUrlPipe } from './download-url.pipe';
@NgModule({
  declarations: [
    AppComponent,
    FileUploadComponent,
    FileSizePipe,
    DropZoneDirective,
    DownloadUrlPipe
  ],
  imports: [
    BrowserModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AngularFireStorageModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
