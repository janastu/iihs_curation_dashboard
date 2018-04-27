import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HoverToolbarModule } from '../../modules/hover-toolbar/hover-toolbar.module';
import { ModalModule } from '../../modules/modal/modal.module';
import { TitleViewComponent } from './title-view.component';
import {NgxPaginationModule} from 'ngx-pagination';
import {FormsModule,ReactiveFormsModule} from '@angular/forms';
@NgModule({
    imports: [
        CommonModule,
        RouterModule,
        HoverToolbarModule,
       	ModalModule,
       	NgxPaginationModule,
       	FormsModule,
       	ReactiveFormsModule
    ],
    declarations: [TitleViewComponent],
    exports: [TitleViewComponent]
})
export class TitleViewModule { }
