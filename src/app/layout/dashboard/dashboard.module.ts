import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { PageHeaderModule } from './../../shared';
//import { Service } from '../../services/services';
@NgModule({
  imports: [
    CommonModule,
    DashboardRoutingModule,
        PageHeaderModule
  ],
  declarations: [DashboardComponent]
})
export class DashboardModule { }
