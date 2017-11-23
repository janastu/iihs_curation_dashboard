import { Component,Input,OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { Global } from '../../global';
import {NgbDropdownConfig} from '@ng-bootstrap/ng-bootstrap';
import { BoardService } from '../../../services/board-service';
import { CategoryService } from '../../../services/category-service';

@Component({
    selector: 'app-sidebar',
    templateUrl: './sidebar.component.html',
    providers: [NgbDropdownConfig],
    styleUrls: ['./sidebar.component.scss']
})

export class SidebarComponent implements OnInit{

    boards:any=[];
    
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
    constructor(public router:Router,public variab:Global,config: NgbDropdownConfig,public boardService:BoardService,public categoryService:CategoryService){
   
        config.placement = 'top-left';
        config.autoClose = false;
    }
    ngOnInit(){
        this.boardService.getAll().then((result)=>{
            this.variab.boards=result;
        });
        /*this.categoryService.getAll().then((result)=>{
            this.variab.categoryfeeds=result;
        });*/
    }
    routeto(category){
        console.log(category);
        this.router.navigate(['/feeds',{category}])

    }
    
    
}
