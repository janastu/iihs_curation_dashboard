import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FeedsComponent,BoardFeeds } from './feeds.component';

const routes: Routes = [
    { path: '', component: FeedsComponent },
    { path: 'boardfeeds', component: BoardFeeds }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FeedsRoutingModule { }
