import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
    NgbCarouselModule,
    NgbAlertModule,
    NgbModule
} from '@ng-bootstrap/ng-bootstrap';
import { PublishedViewRoutingModule } from './published-view.routing.module';
import { PublishedViewComponent } from './published-view.component';
import { SharedPipesModule } from '../shared/pipes/shared-pipes.module';
@NgModule({
    imports: [
        CommonModule,
        NgbCarouselModule.forRoot(),
        NgbAlertModule.forRoot(),
        NgbModule.forRoot(),
        PublishedViewRoutingModule,
        SharedPipesModule
      
    ],
    declarations: [
        
        PublishedViewComponent
        
       
    ],
    exports:[PublishedViewComponent]
     
})
export class PublishedViewModule { }
