import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
    NgbCarouselModule,
    NgbAlertModule,
    NgbModule
} from '@ng-bootstrap/ng-bootstrap';


import { CardViewRoutingModule } from './card-view-routing.module';
import { PageHeaderModule } from '../../../shared';
import { Service } from '../../../services/services';
import { StatModule } from '../../../shared';
import {FormsModule,ReactiveFormsModule} from '@angular/forms';
import { DatePipe } from '@angular/common';
import {NgbModal, NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import { CardViewComponent } from './card-view.component';
//import { NoopAnimationsModule } from '@angular/platform-browser/animations';
//import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
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
        CardViewRoutingModule,
        //NoopAnimationsModule
        //BrowserAnimationsModule
    ],
    declarations: [
    CardViewComponent
       
    ],
  

    providers: [Service,DatePipe,NgbModal,NgbActiveModal]
     
})
export class CardViewModule { }
