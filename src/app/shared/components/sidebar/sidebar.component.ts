import { Component } from '@angular/core';
import { Router } from "@angular/router";
import { Global } from '../../global';
import {NgbDropdownConfig} from '@ng-bootstrap/ng-bootstrap';

@Component({
    selector: 'app-sidebar',
    templateUrl: './sidebar.component.html',
    providers: [NgbDropdownConfig],
    styleUrls: ['./sidebar.component.scss']
})

export class SidebarComponent {
    boardlabels:any=[];
    categoryfeeds:any=[];
    isActive = false;
    showMenu = '';
    eventCalled() {
        this.isActive = !this.isActive;
    }
    addExpandClass(element: any) {
        if (element === this.showMenu) {
            this.showMenu = '0';
        } else {
            this.showMenu = element;
        }
    }
    addFeedClass(element: any) {
        if (element === this.showMenu) {
            this.showMenu = '0';
        } else {
            this.showMenu = element;
        }
    }
    constructor(public router:Router,public variab:Global,config: NgbDropdownConfig){
        this.boardlabels.push({
            label: 'tech'
        }, {
            label: 'science'
            
        });
        this.categoryfeeds.push({
            categoryname: 'UrbanWater'
        }, {
            categoryname: 'UrbanEnvironment'
            
        }, {
            categoryname: 'UrbanWaste'
        });
        config.placement = 'top-left';
        config.autoClose = false;
    }
    
}
