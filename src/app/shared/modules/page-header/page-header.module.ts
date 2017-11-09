import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { PageHeaderComponent } from './page-header.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
    imports: [
        CommonModule,
        RouterModule,
        NgbModule.forRoot(),
        FormsModule,
        ReactiveFormsModule
    ],
    declarations: [PageHeaderComponent],
    exports: [PageHeaderComponent]
})
export class PageHeaderModule { }
