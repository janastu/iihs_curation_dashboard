import { Component,Input,OnInit,Output,EventEmitter } from '@angular/core';
import { Router } from "@angular/router";
import { Global } from '../../global';
import {NgbDropdownConfig} from '@ng-bootstrap/ng-bootstrap';
import { BoardService } from '../../../services/board-service';
import { Userservice } from '../../../services/userservice';
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
  
    user:any;
    
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
    constructor(public router:Router,public variab:Global,config: NgbDropdownConfig,public boardservice:BoardService,public userservice:Userservice,public componentsService:ComponentsService,public dataservice:DataService,public service:Service){
   

    }
    ngOnInit(){
      this.user = localStorage.getItem('name');
        //Get board annotations
                   this.dataservice.getannotations().then(res=>{
                     //Set result to global variable as it can be accessed outdside the component
                    this.variab.annotations=res;
                    
                    });
             //Get readlater annotations

                   this.dataservice.getreadlater(this.user).then(result=>{
                     //Set result to global variable as it can be accessed outdside the component
                       this.variab.readlaterfeeds=result;
                      
                   });
              //Get recently read annotaions
                   this.dataservice.getrecentlyread(this.user).then(result=>{
                       //Set result to global variable as it can be accessed outdside the component
                       this.variab.recentlyread=result;
                   });
          //Get the board names to display in the sidebar and createboard component
        this.boardservice.getboards().then((result)=>{
                //Set result to global variable as it can be accessed outdside the component
                this.variab.boardupdated=result; 
        })
        //Get the feed names to display in the sidebar and other components
        this.userservice.getUserSubscriptions().then(res=>{
           //Set result to global variable as it can be accessed outdside the component
          this.variab.categoryupdated=res;
        //  console.log(this.variab.categoryupdated)
          
        });
       
    }
    //Function called from html to navigate to feeds component with category name variable
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
    //Function called from html to navigate to boardfeeds component with boardname name variable
    routetoboard(board){ 
      
       /*this.dataservice.getboardfeeds(board).then(res=>{
           this.variab.boardfeeds = res;
           this.variab.globalboardname = board;
             this.componentsService.alertboards(board,res); 
  
     });*/
        this.router.navigate(['/boardfeeds', board ]);


    }
   
    
    
}
