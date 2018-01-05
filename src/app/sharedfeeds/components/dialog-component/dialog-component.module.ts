import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { DialogComponentComponent } from './dialog-component.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BoardService } from '../../../services/board-service';
import { CreateBoardStore } from '../../store/create-board-store';
import { ReadlaterStore } from '../../store/readlater-store';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
@NgModule({
    imports: [
        CommonModule,
        RouterModule,
        FormsModule,
        ReactiveFormsModule,
        NgbModule.forRoot()
    ],
    declarations: [DialogComponentComponent],
    exports: [DialogComponentComponent],
    providers: [BoardService,CreateBoardStore,ReadlaterStore]
})
export class DialogComponentModule { }
