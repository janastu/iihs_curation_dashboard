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
import { Global } from '../../shared/global';
import { Service } from '../../services/services';
import { AlertComponent } from './_directives/index';
import { AlertService } from './_services/index';
import {FormsModule,ReactiveFormsModule} from '@angular/forms';
import { DatePipe } from '@angular/common';
import {NgbModal, NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import { MagazineviewComponent } from './magazineview';
import { ArticleviewComponent } from './articleview';
import { CardViewComponent } from './card-view';
import { TitleViewComponent } from './title-view';
import { HoverToolbarComponent } from './components';

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
        ReactiveFormsModule
      
    ],
    declarations: [
        FeedsComponent,
        AlertComponent,
        MagazineviewComponent,
        ArticleviewComponent,
        CardViewComponent,
        TitleViewComponent,
    HoverToolbarComponent
       
    ],
   
    providers: [Service,AlertService,DatePipe,NgbModal,NgbActiveModal,Global]
     
})
export class FeedsModule { }
