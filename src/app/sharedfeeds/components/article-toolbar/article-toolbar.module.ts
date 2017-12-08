import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ArticleToolbarComponent } from './article-toolbar.component';
import { CreateboardcomponentModule } from '../createboardcomponent/createboardcomponent.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BoardService } from '../../../services/board-service';
import { CreateBoardStore } from '../../store/create-board-store';
import { ReadlaterStore } from '../../store/readlater-store';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
@NgModule({
    imports: [
        CommonModule,
        RouterModule,
        CreateboardcomponentModule,
        FormsModule,
        ReactiveFormsModule,
        NgbModule.forRoot()
    ],
    declarations: [ArticleToolbarComponent],
    exports: [ArticleToolbarComponent],
    providers: [BoardService,CreateBoardStore,ReadlaterStore]
})
export class ArticleToolbarModule { }
