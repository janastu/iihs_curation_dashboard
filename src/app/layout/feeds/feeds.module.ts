import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
    NgbCarouselModule,
    NgbAlertModule,
    NgbModule
} from '@ng-bootstrap/ng-bootstrap';
import { FeedsRoutingModule } from './feeds-routing.module';
import { FeedsComponent } from './feeds.component';
import { PageHeaderModule } from './../../shared';
import { StatModule } from '../../shared';
//import { Service } from '../../services/services';
import {FormsModule,ReactiveFormsModule} from '@angular/forms';
import { DatePipe } from '@angular/common';
import {
    ArticleviewModule,
    MagazineviewModule,
    TitleViewModule,
    CardViewModule
} from '../../sharedfeeds/view';
import { HoverToolbarModule } from '../../sharedfeeds/components';


@NgModule({
    imports: [
        CommonModule,
        NgbCarouselModule.forRoot(),
        NgbAlertModule.forRoot(),
        NgbModule.forRoot(),
        FeedsRoutingModule,
        StatModule,
        PageHeaderModule,
        FormsModule,
        ReactiveFormsModule,
        MagazineviewModule,
        TitleViewModule,
        CardViewModule,
        ArticleviewModule,
        HoverToolbarModule
      
    ],
    declarations: [
        FeedsComponent
        
       
    ],
   
    providers: [DatePipe]
     
})
export class FeedsModule { }
