import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CardViewComponent } from './card-view.component';
import { HoverToolbarModule } from '../../modules/hover-toolbar/hover-toolbar.module';
import { ModalModule } from '../../modules/modal/modal.module';
import {NgxPaginationModule} from 'ngx-pagination';
@NgModule({
    imports: [
        CommonModule,
        RouterModule,
        NgbModule.forRoot(),
        HoverToolbarModule,
        ModalModule,
        NgxPaginationModule
    ],
    declarations: [CardViewComponent],
    exports: [CardViewComponent]
})
export class CardViewModule { }
