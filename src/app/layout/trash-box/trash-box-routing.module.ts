import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TrashBoxComponent } from './trash-box.component';

const routes: Routes = [
    { path: '', component: TrashBoxComponent
 }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TrashBoxRoutingModule { }
