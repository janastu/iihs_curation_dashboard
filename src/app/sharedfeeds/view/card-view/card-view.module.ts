import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CardViewComponent } from './card-view.component';
import { HoverToolbarModule } from '../../components';
//import { CreateboardcomponentModule } from '../../components';
//import { DropdownComponent } from '../../../layout/bs-component/components';

@NgModule({
    imports: [
        CommonModule,
        RouterModule,
        NgbModule.forRoot(),
        HoverToolbarModule,
        //CreateboardcomponentModule
    ],
    declarations: [CardViewComponent],
    exports: [CardViewComponent]
})
export class CardViewModule { }
