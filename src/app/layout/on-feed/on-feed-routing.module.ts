import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { OnFeedComponent } from './on-feed.component';

const routes: Routes = [
    { path: '', component: OnFeedComponent
 }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OnFeedRoutingModule { }
