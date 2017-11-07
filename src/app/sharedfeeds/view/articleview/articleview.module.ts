import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ArticleviewComponent } from './articleview.component';
import { HoverToolbarModule,CreateboardcomponentModule } from '../../components';
import { ModalModule } from '../../components';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';


@NgModule({
    imports: [
        CommonModule,
        RouterModule,
        HoverToolbarModule,
        NgbModule.forRoot(),
       	CreateboardcomponentModule,
       	ModalModule

    ],
    declarations: [ArticleviewComponent],
    exports: [ArticleviewComponent]
})
export class ArticleviewModule { }
