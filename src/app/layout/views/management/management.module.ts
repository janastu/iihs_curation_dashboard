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
import { PageHeaderModule } from '../../../shared/modules/page-header/page-header.module';
import { StatModule } from '../../../shared';



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
   
    providers: []
     
})
export class ManagementModule { }
