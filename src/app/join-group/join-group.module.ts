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
   
    providers: []
     
})
export class JoinGroupModule { }
