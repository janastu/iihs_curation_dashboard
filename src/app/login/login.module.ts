import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { LoginRoutingModule } from './login-routing.module';
import { LoginComponent } from './login.component';

import { Userservice } from '../services/userservice';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
    imports: [
        CommonModule,
        LoginRoutingModule,
    	FormsModule,
    	ReactiveFormsModule
    ],
    declarations: [LoginComponent],
  	providers:[Userservice]
})
export class LoginModule {
}
