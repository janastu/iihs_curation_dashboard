import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HoverToolbarComponent } from './hover-toolbar.component';
import { CreateboardcomponentModule } from '../createboardcomponent/createboardcomponent.module';
import { ReadlaterStore } from '../../store/readlater-store';
import { DialogComponentComponent } from '../dialog-component/dialog-component.component';
@NgModule({
    imports: [
        CommonModule,
        RouterModule,
        CreateboardcomponentModule 
    ],
    declarations: [HoverToolbarComponent,
        DialogComponentComponent],
    exports: [HoverToolbarComponent],
    providers:[ReadlaterStore]
})
export class HoverToolbarModule { }
