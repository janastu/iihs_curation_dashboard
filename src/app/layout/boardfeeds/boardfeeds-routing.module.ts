import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BoardfeedsComponent } from './boardfeeds.component';
import { ArticleviewComponent } from './articleview/articleview.component';
const routes: Routes = [
    { path: '', component: BoardfeedsComponent
 }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BoardfeedsRoutingModule { }
