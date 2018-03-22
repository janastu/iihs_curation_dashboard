import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HoverToolbarComponent } from './hover-toolbar.component';
import { CreateboardcomponentModule } from '../createboardcomponent/createboardcomponent.module';
import { ReadlaterStore } from '../../store/readlater-store';
import { DialogComponentModule } from '../dialog-component/dialog-component.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
@NgModule({
    imports: [
        CommonModule,
        RouterModule,
        CreateboardcomponentModule ,
        DialogComponentModule,
        NgbModule.forRoot()
    ],
    declarations: [HoverToolbarComponent],
    exports: [HoverToolbarComponent],
    providers:[ReadlaterStore]
})
export class HoverToolbarModule { }
