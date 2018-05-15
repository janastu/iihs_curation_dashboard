import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { DbConfig } from './services/db-config';//Import to config db setup when the app loads
@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent {
    constructor(private translate: TranslateService,public dbConfig:DbConfig) {
        translate.addLangs(['en', 'fr', 'ur', 'es', 'it', 'fa']);
        translate.setDefaultLang('en');
        const browserLang = translate.getBrowserLang();
        translate.use(browserLang.match(/en|fr|ur|es|it|fa/) ? browserLang : 'en');

        //Set up the annotations database
           this.dbConfig.dbsetupannos();
        //Set up the feeds database
            this.dbConfig.dbsetupfeeds();
        //Set up the boards database
            this.dbConfig.dbsetupboards();

        //Set up the groups database
            this.dbConfig.dbsetupgroups();
        //Set up the archives database
            this.dbConfig.dbsetuparchives();


    }
}
