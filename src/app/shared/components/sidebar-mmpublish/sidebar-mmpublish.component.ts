import { Component,Input,OnInit,Output,EventEmitter } from '@angular/core';
import { Router,ActivatedRoute } from "@angular/router";
import { Global } from '../../global';
import {NgbDropdownConfig} from '@ng-bootstrap/ng-bootstrap';
import { ArchiveService } from '../../../services/archive-service';
import * as _ from 'lodash';
import { DatePipe } from '@angular/common';
@Component({
    selector: 'app-sidebar-mmpublish',
    templateUrl: './sidebar-mmpublish.component.html',
    providers: [NgbDropdownConfig],
    styleUrls: ['./sidebar-mmpublish.component.scss']
})

export class SidebarMmpublishComponent implements OnInit{
  
    user:any;
    groupname:any;
    isActive = false;
    showMenu = '';
    selected:any;
    groups:any=[];
    showGroups:any;
    publisheddates:any=[];//Variable to store the published dates to display in the side bar
    publishedboards:any=[];//Variable to store the published boards to display in the side bar
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
   
   select(item){
         this.selected = (this.selected === item ? null : item);
         var parsedDate = Date.parse(item);//parse the date to timestamp
         let isodate = new Date(parsedDate);//get the date by passing the timestamp to get the iso conversion
        
         //Api call to fetch the board names on date
       this.archiveService.getPublishedboardsOnDates(isodate.toISOString()).then(res=>{
         this.publishedboards =res;
       })
     }
     isactive(item){
       return this.selected === item;
     }


    
    constructor(public router:Router,public variab:Global,config: NgbDropdownConfig,public archiveService:ArchiveService,public route:ActivatedRoute,public datepipe:DatePipe){
   

    }
    ngOnInit(){

      //Api call to fetch the published dates

      this.archiveService.getPublishedDates().then(res=>{
        let pubdatesuntransformed:any=[];
          pubdatesuntransformed=res;
          this.publisheddates = pubdatesuntransformed.map(date=>{
           return this.datepipe.transform(date.key, 'yyyy-MM-dd');
            
          })
         //console.log("pubdate",this.publisheddates);
      });
    }

   
    //Function called from html to filter the feeds on date
    routetodateboard(date,board){ 
        
      this.router.navigate(['/mm',board,date,'archives']);

    }
    //On choosing a group
    onChoosegroup(groupname){
      localStorage.setItem('group',groupname);
      this.showGroups=false;
     this.router.navigate(['/dashboard'],{queryParams:{memberof:groupname}});
    }
    
    
}
