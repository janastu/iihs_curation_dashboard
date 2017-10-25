import { Component } from '@angular/core';
import { Router } from "@angular/router";
import { Global } from '../../global';

@Component({
    selector: 'app-sidebar',
    templateUrl: './sidebar.component.html',
    styleUrls: ['./sidebar.component.scss']
})

export class SidebarComponent {
    boardlabels:any=[];
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
    constructor(public router:Router,public variab:Global){
        this.boardlabels.push({
            label: 'label1'
        }, {
            label: 'label2'
            
        }, {
            label: 'label3'
        });
    }
    board(lab){
        console.log("fucn",lab);
        this.router.navigate(['/feeds/boardfeeds'])

    }
    
        
    
}
