import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { JoinGroupComponent } from './join-group.component';

const routes: Routes = [
    {
        path: '', component: JoinGroupComponent
      
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class JoinGroupRoutingModule { }
