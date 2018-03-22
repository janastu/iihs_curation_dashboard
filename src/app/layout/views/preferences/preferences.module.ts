import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
    NgbCarouselModule,
    NgbAlertModule,
    NgbModule
} from '@ng-bootstrap/ng-bootstrap';
import { PreferencesRoutingModule } from './preferences-routing.module';
import { PreferencesComponent } from './preferences.component';
import { PageHeaderModule } from '../../../shared';
import { StatModule } from '../../../shared';



@NgModule({
    imports: [
        CommonModule,
        NgbCarouselModule.forRoot(),
        NgbAlertModule.forRoot(),
        NgbModule.forRoot(),
        FormsModule,
        ReactiveFormsModule,
        PreferencesRoutingModule,
        
      
    ],
    declarations: [
        PreferencesComponent
        
       
    ],
   
    providers: []
     
})
export class PreferencesModule { }
