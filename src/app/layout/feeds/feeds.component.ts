import { Component, OnInit, Input,Output,EventEmitter } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import 'rxjs/add/operator/filter';
import { routerTransition } from '../../router.animations';
import { fadeInAnimation } from '../../fade-in.animation';
import { DataService } from '../../services/data-service'; //Import dataservice file to get the hidden feeds
import { Global } from '../../shared/global';//Import Global to use global variables in the feeds's local scope
import * as _ from 'lodash'
import { DatePipe } from '@angular/common';
import { FeedService } from '../../services/feed-service';//Import feed service to get feeds
import { Utilities } from '../../shared';//Import utilities to perform sorting and filtering
@Component({
  
  selector: 'app-feeds',
  templateUrl: './feeds.component.html',
  styleUrls: ['./feeds.component.scss'],
  animations: [routerTransition()]
})

export class FeedsComponent implements OnInit {
spinnerState:boolean=false;//state variable to store the status of the spinner to display
p:any; //variable to store the current page nuber
pageheading:any;  //variable to store and display as page heading
feeds:any=[];          //variable to store feeds to display
view:any;      //variable to store the view state
date:any;      //variable to store the state of dates to filters
user:any;     //variable to store the username
alertNofeedsinrange:boolean=false;//alert variable to store boolean values if the given input dates has not feeds
alertNofeeds:boolean=false;//variable to store the boolean state for feeds exist or not  
 singlevalue:any=[];
  constructor(private datepipe:DatePipe,public variab:Global,public dataservice:DataService,public feedService:FeedService,private route: ActivatedRoute,public util:Utilities) { }
  //On loading Component
  ngOnInit() {

    this.user =localStorage.getItem('name');
    
    //this.usersview = localStorage.getItem('view');
 
    this.view = localStorage.getItem('view') || null;



 //Access the query parameter and filter the feeds according to category
      this.route.queryParams
            .subscribe(params => {

             this.spinnerState=true;//Set spinner 
             this.feeds.length=0;//Clear the feeds array
             //this.handleClearDate('reset');//Clear the date form

             //To get feeds , filtered according to subcategory 
             //check if the query parameter has subcatgeory property 
              if(params.subcategory){
                this.spinnerState=true;
              this.pageheading = params.subcategory;
              console.log("subca",params.subcategory);
              this.getfeedsOnSubcategory(params.subcategory).then(val=>{

                this.variab.globalfeeds = val;
                
                //Reverse the filter to sort according to latest feeds
                 //this.variab.globalfeeds.reverse();
                 this.feeds = this.variab.globalfeeds.rows[0].value;
                 this.singlevalue=this.variab.globalfeeds.rows[0];
                 console.log("feedstohtml",this.singlevalue);
                 if(this.feeds){
                   
                   this.spinnerState=false;
                 }
                 if(this.feeds.length=0){
                   this.alertNofeeds=true;
                 }
              //Call the checkForDeleted method to check for hidden/removed feeds
              //and remove those feeds from the display array  

               /*this.util.checkForDeletedFeeds(this.variab.globalfeeds).then(res=>{
                 this.feeds = res;
               });  */ 

              });
              
            }
            //To get feeds,filtered according to feedname
            else{
              this.spinnerState=true;
              //this.feeds.length=0;
             // console.log(this.spinnerState,this.feeds);
              this.pageheading = params.feedname;
              this.getfeedsOnFeedname(params.feedname).then(val=>{
                this.variab.globalfeeds = val;

                //Reverse the filter to sort according to latest feeds
                 //this.variab.globalfeeds.reverse();
              //Call the checkForDeleted method to check for hidden/removed feeds
              //and remove those feeds from the display array
                    this.feeds=this.variab.globalfeeds;
                   // console.log("every",this.feeds);
                    if(this.variab.globalfeeds){
                      this.spinnerState=false;
                    }
                    else{
                      this.alertNofeeds=true;
                    }
                  /*this.util.checkForDeletedFeeds(this.variab.globalfeeds).then(res=>{
                    this.feeds=res;
                  }); */ 

              });
            }

     });
   
  }
  //Get feeds filtered on feedname
  getfeedsOnFeedname(feedname){
    var feedsOnFeedname:any=[];
    return new Promise(resolve=>{
     //Call the feed service to get the feeds filtered according to feedname

      this.feedService.getlatestfeeds(feedname).then(res=>{
           //console.log(res);
           if(res['length'] == 0){
             this.feedService.replicatefeedsdb(feedname).then(repres=>{
               resolve(repres);
             })
           }
           else{
             feedsOnFeedname = res;
             resolve(feedsOnFeedname);
             /*this.feedService.replicatefeedsdb(feedname).then(repres=>{
               resolve(repres);
             })*/
           }
         
                       
          
      });
    });


  }
  //Get feeds filtered on subcategory
  getfeedsOnSubcategory(subcategory){
     var feedsOnSubcategory:any=[];
    return new Promise(resolve=>{

    //Call the feed service to get the feeds filtered according to subcategory
      this.feedService.getmetacategories(subcategory).then(res=>{
      console.log("sis",res);
         if(res['length'] == 0){
           this.feedService.replicatemetafeedsdb(subcategory).then(repres=>{

             resolve(repres);
           })
         }
         else{
           //Store the result in the global variable globalfeeds
           console.log("newinesle",res);
           feedsOnSubcategory = res;
         console.log("newinesle",feedsOnSubcategory.rows);
           
           resolve(feedsOnSubcategory);
         }
       
      });
    });
  }

  //Function to handle view event from page-header component
  public handleView(childView:any){
    this.view= childView;

  }
  //Function to handle Date event from page-header component
  public handleDate(childDates:any){
    this.util.filterDate(childDates,this.variab.globalfeeds).then(res=>{
      //console.log(res);
      if(res['length'] == 0){
        this.alertNofeedsinrange = true;
        setTimeout(() => this.alertNofeedsinrange = false, 2000);
      }
      else{
        this.feeds = res;
      }
    })
  
  }
  //Function to handle clear Date event from page-header component
  handleClearDate(eve){
    if(eve == 'reset'){
      this.feeds = this.variab.globalfeeds;
    }
  }
  //Function to handle sort label like 'Latest','Oldest' feeds when clicked from page-header component
  handleSort(childSortLabel:any){
    var checkForCategory:any=[];
    if(childSortLabel === 'Latest'){
      //If input is latest sort the feeds in the descending order
      this.util.sortdescending(this.variab.globalfeeds).then(res=>{
        this.feeds = res;
      })
     
    }
    if(childSortLabel === 'Oldest'){
      //If input is oldest sort the feeds in the descending order
      this.util.sortascending(this.variab.globalfeeds).then(res=>{
        this.feeds = res;
      })
    }
  }
  //Function to handle refreshed feeds when clicked from page-header component
  handleRefresh(childrefresh:any){
    this.pageheading = 'Recent feeds'
    this.feeds = childrefresh;
  }
  //Function to close alerts
  public closeAlert() {
      this.alertNofeeds=false;
  }
  onpage(){
    window.scroll(0,0);
  }
   

}




