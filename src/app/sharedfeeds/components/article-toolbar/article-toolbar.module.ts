import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ArticleToolbarComponent } from './article-toolbar.component';
import { CreateboardcomponentModule } from '../createboardcomponent/createboardcomponent.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
@NgModule({
    imports: [
        CommonModule,
        RouterModule,
        CreateboardcomponentModule,
        NgbModule.forRoot()
    ],
    declarations: [ArticleToolbarComponent],
    exports: [ArticleToolbarComponent]
})
export class ArticleToolbarModule { }
