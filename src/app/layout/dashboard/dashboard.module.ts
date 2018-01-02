import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
//import { SpinnerModule } from 'angular-spinners';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { PageHeaderModule } from './../../shared';
//import { BrowserModule } from '@angular/platform-browser';
import { Userservice } from '../../services/userservice';
@NgModule({
  imports: [
    CommonModule,
    DashboardRoutingModule,
    PageHeaderModule,
   // SpinnerModule
  ],
  declarations: [DashboardComponent],
  providers: [Userservice]
})
export class DashboardModule { }
