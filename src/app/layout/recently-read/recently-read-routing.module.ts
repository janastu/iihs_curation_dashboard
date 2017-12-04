import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RecentlyReadComponent } from './recently-read.component';

const routes: Routes = [
    { path: '', component: RecentlyReadComponent
 }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RecentlyReadRoutingModule { }
