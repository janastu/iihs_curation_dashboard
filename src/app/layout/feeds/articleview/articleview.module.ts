import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
    NgbCarouselModule,
    NgbAlertModule
} from '@ng-bootstrap/ng-bootstrap';


import { ArticleRoutingModule } from './article-routing.module';
import { ArticleviewComponent } from './articleview.component';
import { Service } from '../../../services/services';

@NgModule({
    imports: [
        CommonModule,
        NgbCarouselModule.forRoot(),
        NgbAlertModule.forRoot(),
        ArticleRoutingModule
    ],
    declarations: [
        ArticleviewComponent
    ],
    providers:[Service]
})
export class ArticleviewModule { }
