import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LazyParentComponent } from './lazy-parent/lazy-parent.component';
import { LazyChildComponent } from './lazy-child/lazy-child.component';
import { Routes,RouterModule} from '@angular/router';
import { LazyThirdComponent } from './lazy-third/lazy-third.component';

const routes: Routes=[
  {path: 'load-me', component: LazyParentComponent},
  { path: 'load-third', component: LazyThirdComponent }

];
@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  declarations: [LazyParentComponent, LazyChildComponent, LazyThirdComponent]
})
export class LazyModule { }
