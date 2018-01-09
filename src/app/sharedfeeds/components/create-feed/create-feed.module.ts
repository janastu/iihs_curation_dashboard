import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CreateFeedComponent } from './create-feed.component';
//import { DropdownComponent } from '../../../layout/bs-component/components';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CategoryService } from '../../../services/category-service';

@NgModule({
    imports: [
        CommonModule,
        RouterModule,
        FormsModule,
        ReactiveFormsModule,
        NgbModule.forRoot()
    ],
    declarations: [CreateFeedComponent ],
    exports: [CreateFeedComponent ],
    providers: [CategoryService]
})
export class CreateFeedModule { }
