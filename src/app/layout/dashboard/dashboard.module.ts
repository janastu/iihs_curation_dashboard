import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { PageHeaderModule } from './../../shared';
import { Userservice } from '../../services/userservice';
@NgModule({
  imports: [
    CommonModule,
    DashboardRoutingModule,
        PageHeaderModule
  ],
  declarations: [DashboardComponent],
  providers: [Userservice]
})
export class DashboardModule { }
