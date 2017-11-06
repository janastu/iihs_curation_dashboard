import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
    NgbCarouselModule,
    NgbAlertModule,
    NgbModule
} from '@ng-bootstrap/ng-bootstrap';
import { OnFeedRoutingModule } from './on-feed-routing.module';
import { OnFeedComponent } from './on-feed.component';
import { PageHeaderModule } from '../../shared';
import { StatModule } from '../../shared';
import { Service } from '../../services/services';
import {FormsModule,ReactiveFormsModule} from '@angular/forms';
import { DatePipe } from '@angular/common';
@NgModule({
    imports: [
        CommonModule,
        NgbCarouselModule.forRoot(),
        NgbAlertModule.forRoot(),
        NgbModule.forRoot(),
        OnFeedRoutingModule,
        StatModule,
        PageHeaderModule,
        FormsModule,
        ReactiveFormsModule
      
    ],
    declarations: [
        OnFeedComponent
    
       
    ],
   
    providers: [Service,DatePipe]
     
})
export class OnFeedModule { }
