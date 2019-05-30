import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { CoreModule} from './core/core.module';
import { environment } from '../environments/environment';
import { AngularFireModule } from 'angularfire2';

import { RouterModule, Routes } from '@angular/router';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { UserLoginComponent } from './user-login/user-login.component';
import { HomeComponent } from './home/home.component';
import { UserFormComponent } from './user-form/user-form.component';
import { ReactiveFormsModule} from '@angular/forms';
const app_routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: UserLoginComponent },
  { path: 'profile', component: UserProfileComponent }
];



@NgModule({
  declarations: [
    AppComponent,
    UserProfileComponent,
    UserLoginComponent,
    HomeComponent,
    UserFormComponent
  ],
  imports: [
    BrowserModule,
    AngularFireModule.initializeApp(environment.firebase),
    RouterModule.forRoot(app_routes),
    CoreModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
