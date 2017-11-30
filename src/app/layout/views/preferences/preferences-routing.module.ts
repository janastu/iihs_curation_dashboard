import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PreferencesComponent } from './preferences.component';

const routes: Routes = [
    {
        path: '', component: PreferencesComponent
      
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class PreferencesRoutingModule { }
