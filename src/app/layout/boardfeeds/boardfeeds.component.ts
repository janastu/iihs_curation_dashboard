import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../../router.animations';
import { Service } from '../../services/services';
@Component({
  selector: 'app-boardfeeds',
  templateUrl: './boardfeeds.component.html',
  styleUrls: ['./boardfeeds.component.scss'],
  animations: [routerTransition()]
})
export class BoardfeedsComponent implements OnInit {
globalfeeds:any=[];    //variable to store feeds globally
metadata:any=[];
feeds:any=[];          //variable to store feeds to display
view:any;              //variable to store the view state
date:any;              //variable to store the state of dates to filters
  constructor(public service:Service) { }
  //On loading Component
  ngOnInit() {
    //Fetch the data from service and store in global variable
  	this.service.getAll().then(result=>{
      this.globalfeeds= result['_nr_stories'];
      this.metadata = result['_nr_metadata'];
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
    var fromdate = Date.parse(this.date.changefrom);
    var todate = Date.parse(this.date.changeto);
    console.log("global",this.globalfeeds,fromdate);
     this.feeds =  this.globalfeeds.filter((res)=>{
     
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

   this.feeds =  this.globalfeeds.filter((res)=>{
     console.log(childCategory,res.category);
       if(res.category === childCategory){
          return res;
        }

    });
  }



}
