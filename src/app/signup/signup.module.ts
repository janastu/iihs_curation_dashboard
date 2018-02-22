import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SignupRoutingModule } from './signup-routing.module';
import { SignupComponent } from './signup.component';
//import { AppFieldErrorDisplayModule } from '../sharedfeeds/components';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
@NgModule({
  imports: [
    CommonModule,
    SignupRoutingModule,
    FormsModule,
    ReactiveFormsModule,
   // AppFieldErrorDisplayModule,
    NgbModule.forRoot()
  ],
  declarations: [SignupComponent]
})
export class SignupModule { }
