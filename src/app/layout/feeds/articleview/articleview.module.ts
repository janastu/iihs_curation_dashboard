import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
    NgbCarouselModule,
    NgbAlertModule
} from '@ng-bootstrap/ng-bootstrap';

import {FormsModule,ReactiveFormsModule} from '@angular/forms';
import { ArticleRoutingModule } from './article-routing.module';
import { ArticleviewComponent } from './articleview.component';
import { Service } from '../../../services/services';
import { PageHeaderModule } from '../../../shared';
import { StatModule } from '../../../shared';
import { DatePipe } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
    imports: [
        CommonModule,
        NgbCarouselModule.forRoot(),
        NgbAlertModule.forRoot(),
        ArticleRoutingModule,
         StatModule,
        PageHeaderModule,
        FormsModule,
        ReactiveFormsModule,
        NgbModule.forRoot()
    ],
    declarations: [
        ArticleviewComponent
    ],
    providers:[Service,DatePipe]
})
export class ArticleviewModule { }
