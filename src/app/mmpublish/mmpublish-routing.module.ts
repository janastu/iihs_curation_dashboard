import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MmpublishComponent } from './mmpublish.component';

const routes: Routes = [
    { path: '', component: MmpublishComponent
 }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MmpublishRoutingModule { }
