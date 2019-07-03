import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AlertButtonComponent } from './alert-button/alert-button.component';

const routes: Routes = [
  { path: '', component: AlertButtonComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
