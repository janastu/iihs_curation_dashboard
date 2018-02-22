import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HoverToolbarModule,ModalModule } from '../../components';
//import { CreateboardcomponentModule } from '../../components';
import { TitleViewComponent } from './title-view.component';
//import { DropdownComponent } from '../../../layout/bs-component/components';
import {NgxPaginationModule} from 'ngx-pagination';
@NgModule({
    imports: [
        CommonModule,
        RouterModule,
        HoverToolbarModule,
       	ModalModule,
       	NgxPaginationModule
    ],
    declarations: [TitleViewComponent],
    exports: [TitleViewComponent]
})
export class TitleViewModule { }
