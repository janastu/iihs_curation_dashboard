import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
    NgbCarouselModule,
    NgbAlertModule,
    NgbModule
} from '@ng-bootstrap/ng-bootstrap';


import { TitleViewRoutingModule } from './title-view-routing.module';
import { PageHeaderModule } from '../../../shared';
import { Service } from '../../../services/services';
import { StatModule } from '../../../shared';
import {FormsModule,ReactiveFormsModule} from '@angular/forms';
import { DatePipe } from '@angular/common';
import {NgbModal, NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import { TitleViewComponent } from './title-view.component';
@NgModule({
    imports: [
        CommonModule,
        NgbCarouselModule.forRoot(),
        NgbAlertModule.forRoot(),
        NgbModule.forRoot(),
        StatModule,
        FormsModule,
        ReactiveFormsModule,
        PageHeaderModule,
        TitleViewRoutingModule
    ],
    declarations: [
    TitleViewComponent
       
    ],
  

    providers: [Service,DatePipe,NgbModal,NgbActiveModal]
     
})
export class TitleViewModule { }
