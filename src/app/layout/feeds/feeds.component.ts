import { Component, OnInit, Input } from '@angular/core';
import { routerTransition } from '../../router.animations';
import { fadeInAnimation } from '../../fade-in.animation';
import { Service } from '../../services/services';
import * as _ from 'lodash'

@Component({
  
  selector: 'app-feeds',
  templateUrl: './feeds.component.html',
  styleUrls: ['./feeds.component.scss'],
  animations: [routerTransition()]
})

export class FeedsComponent implements OnInit {
globalfeeds:any=[];    //variable to store feeds globally
feeds:any=[];          //variable to store feeds to display
metadata:any=[];       //variable to store metadata of feeds
view:any;              //variable to store the view state
date:any;              //variable to store the state of dates to filters

  constructor(public service:Service) { }
  //On loading Component
  ngOnInit() {

     //Fetch the data from service and store in global variable
     this.service.getAll().then(result=>{
       
       this.globalfeeds= result['_nr_stories'];
       this.metadata= result['_nr_metadata'];
       console.log("display",this.globalfeeds)
       this.feeds = this.globalfeeds;
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
    console.log("global",this.globalfeeds);
   this.feeds =  this.globalfeeds.filter((res)=>{
      var checkdate = Date.parse(res.date)/1000;
      console.log(checkdate);
       if(fromdate<=checkdate && todate>=checkdate){
          return res;
        }

    });
  
  }
  //Function to handle Category event from page-header component
  public handleCategory(childCategory:any){

   this.feeds =  this.globalfeeds.filter((res)=>{
     console.log(childCategory,res.category);
       if(res.category === childCategory){
          return res;
        }

    });
  }

}




