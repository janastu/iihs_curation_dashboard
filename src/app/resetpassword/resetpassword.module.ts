import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ResetpasswordRoutingModule } from './resetpassword-routing.module';
import { ResetpasswordComponent } from './resetpassword.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
    imports: [
        CommonModule,
        ResetpasswordRoutingModule,
    	FormsModule,
    	ReactiveFormsModule,
    	NgbModule.forRoot()
    ],
    declarations: [ResetpasswordComponent]
})
export class ResetpasswordModule {
}
