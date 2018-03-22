import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
    NgbCarouselModule,
    NgbAlertModule,
    NgbModule
} from '@ng-bootstrap/ng-bootstrap';
import { TrashBoxRoutingModule } from './trash-box-routing.module';
import { TrashBoxComponent } from './trash-box.component';
import { PageHeaderModule } from './../../shared';
import { StatModule } from '../../shared';
import {FormsModule,ReactiveFormsModule} from '@angular/forms';
import { DatePipe } from '@angular/common';
import {
    ArticleviewModule,
    MagazineviewModule,
    TitleViewModule,
    CardViewModule
} from '../../shared/view';
import { HoverToolbarModule } from '../../shared/modules/hover-toolbar/hover-toolbar.module';
import {NgxPaginationModule} from 'ngx-pagination';

@NgModule({
    imports: [
        CommonModule,
        NgbCarouselModule.forRoot(),
        NgbAlertModule.forRoot(),
        NgbModule.forRoot(),
        TrashBoxRoutingModule,
        StatModule,
        PageHeaderModule,
        FormsModule,
        ReactiveFormsModule,
        MagazineviewModule,
        TitleViewModule,
        CardViewModule,
        ArticleviewModule,
        HoverToolbarModule,
        NgxPaginationModule
      
    ],
    declarations: [
        TrashBoxComponent
        
       
    ],
   
    providers: [DatePipe]
     
})
export class TrashBoxModule { }
