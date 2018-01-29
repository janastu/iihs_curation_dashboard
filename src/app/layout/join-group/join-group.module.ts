import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
    NgbCarouselModule,
    NgbAlertModule,
    NgbModule
} from '@ng-bootstrap/ng-bootstrap';
import { JoinGroupRoutingModule } from './join-group-routing.module';
import { JoinGroupComponent } from './join-group.component';
import { PageHeaderModule } from '../../shared';
import { StatModule } from '../../shared';
import { Service } from '../../services/services';




@NgModule({
    imports: [
        CommonModule,
        NgbCarouselModule.forRoot(),
        NgbAlertModule.forRoot(),
        NgbModule.forRoot(),
        FormsModule,
        ReactiveFormsModule,
        JoinGroupRoutingModule,
        
      
    ],
    declarations: [
        JoinGroupComponent
        
       
    ],
   
    providers: [Service]
     
})
export class JoinGroupModule { }
