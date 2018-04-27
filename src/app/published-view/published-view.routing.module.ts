import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PublishedViewComponent } from './published-view.component';

const routes: Routes = [
    { path: '', component: PublishedViewComponent
 }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PublishedViewRoutingModule { }