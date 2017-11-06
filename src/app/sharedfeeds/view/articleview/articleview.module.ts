import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ArticleviewComponent } from './articleview.component';
import { HoverToolbarModule } from '../../components';
//import { CreateboardcomponentModule } from '../../components';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
//import { DropdownComponent } from '../../../layout/bs-component/components';

@NgModule({
    imports: [
        CommonModule,
        RouterModule,
        HoverToolbarModule,
        NgbModule.forRoot(),
       // CreateboardcomponentModule
    ],
    declarations: [ArticleviewComponent],
    exports: [ArticleviewComponent]
})
export class ArticleviewModule { }
