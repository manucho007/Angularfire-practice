import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {AuthService} from '../services/auth.service';
import { PresenceService } from '../services/presence.service';
@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  providers: [
    AuthService,
    PresenceService
  ]
})
export class CoreModule { }
