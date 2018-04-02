import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
    NgbCarouselModule,
    NgbAlertModule,
    NgbModule
} from '@ng-bootstrap/ng-bootstrap';
import { SourcesRoutingModule } from './sources-routing.module';
import { SourcesComponent } from './sources.component';
import { PageHeaderModule } from './../../shared/modules/page-header/page-header.module';
import { StatModule } from '../../shared';
import { SidebarComponent } from '../../shared'

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CreateFeedModule } from '../../shared/modules/create-feed/create-feed.module';

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
   
    providers: []
     
})
export class SourcesModule { }
