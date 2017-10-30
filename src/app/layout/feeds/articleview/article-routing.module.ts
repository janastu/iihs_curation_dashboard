import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ArticleviewComponent } from './articleview.component';

const routes: Routes = [
    { path: '', component: ArticleviewComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ArticleRoutingModule { }
