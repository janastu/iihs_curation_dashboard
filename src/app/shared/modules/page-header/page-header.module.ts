import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { PageHeaderComponent } from './page-header.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ModalModule } from '../../../sharedfeeds/components/modal/modal.module';


@NgModule({
    imports: [
        CommonModule,
        RouterModule,
        NgbModule.forRoot(),
        FormsModule,
        ModalModule,
        ReactiveFormsModule
    ],
    declarations: [PageHeaderComponent],
    exports: [PageHeaderComponent]
})
export class PageHeaderModule { }
