import { Component, OnInit, Input } from '@angular/core';
import { routerTransition } from '../../router.animations';
import { fadeInAnimation } from '../../fade-in.animation';
import { Service } from '../../services/services';
import { Global } from '../../shared/global';
import * as _ from 'lodash'
import { DatePipe } from '@angular/common';
declare var require:any;
var moment = require('moment');
@Component({
  
  selector: 'app-feeds',
  templateUrl: './feeds.component.html',
  styleUrls: ['./feeds.component.scss'],
  animations: [routerTransition()]
})

export class FeedsComponent implements OnInit {

feeds:any=[];          //variable to store feeds to display
metadata:any=[];       //variable to store metadata of feeds
view:any;              //variable to store the view state
date:any;              //variable to store the state of dates to filters

  constructor(public service:Service,private datepipe:DatePipe,public variab:Global) { }
  //On loading Component
  ngOnInit() {
    
     //Fetch the data from service and store in global variable
     this.service.getfrompouch().then(result=>{
       
       this.variab.globalfeeds= result;
       this.feeds = this.variab.globalfeeds;
     });
  }
  

  //Function to handle view event from page-header component
  public handleView(childView:any){
    this.view= childView;

  }
  //Function to handle Date event from page-header component
  public handleDate(childDates:any){

    this.date = childDates;
    var fromdate = Date.parse(this.date.changefrom);
    var todate = Date.parse(this.date.changeto);
    this.feeds =  this.variab.globalfeeds.filter((res)=>{
      
      var chunks = res.date.split('.');

      var formattedDate = chunks[2]+'.'+chunks[1]+'.'+chunks[0];
      var checkdate = Date.parse(formattedDate);
      console.log("ch",formattedDate,checkdate);
       if(fromdate<=checkdate && todate>=checkdate){
          return res;
        }

    });
  
  }
  //Function to handle Category event from page-header component
  public handleCategory(childCategory:any){

   this.feeds =  this.variab.globalfeeds.filter((res)=>{
     console.log(childCategory,res.category);
       if(res.category === childCategory){
          return res;
        }

    });
  }
 

}




