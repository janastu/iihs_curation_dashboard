import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FeedsComponent } from './feeds.component';

const routes: Routes = [
    { path: '', component: FeedsComponent
 }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FeedsRoutingModule { }
