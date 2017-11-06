import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CreateboardcomponentComponent } from './createboardcomponent.component';
//import { DropdownComponent } from '../../../layout/bs-component/components';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
@NgModule({
    imports: [
        CommonModule,
        RouterModule,
        NgbModule.forRoot()
    ],
    declarations: [CreateboardcomponentComponent ],
    exports: [CreateboardcomponentComponent ]
})
export class CreateboardcomponentModule { }
