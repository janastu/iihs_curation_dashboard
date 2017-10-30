import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { PageHeaderComponent } from './page-header.component';
//import { DropdownComponent } from '../../../layout/bs-component/components';

@NgModule({
    imports: [
        CommonModule,
        RouterModule
    ],
    declarations: [PageHeaderComponent],
    exports: [PageHeaderComponent]
})
export class PageHeaderModule { }
