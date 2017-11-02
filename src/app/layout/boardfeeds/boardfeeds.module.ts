import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
    NgbCarouselModule,
    NgbAlertModule,
    NgbModule
} from '@ng-bootstrap/ng-bootstrap';
import { BoardfeedsRoutingModule } from './boardfeeds-routing.module';
import { BoardfeedsComponent } from './boardfeeds.component';
import { PageHeaderModule } from './../../shared';
import { StatModule } from '../../shared';
import { Global } from '../../shared/global';
import { Service } from '../../services/services';
import {FormsModule,ReactiveFormsModule} from '@angular/forms';
import { DatePipe } from '@angular/common';
import {NgbModal, NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
//import { HoverToolbarModule } from '../../shared';
@NgModule({
    imports: [
        CommonModule,
        NgbCarouselModule.forRoot(),
        NgbAlertModule.forRoot(),
        NgbModule.forRoot(),
        BoardfeedsRoutingModule,
        StatModule,
        PageHeaderModule,
        FormsModule,
        ReactiveFormsModule
      
    ],
    declarations: [
        BoardfeedsComponent
       
    ],
   
    providers: [Service,DatePipe,NgbModal,NgbActiveModal,Global]
     
})
export class BoardfeedsModule { }
