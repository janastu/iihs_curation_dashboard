import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ForgetpasswordRoutingModule } from './forgetpassword-routing.module';
import { ForgetpasswordComponent } from './forgetpassword.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
    imports: [
        CommonModule,
        ForgetpasswordRoutingModule,
    	FormsModule,
    	ReactiveFormsModule,
    	NgbModule.forRoot()
    ],
    declarations: [ForgetpasswordComponent]
})
export class ForgetpasswordModule {
}
