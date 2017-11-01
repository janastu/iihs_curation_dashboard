import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
    NgbCarouselModule,
    NgbAlertModule,
    NgbModule
} from '@ng-bootstrap/ng-bootstrap';
import { ReadLaterRoutingModule } from './read-later-routing.module';
import { ReadLaterComponent } from './read-later.component';
import { PageHeaderModule } from './../../shared';
import { StatModule } from '../../shared';
import { Global } from '../../shared/global';
import { Service } from '../../services/services';
import {FormsModule,ReactiveFormsModule} from '@angular/forms';
import { DatePipe } from '@angular/common';
import {NgbModal, NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
@NgModule({
    imports: [
        CommonModule,
        NgbCarouselModule.forRoot(),
        NgbAlertModule.forRoot(),
        NgbModule.forRoot(),
        ReadLaterRoutingModule,
        StatModule,
        PageHeaderModule,
        FormsModule,
        ReactiveFormsModule
    ],
    declarations: [
        ReadLaterComponent
       
    ],
   
    providers: [Service,DatePipe,NgbModal,NgbActiveModal,Global]
     
})
export class ReadLaterModule { }
