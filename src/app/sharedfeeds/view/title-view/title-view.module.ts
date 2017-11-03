import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HoverToolbarModule } from '../../components';
import { TitleViewComponent } from './title-view.component';
//import { DropdownComponent } from '../../../layout/bs-component/components';

@NgModule({
    imports: [
        CommonModule,
        RouterModule,
        HoverToolbarModule
    ],
    declarations: [TitleViewComponent],
    exports: [TitleViewComponent]
})
export class TitleViewModule { }
