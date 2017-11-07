import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HoverToolbarModule,ModalModule } from '../../components';
//import { CreateboardcomponentModule } from '../../components';
import { MagazineviewComponent } from './magazineview.component';


@NgModule({
    imports: [
        CommonModule,
        RouterModule,
        HoverToolbarModule,
        ModalModule
    ],
    declarations: [MagazineviewComponent],
    exports: [MagazineviewComponent]
})
export class MagazineviewModule { }
