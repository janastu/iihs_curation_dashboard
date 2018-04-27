import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TablesComponent } from './tables.component';
import { TablesRoutingModule } from './tables-routing.module';
import { PageHeaderModule } from './../../shared/modules/page-header/page-header.module';

@NgModule({
    imports: [
        CommonModule,
        TablesRoutingModule,
        PageHeaderModule
    ],
    declarations: [TablesComponent]
})
export class TablesModule { }
