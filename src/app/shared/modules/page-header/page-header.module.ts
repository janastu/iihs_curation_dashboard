import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { PageHeaderComponent } from './page-header.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {ModalModule } from '../modal/modal.module'
import { SharedPipesModule } from '../../../shared/pipes/shared-pipes.module';
import { DialogComponentModule } from '../dialog-component/dialog-component.module';
@NgModule({
    imports: [
        CommonModule,
        RouterModule,
        NgbModule.forRoot(),
        FormsModule,
        ReactiveFormsModule,
        ModalModule,
        SharedPipesModule,
        DialogComponentModule
    ],
    declarations: [PageHeaderComponent],
    exports: [PageHeaderComponent]
})
export class PageHeaderModule { }
