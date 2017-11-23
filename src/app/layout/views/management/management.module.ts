import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
    NgbCarouselModule,
    NgbAlertModule,
    NgbModule
} from '@ng-bootstrap/ng-bootstrap';
import { ManagementRoutingModule } from './management-routing.module';
import { ManagementComponent } from './management.component';
import { PageHeaderModule } from '../../../shared';
import { StatModule } from '../../../shared';
import { Service } from '../../../services/services';




@NgModule({
    imports: [
        CommonModule,
        NgbCarouselModule.forRoot(),
        NgbAlertModule.forRoot(),
        NgbModule.forRoot(),
        FormsModule,
        ReactiveFormsModule,
        ManagementRoutingModule,
        
      
    ],
    declarations: [
        ManagementComponent
        
       
    ],
   
    providers: [Service]
     
})
export class ManagementModule { }
