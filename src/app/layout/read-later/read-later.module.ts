import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
    NgbCarouselModule,
    NgbAlertModule,
    NgbModule
} from '@ng-bootstrap/ng-bootstrap';
import { ReadLaterRoutingModule } from './read-later-routing.module';
import { ReadLaterComponent } from './read-later.component';
import { PageHeaderModule } from '../../shared';
import { StatModule } from '../../shared';
import { Service } from '../../services/services';
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
        ReadLaterRoutingModule,
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
        ReadLaterComponent
        
       
    ],
   
    providers: [Service,DatePipe]
     
})
export class ReadLaterModule { }
