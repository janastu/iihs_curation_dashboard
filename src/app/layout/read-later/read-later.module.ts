import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
    NgbCarouselModule,
    NgbAlertModule,
    NgbModule
} from '@ng-bootstrap/ng-bootstrap';
import { ReadLaterRoutingModule } from './read-later-routing.module';
import { ReadLaterComponent } from './read-later.component';
import { PageHeaderModule } from '../../shared/modules/page-header/page-header.module';
import { StatModule } from '../../shared';
import {FormsModule,ReactiveFormsModule} from '@angular/forms';
import { DatePipe } from '@angular/common';
import { ArticleviewModule } from '../../shared/view/articleview/articleview.module';
import { MagazineviewModule } from '../../shared/view/magazineview/magazineview.module';
import { TitleViewModule} from '../../shared/view/title-view/title-view.module';
import { CardViewModule } from '../../shared/view/card-view/card-view.module';
import { HoverToolbarModule } from '../../shared/modules/hover-toolbar/hover-toolbar.module';
import {NgxPaginationModule} from 'ngx-pagination';
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
        HoverToolbarModule,
        NgxPaginationModule
    ],
    declarations: [
        ReadLaterComponent
        
       
    ],
   
    providers: [DatePipe]
     
})
export class ReadLaterModule { }
