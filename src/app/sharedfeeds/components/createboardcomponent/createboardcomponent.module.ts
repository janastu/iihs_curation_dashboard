import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CreateboardcomponentComponent } from './createboardcomponent.component';
//import { DropdownComponent } from '../../../layout/bs-component/components';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BoardService } from '../../../services/board-service';
import { CreateBoardStore } from '../../store/create-board-store';
@NgModule({
    imports: [
        CommonModule,
        RouterModule,
        FormsModule,
        ReactiveFormsModule,
        NgbModule.forRoot()
    ],
    declarations: [CreateboardcomponentComponent ],
    exports: [CreateboardcomponentComponent ],
    providers: [BoardService,CreateBoardStore]
})
export class CreateboardcomponentModule { }
