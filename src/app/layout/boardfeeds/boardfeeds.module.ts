import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
    NgbCarouselModule,
    NgbAlertModule,
    NgbModule
} from '@ng-bootstrap/ng-bootstrap';
import { BoardfeedsRoutingModule } from './boardfeeds-routing.module';
import { BoardfeedsComponent } from './boardfeeds.component';
import { PageHeaderModule } from '../../shared/modules/page-header/page-header.module';
import { StatModule } from '../../shared';
import {FormsModule,ReactiveFormsModule} from '@angular/forms';
import { DatePipe } from '@angular/common';
import { ArticleviewModule } from '../../shared/view/articleview/articleview.module';
import { MagazineviewModule } from '../../shared/view/magazineview/magazineview.module';
import { TitleViewModule} from '../../shared/view/title-view/title-view.module';
import { CardViewModule } from '../../shared/view/card-view/card-view.module';
import { HoverToolbarModule } from '../../shared/modules/hover-toolbar/hover-toolbar.module';
import { SharedPipesModule } from '../../shared/pipes/shared-pipes.module';
import {NgxPaginationModule} from 'ngx-pagination';
@NgModule({
    imports: [
        CommonModule,
        NgbCarouselModule.forRoot(),
        NgbAlertModule.forRoot(),
        NgbModule.forRoot(),
        BoardfeedsRoutingModule,
        StatModule,
        PageHeaderModule,
        FormsModule,
        ReactiveFormsModule,
        MagazineviewModule,
        TitleViewModule,
        CardViewModule,
        ArticleviewModule,
        HoverToolbarModule,
        SharedPipesModule,
        NgxPaginationModule
      
    ],
    declarations: [
        BoardfeedsComponent
    
       
    ],
   
    providers: [DatePipe]
     
})
export class BoardfeedsModule { }
