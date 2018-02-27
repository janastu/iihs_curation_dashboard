import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ForgetpasswordComponent } from './forgetpassword.component';

const routes: Routes = [
    { path: '', component: ForgetpasswordComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ForgetpasswordRoutingModule { }
