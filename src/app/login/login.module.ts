import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { LoginRoutingModule } from './login-routing.module';
import { LoginComponent } from './login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DialogComponentModule } from '../shared/modules/dialog-component/dialog-component.module';
@NgModule({
    imports: [
      CommonModule,
      LoginRoutingModule,
    	FormsModule,
    	ReactiveFormsModule,
    	DialogComponentModule,
    	NgbModule.forRoot()
    ],
    declarations: [LoginComponent]
})
export class LoginModule {
}
