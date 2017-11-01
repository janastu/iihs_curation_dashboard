import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ReadLaterComponent } from './read-later.component';

const routes: Routes = [
    { path: '', component: ReadLaterComponent
 }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReadLaterRoutingModule { }
