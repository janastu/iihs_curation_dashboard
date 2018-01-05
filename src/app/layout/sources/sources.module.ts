import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
    NgbCarouselModule,
    NgbAlertModule,
    NgbModule
} from '@ng-bootstrap/ng-bootstrap';
import { SourcesRoutingModule } from './sources-routing.module';
import { SourcesComponent } from './sources.component';
import { PageHeaderModule } from './../../shared';
import { StatModule } from '../../shared';
import { Service } from '../../services/services';
import { SidebarComponent } from '../../shared'

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CreateFeedModule } from '../../sharedfeeds/components';

@NgModule({
    imports: [
        CommonModule,
        NgbCarouselModule.forRoot(),
        NgbAlertModule.forRoot(),
        NgbModule.forRoot(),
        SourcesRoutingModule,
        FormsModule,
        ReactiveFormsModule,
        CreateFeedModule
        
          
    ],
    declarations: [
        SourcesComponent
        
       
    ],
   
    providers: [Service]
     
})
export class SourcesModule { }
