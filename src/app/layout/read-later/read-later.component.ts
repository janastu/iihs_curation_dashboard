import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../../router.animations';
import { Service } from '../../services/services';

@Component({
  selector: 'app-read-later',
  templateUrl: './read-later.component.html',
  styleUrls: ['./read-later.component.scss'],
  animations: [routerTransition()]
})
export class ReadLaterComponent implements OnInit {
feeds:any=[];                //variable to store feeds to display
metadata:any=[];             //variable to store metadata of feeds
view:any;                    //variable to store the view state
globalfeeds:any=[];          //variable to store feeds globally
date:any;                    //variable to store the state of dates to filters
  constructor(public service:Service) {
   }
   
   //On loading Component
  ngOnInit() {
    //Fetch the data from service and store in global variable
  	this.service.getAll().then(result=>{
      this.globalfeeds= result;
      this.feeds = this.globalfeeds;
    });
  }
  //Function to handle view event from page-header component
  public handleView(childView:any){
    this.view = childView;

  }
  //Function to handle Date event from page-header component
  public handleDate(childDates:any){

    this.date = childDates;
    var fromdate = Date.parse(this.date.changefrom);
    var todate = Date.parse(this.date.changeto);
    console.log("global",this.globalfeeds);
   var datefilteredfeeds =  this.globalfeeds.filter((res)=>{
      var checkdate = Date.parse(res.date);
       if(fromdate<=checkdate && todate>=checkdate){
          return res;
        }

    });
   
   this.feeds = datefilteredfeeds;
   console.log("filtered",datefilteredfeeds);
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
