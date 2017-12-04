import { Component,Input,OnInit,Output,EventEmitter } from '@angular/core';
import { Router } from "@angular/router";
import { Global } from '../../global';
import {NgbDropdownConfig} from '@ng-bootstrap/ng-bootstrap';
import { DataService } from '../../../services/data-service';
import { CategoryService } from '../../../services/category-service';
import { ComponentsService } from '../../../services/components-service';

@Component({
    selector: 'app-sidebar',
    templateUrl: './sidebar.component.html',
    providers: [NgbDropdownConfig],
    styleUrls: ['./sidebar.component.scss']
})

export class SidebarComponent implements OnInit{
    @Output('boardname') outgoing:any = new EventEmitter();
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
    constructor(public router:Router,public variab:Global,config: NgbDropdownConfig,public dataservice:DataService,public categoryService:CategoryService,public componentsService:ComponentsService){
   
        config.placement = 'top-left';
        config.autoClose = false;

    }
    ngOnInit(){
        this.dataservice.getfromdatabase().then((result)=>{
                this.variab.boardupdated=result;
        })
        this.categoryService.getfrompouch().then((result)=>{
            this.variab.categoryupdated=result;
        });
    }
    routeto(category){
        console.log(category);
        this.router.navigate(['/feeds'],{ queryParams: { category } })

    }
    routetoboard(board){ 
        
        this.router.navigate(['/boardfeeds'],{ queryParams: { board } });
        //this.outgoing.emit(board);
        this.dataservice.getboardfeeds(board).then(res=>{
           console.log(res[0].value.target);
            this.componentsService.alert(board, res[0].value.target);   
     }); 


    }
   
    
    
}
