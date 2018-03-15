import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { PageHeaderModule } from './../../shared'; //Import the Pageheader Module from shared and declare in imports
import { Userservice } from '../../services/userservice';//Import the User Service from services and declare in Providers
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
