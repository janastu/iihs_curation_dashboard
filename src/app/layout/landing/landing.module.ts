import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LandingRoutingModule } from './landing-routing.module';
import { LandingComponent } from './landing.component';
import { PageHeaderModule } from './../../shared';
import { Service } from '../../services/services';
@NgModule({
  imports: [
    CommonModule,
    LandingRoutingModule,
        PageHeaderModule
  ],
  declarations: [LandingComponent],
    providers: [Service]
})
export class LandingModule { }
