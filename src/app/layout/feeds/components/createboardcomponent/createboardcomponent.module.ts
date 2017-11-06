import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { CreateboardcomponentComponent } from './createboardcomponent.component';
//import { DropdownComponent } from '../../../layout/bs-component/components';

@NgModule({
    imports: [
        CommonModule,
        RouterModule
    ],
    declarations: [CreateboardcomponentComponent ],
    exports: [CreateboardcomponentModule ]
})
export class CreateboardcomponentModule { }
