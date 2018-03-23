import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ModalComponent } from './modal.component';
import { DialogComponentModule } from '../dialog-component/dialog-component.module';
import { CreateboardcomponentModule } from '../createboardcomponent/createboardcomponent.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
@NgModule({
    imports: [
        CommonModule,
        RouterModule,
        CreateboardcomponentModule,
        DialogComponentModule,
        NgbModule.forRoot()

    ],
    declarations: [ModalComponent],
    exports: [ModalComponent]
})
export class ModalModule { }
