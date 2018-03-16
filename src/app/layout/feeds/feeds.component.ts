import { Component, OnInit, Input,Output,EventEmitter } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import 'rxjs/add/operator/filter';
import { routerTransition } from '../../router.animations';
import { fadeInAnimation } from '../../fade-in.animation';
import { DataService } from '../../services/data-service'; //Import dataservice file to get the hidden feeds
import { Global } from '../../shared/global';//Import Global to use global variables in the dashboard's local scope
import * as _ from 'lodash'
import { DatePipe } from '@angular/common';
import { FeedService } from '../../services/feed-service';//Import feed service to get feeds

@Component({
  
  selector: 'app-feeds',
  templateUrl: './feeds.component.html',
  styleUrls: ['./feeds.component.scss'],
  animations: [routerTransition()]
})

export class FeedsComponent implements OnInit {

p:any;
pageheading:any;  //variable to store and display as page heading
feeds:any=[];          //variable to store feeds to display
view:any;      //variable to store the view state
date:any;      //variable to store the state of dates to filters
user:any;     //variable to store the username
alertrange:boolean=false; //alert variable to store boolean values if the given input is out of range
alertNofeeds:boolean=false;//alert variable to store boolean values if the given input dates has not feeds
  constructor(private datepipe:DatePipe,public variab:Global,public dataservice:DataService,public feedService:FeedService,private route: ActivatedRoute) { }
  //On loading Component
  ngOnInit() {

    this.user =localStorage.getItem('name');
    
    //this.usersview = localStorage.getItem('view');
 
    this.view = localStorage.getItem('view') || null;




 //Access the query parameter and filter the feeds according to category
      this.route.queryParams
            .subscribe(params => {
             
             //To get feeds , filtered according to subcategory 
             //check if the query parameter has subcatgeory property 
              if(params.subcategory){
                
              this.pageheading = params.subcategory;
             this.getfeedsOnSubcategory(params.subcategory).then(val=>{
                this.variab.globalfeeds = val;
                //Reverse the filter to sort according to latest feeds
                 this.variab.globalfeeds.reverse();
              //Call the checkForDeleted method to check for hidden/removed feeds
              //and remove those feeds from the display array  
               this.checkForDeletedFeeds();   

              });
              
            }
            //To get feeds,filtered according to feedname
            else{
              this.pageheading = params.feedname;
              this.getfeedsOnFeedname(params.feedname).then(val=>{
                this.variab.globalfeeds = val;
                //Reverse the filter to sort according to latest feeds
                 this.variab.globalfeeds.reverse();
              //Call the checkForDeleted method to check for hidden/removed feeds
              //and remove those feeds from the display array  
               this.checkForDeletedFeeds();   

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
       
         //Store the result in the global variable globalfeeds
           feedsOnFeedname = res;
           resolve(feedsOnFeedname);            
          
      });
    });


  }
  //Get feeds filtered on subcategory
  getfeedsOnSubcategory(subcategory){
    var feedsOnSubcategory:any=[];
    return new Promise(resolve=>{
    //Call the feed service to get the feeds filtered according to subcategory
      this.feedService.getmetacategories(subcategory).then(res=>{
    
        //Store the result in the global variable globalfeeds
        feedsOnSubcategory = res;
        resolve(feedsOnSubcategory);
      });
    });
  }
  //Function to check of any deleted feeds and pop the deleted feeds from the global buffer
  // and display the rest of the feeds
  checkForDeletedFeeds(){
    
    let hiddenfeeds:any=[];
    this.dataservice.getdeletedfeeds(this.user).then(res=>{
     hiddenfeeds=res;
     console.log(hiddenfeeds)
     if(hiddenfeeds.length == 0){
       this.feeds = this.variab.globalfeeds;
       
      // document.getElementById('loading').style.display = 'none';
       }
      
     
      this.variab.globalfeeds.map(globalfeed=>{
        hiddenfeeds.map(feed=>{
         //console.log("hiddem",feed.value._id,globalfeed.value._id)
           if(feed.value._id === globalfeed.id) {
            var i = _.indexOf(this.variab.globalfeeds,globalfeed);
            this.variab.globalfeeds.splice(i,hiddenfeeds.length);

            this.feeds = this.variab.globalfeeds;
             
           }
          // console.log("else",this.variab.globalfeeds);
          this.feeds = this.variab.globalfeeds;
 
        })
     })
     

    })

  }

  //Function to handle view event from page-header component
  public handleView(childView:any){
    this.view= childView;

  }
  //Function to handle Date event from page-header component
  public handleDate(childDates:any){

    this.date = childDates;
    //Parse the from and to dates to timestamp to filter
    var fromdate = Date.parse(this.date.changefrom);
    var todate = Date.parse(this.date.changeto);
    //Filter the globalfeeds ondate and store in the local variable feeds
    this.feeds =  this.variab.globalfeeds.filter((res)=>{
      //Check if from date less than to date
      if(fromdate<todate){
        //Get the date from every feed in the database and check if it exists between 
        //the given from and to date
       if(fromdate<=Date.parse(res.value.date) && todate>=Date.parse(res.value.date)){
        
          return res;
        }    
        //Alert if no feeds between the from and to dates
        else{
           this.alertNofeeds=true;
           setTimeout(() => this.alertNofeeds = false, 2000);

        }
      } 
      //Alert if the from date is greater than to date
      else{
         
         this.alertrange=true;
         setTimeout(() => this.alertrange = false, 2000);
      }  
    });
    
  
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
      this.route.queryParams
       .subscribe(params => {
          if(params.subcategory){
               this.getfeedsOnSubcategory(params.subcategory).then(val=>{
                  this.variab.globalfeeds = val;
                  //Reverse the filter to sort according to latest feeds
                   this.variab.globalfeeds.reverse();
                //Call the checkForDeleted method to check for hidden/removed feeds
                //and remove those feeds from the display array  
                 this.checkForDeletedFeeds();   

                });   
          }
          else{
            this.getfeedsOnFeedname(params.feedname).then(val=>{
              this.variab.globalfeeds = val;
              //Reverse the filter to sort according to latest feeds
               this.variab.globalfeeds.reverse();
            //Call the checkForDeleted method to check for hidden/removed feeds
            //and remove those feeds from the display array  
             this.checkForDeletedFeeds();   

            });

          } 
       });

     
    }
    if(childSortLabel === 'Oldest'){
      
     this.route.queryParams
      .subscribe(params => {
         if(params.subcategory){
           this.getfeedsOnSubcategory(params.subcategory).then(val=>{
              this.variab.globalfeeds = val;
            //Call the checkForDeleted method to check for hidden/removed feeds
            //and remove those feeds from the display array  
             this.checkForDeletedFeeds();   

            });
         }
         else{
          this.getfeedsOnFeedname(params.feedname).then(val=>{
            this.variab.globalfeeds = val;
          //Call the checkForDeleted method to check for hidden/removed feeds
          //and remove those feeds from the display array  
           this.checkForDeletedFeeds();   

          });

         } 
      });
    }
  }
  //Function to handle refreshed feeds when clicked from page-header component
  handleRefresh(childrefresh:any){
    this.pageheading = 'Recent feeds'
    this.feeds = childrefresh
  }
  //Function to close alerts
  public closeAlert() {
      this.alertrange=false;
      this.alertNofeeds=false;
  }
   

}




