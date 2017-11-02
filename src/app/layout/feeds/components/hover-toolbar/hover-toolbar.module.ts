import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { HoverToolbarComponent } from './hover-toolbar.component';
//import { DropdownComponent } from '../../../layout/bs-component/components';

@NgModule({
    imports: [
        CommonModule,
        RouterModule
    ],
    declarations: [HoverToolbarComponent],
    exports: [HoverToolbarModule]
})
export class HoverToolbarModule { }
