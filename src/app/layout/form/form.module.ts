import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormRoutingModule } from './form-routing.module';
import { FormComponent } from './form.component';
import { PageHeaderModule } from './../../shared/modules/page-header/page-header.module';

@NgModule({
    imports: [
        CommonModule,
        FormRoutingModule,
        PageHeaderModule
    ],
    declarations: [FormComponent]
})
export class FormModule { }
