import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { PageHeaderComponent } from './page-header.component';
//import { DropdownComponent } from '../../../layout/bs-component/components';

@NgModule({
    imports: [
        CommonModule,
        RouterModule,
        NgbModule.forRoot()
    ],
    declarations: [PageHeaderComponent],
    exports: [PageHeaderComponent]
})
export class PageHeaderModule { }
