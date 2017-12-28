import { Component,Input,OnInit,Output,EventEmitter } from '@angular/core';
import { Router } from "@angular/router";
import { Global } from '../../global';
import {NgbDropdownConfig} from '@ng-bootstrap/ng-bootstrap';
import { BoardService } from '../../../services/board-service';
import { CategoryService } from '../../../services/category-service';
import { ComponentsService } from '../../../services/components-service';
import { DataService } from '../../../services/data-service';
import { Service } from '../../../services/services';
@Component({
    selector: 'app-sidebar',
    templateUrl: './sidebar.component.html',
    providers: [NgbDropdownConfig],
    styleUrls: ['./sidebar.component.scss']
})

export class SidebarComponent implements OnInit{
  
    
    
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
    constructor(public router:Router,public variab:Global,config: NgbDropdownConfig,public boardservice:BoardService,public categoryService:CategoryService,public componentsService:ComponentsService,public dataservice:DataService,public service:Service){
   

    }
    ngOnInit(){
        this.boardservice.getboards().then((result)=>{
                
                this.variab.boardupdated=result;
        })
        this.categoryService.getfrompouch().then((result)=>{
            //console.log(result);
            this.variab.categoryupdated=result;
        });
    }
    routeto(category){
        
        
        this.router.navigate(['/feeds',category] )
       // console.log(category);
          /*this.service.getcategoryfeeds(category).then(res=>{
                 this.variab.globalcatname = category;
                   this.variab.globalfeeds=res;
                     //console.log(this.variab.globalfeeds);
                 this.componentsService.alert(category,res); 
        
        });*/

    }
    routetoboard(board){ 
      
       /*this.dataservice.getboardfeeds(board).then(res=>{
           this.variab.boardfeeds = res;
           this.variab.globalboardname = board;
             this.componentsService.alertboards(board,res); 
  
     });*/
        this.router.navigate(['/boardfeeds', board ]);


    }
   
    
    
}
