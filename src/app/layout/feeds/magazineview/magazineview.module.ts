import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
    NgbCarouselModule,
    NgbAlertModule
} from '@ng-bootstrap/ng-bootstrap';

import {FormsModule,ReactiveFormsModule} from '@angular/forms';
import { MagazineRoutingModule } from './magazine-routing.module';
import { MagazineviewComponent } from './magazineview.component';
import { Service } from '../../../services/services';
import { PageHeaderModule } from '../../../shared';
import { StatModule } from '../../../shared';
import { DatePipe } from '@angular/common';
import { HoverToolbarComponent } from '../components';


@NgModule({
    imports: [
        CommonModule,
        NgbCarouselModule.forRoot(),
        NgbAlertModule.forRoot(),
        MagazineRoutingModule,
        StatModule,
        PageHeaderModule,
        FormsModule,
        ReactiveFormsModule
    ],
    declarations: [
        MagazineviewComponent,
        HoverToolbarComponent
    ],
    providers:[Service,DatePipe]
})
export class MagazineviewModule { }
