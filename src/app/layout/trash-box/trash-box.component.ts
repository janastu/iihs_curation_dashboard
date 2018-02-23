import { Component, OnInit, Input,Output,EventEmitter } from '@angular/core';
import { routerTransition } from '../../router.animations';
import { fadeInAnimation } from '../../fade-in.animation';
import { Service } from '../../services/services';
import { DataService } from '../../services/data-service';
import { Global } from '../../shared/global';
import * as _ from 'lodash'
import { DatePipe } from '@angular/common';
import { ReadlaterStore } from '../../sharedfeeds/store/readlater-store';
import { ComponentsService } from '../../services/components-service';
declare var require:any;
var moment = require('moment');
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
  constructor(public service:Service,private datepipe:DatePipe,public variab:Global,public readlaterstore:ReadlaterStore,public dataservice:DataService,public componentsService:ComponentsService) { }
  //On loading Component
  ngOnInit() {
    
    this.user = localStorage.getItem('name');

     //Fetch the data from service and store in global variable
     this.dataservice.getalldeletedfeeds(this.user).then(res=>{
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
   
    this.variab.hiddenfeeds.sort(function(a, b) {
      
      return new Date(b.value.date).getTime() - new Date(a.value.date).getTime()
    });
    
   
   }
   if(childSortLabel === 'Oldest'){
     this.variab.hiddenfeeds.sort(function(a, b) {
        
       return new Date(a.value.date).getTime() - new Date(b.value.date).getTime()
     });
   }
 }
 //Function to handle Date event from page-header component
 public handleDate(childDates:any){

   this.date = childDates;
   var fromdate = Date.parse(this.date.changefrom);
   var todate = Date.parse(this.date.changeto);

   this.feeds =  this.variab.hiddenfeeds.filter((res)=>{
      // console.log(res.value.date);
      if(fromdate<=Date.parse(res.value.date) && todate>=Date.parse(res.value.date)){
       console.log("date",res);
         return res;
       }
      

   });

 }
   

}




