import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AngularFireModule } from 'angularfire2';
import { environment } from '../environments/environment';
import { AppComponent } from './app.component';
import { CoreModule} from './core/core.module';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { RouterModule,Routes} from '@angular/router';

const appRoutes:Routes=[
  {path: '', component:UserProfileComponent},
  {path: 'user-profile', component:UserProfileComponent}
];
@NgModule({
  declarations: [
    AppComponent,
    UserProfileComponent
  ],
  imports: [
    BrowserModule,
    AngularFireModule.initializeApp(environment.firebase),
    CoreModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
