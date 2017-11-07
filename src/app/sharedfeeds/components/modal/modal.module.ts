import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ModalComponent } from './modal.component';
import { CreateboardcomponentModule } from '../createboardcomponent/createboardcomponent.module';

@NgModule({
    imports: [
        CommonModule,
        RouterModule,
        CreateboardcomponentModule
    ],
    declarations: [ModalComponent],
    exports: [ModalComponent]
})
export class ModalModule { }
