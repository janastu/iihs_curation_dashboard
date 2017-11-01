import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MagazineviewComponent } from './magazineview.component';

const routes: Routes = [
    { path: '', component: MagazineviewComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MagazineRoutingModule { }
