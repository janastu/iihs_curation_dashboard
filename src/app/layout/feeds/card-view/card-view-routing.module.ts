import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CardViewComponent } from './card-view.component';


const routes: Routes = [
    { path: '', component: CardViewComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CardViewRoutingModule { }
