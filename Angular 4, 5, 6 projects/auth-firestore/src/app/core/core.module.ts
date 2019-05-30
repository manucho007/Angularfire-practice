import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from './auth.service';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { NotifyService } from './notify.service';
import { MessagingService } from './messaging.service';

@NgModule({
  imports: [
    CommonModule,
    AngularFireAuthModule,
    AngularFirestoreModule
  ],
  declarations: [],
  providers: [AuthService, NotifyService, MessagingService]
})
export class CoreModule { }
