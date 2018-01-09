import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Http, HttpModule } from '@angular/http';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthGuard } from './shared';
import { Global } from './shared/global';
import { JsonConvert } from './services/utilities';
import { BoardService } from './services/board-service';
import { CategoryService } from './services/category-service';
import { DataService } from './services/data-service';
import { ComponentsService } from './services/components-service';
import { Service } from './services/services';

import { FeedService } from './services/feed-service';

import { Userservice } from './services/userservice';

//import { SpinnerModule } from 'angular-spinners';
import {HttpClientModule, HttpClient} from '@angular/common/http';
import { Settings} from './services/settings'



// AoT requires an exported function for factories
export function HttpLoaderFactory(http: HttpClient) {
    // for development
    // return new TranslateHttpLoader(http, '/start-angular/SB-Admin-BS4-Angular-4/master/dist/assets/i18n/', '.json');
    return new TranslateHttpLoader(http, '/assets/i18n/', '.json');
}
@NgModule({
    declarations: [
        AppComponent
       
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        FormsModule,
        HttpClientModule,
        HttpModule,
        AppRoutingModule,
        //SpinnerModule,
        TranslateModule.forRoot({
            loader: {
                provide: TranslateLoader,
                useFactory: HttpLoaderFactory,
                deps: [HttpClient]
            }
        })
        
    ],

    providers: [AuthGuard,Global,HttpClient,JsonConvert,BoardService,CategoryService,DataService,ComponentsService,Service,Settings,Userservice,FeedService],

    bootstrap: [AppComponent]
})
export class AppModule {
}
