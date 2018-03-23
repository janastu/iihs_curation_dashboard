import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CardViewComponent } from './card-view.component';
import { HoverToolbarModule } from '../../../shared/modules/hover-toolbar/hover-toolbar.module';
import { ModalModule } from '../../../shared/modules/modal/modal.module';

@NgModule({
    imports: [
        CommonModule,
        RouterModule,
        NgbModule.forRoot(),
        HoverToolbarModule,
        ModalModule
    ],
    declarations: [CardViewComponent],
    exports: [CardViewComponent]
})
export class CardViewModule { }
