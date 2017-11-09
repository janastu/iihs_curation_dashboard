import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ArticleviewComponent } from './articleview.component';
import { ArticleToolbarModule,CreateboardcomponentModule } from '../../components';
import { ModalModule } from '../../components';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';


@NgModule({
    imports: [
        CommonModule,
        RouterModule,
        ArticleToolbarModule,
        NgbModule.forRoot(),
       	CreateboardcomponentModule,
       	ModalModule

    ],
    declarations: [ArticleviewComponent],
    exports: [ArticleviewComponent]
})
export class ArticleviewModule { }
