import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ArticleviewComponent } from '../articleview/articleview.component';
import { ArticleToolbarModule } from '../../../shared/modules/article-toolbar/article-toolbar.module';
import { CreateboardcomponentModule } from '../../../shared/modules/createboardcomponent/createboardcomponent.module'
import { ModalModule } from '../../../shared/modules/modal/modal.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {NgxPaginationModule} from 'ngx-pagination';


@NgModule({
    imports: [
        CommonModule,
        RouterModule,
        ArticleToolbarModule,
        NgbModule.forRoot(),
       	CreateboardcomponentModule,
       	ModalModule,
        NgxPaginationModule

    ],
    declarations: [ArticleviewComponent],
    exports: [ArticleviewComponent]
})
export class ArticleviewModule { }
