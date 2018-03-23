import { Component, OnInit, Input,Output,EventEmitter } from '@angular/core';
import { routerTransition } from '../../router.animations';
import { fadeInAnimation } from '../../fade-in.animation';
import { DataService } from '../../services/data-service';//Import dataservice to fetch board feeds
import { Global } from '../../shared';//Import Global to use global variables in the board feed's local scope
import { Utilities } from '../../shared';//Import utilities to perform sorting and filtering


@Component({
  
  selector: 'app-trash-box',
  templateUrl: './trash-box.component.html',
  styleUrls: ['./trash-box.component.scss'],
  animations: [routerTransition()]
})

export class TrashBoxComponent implements OnInit {


feeds:any=[];          //variable to store feeds to display
view:any;              //variable to store the view state
date:any;              //variable to store the state of dates to filters
user:any;
catname:any;
p:any;//variable to store the current page
  constructor(public variab:Global,public dataservice:DataService,public util:Utilities) { }
  //On loading Component
  ngOnInit() {
    
    this.user = localStorage.getItem('name');
    this.view = localStorage.getItem('view');
     //Fetch the data from service and store in global variable
     this.dataservice.getdeletedfeeds(this.user).then(res=>{
       this.variab.hiddenfeeds = res;
       this.feeds = this.variab.hiddenfeeds;
     })
     
  }
  

  //Function to handle view event from page-header component
  public handleView(childView:any){
    this.view= childView;

  }

 //Function to handle sort label like 'Latest','Oldest' feeds when clicked from page-header component
 handleSort(childSortLabel:any){
  
   if(childSortLabel === 'Latest'){
   
    this.util.sortdescending(this.variab.hiddenfeeds).then(res=>{
      this.feeds = res;
      console.log(this.feeds)
    })
    
   
   }
   if(childSortLabel === 'Oldest'){
     this.util.sortascending(this.variab.hiddenfeeds).then(res=>{
       this.feeds = res;
     })
   }
 }
 //Function to handle Date event from page-header component
 public handleDate(childDates:any){

   this.util.filterDate(childDates,this.variab.hiddenfeeds).then(res=>{
     this.feeds = res;
     console.log(this.feeds);
   })

 }
 //Function to handle clear Date event from page-header component
  handleClearDate(eve){
    if(eve == 'reset'){
      this.feeds = this.variab.hiddenfeeds;
    }
  }
   

}




