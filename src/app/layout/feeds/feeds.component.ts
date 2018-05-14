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
import { Userservice } from '../../services/userservice';//Import feed service to get feeds
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

  constructor(private datepipe:DatePipe,public variab:Global,public dataservice:DataService,public feedService:FeedService,public userService:Userservice,private route: ActivatedRoute,public util:Utilities) { }

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
                  //console.log("subca",params.feedname);
                  //console.log("ca",params.subcategory);
                  this.getfeedsOnSubcategory(params.subcategory,params.feedname).then(val=>{


                    //console.log("Debuginfeedfedsafter",this.localfeeds);
                    //this.feeds=this.localfeeds
                     //console.log("Debuginfeedfeds",this.feeds);
                    //Reverse the filter to sort according to latest feeds
                     this.variab.globalfeeds=val;
                     this.variab.globalfeeds.reverse();
                     this.feeds = this.variab.globalfeeds;
                     
                     
                     if(this.feeds){
                       
                       this.spinnerState=false;
                     }

                     /*
                     if(this.localfeeds.length=0){
                       this.alertNofeeds=true;
                     }
                     */
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
                     this.variab.globalfeeds.reverse();
                  //Call the checkForDeleted method to check for hidden/removed feeds
                  //and remove those feeds from the display array
                        this.feeds=this.variab.globalfeeds;
                       // console.log("every",this.feeds);
                        if(this.variab.globalfeeds){
                          this.spinnerState=false;
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
   //console.log("feedsinfeedname",feedname);
    return new Promise(resolve=>{
      var firstDay = new Date();
       var previousweek= new Date(firstDay.getTime() - 7 * 24 * 60 * 60 * 1000);
     //Call the feed service to get the feeds filtered according to feedname
     this.feedService.getPostsSince(previousweek.toISOString());
      this.feedService.getlatestfeeds(feedname).then(res=>{
           //console.log("sdf",res);
           if(res['length'] == 0){
             console.log('no feeds in pouch');
            /* this.feedService.replicatefeedsdb(feedname).then(repres=>{
               resolve(repres);
             })*/
           }
           else{
             //console.log('not working replicate');
             //feedsOnFeedname = ;
             resolve(res);
             /*this.feedService.replicatefeedsdb(feedname).then(replicateres=>{
               resolve(replicateres);
             })*/
             
             
           }
         
                       
          
      });
    });


  }
  //Get feeds filtered on subcategory
  getfeedsOnSubcategory(subcategory,feedname){
    
        return new Promise(resolve=>{
        //Call the feed service to get the feeds filtered according to subcategory
          this.feedService.getmetacategories(subcategory).then(res=>{
          //console.log("sis",res);

             if(res['length'] == 0){
               this.getfeedsOnFeedname(feedname).then(val=>{
                 resolve(val);
               })

             }

               /*
               this.feedService.getlatestfeeds(feedname).then(resmain=>{
                              
                    console.log("sf",resmain);
                    resolve(resmain);
                    /*
                    if(resmain['length'] != 0){
                      console.log('working in replicate');
                      this.feedService.replicatefeedsdb(feedname).then(repres=>{
                       
                          resolve(repres);
               
               })
               }
               */

               
                     
                    
                    
               
             
             else{        
               resolve(res);
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
    this.userService.pullnewFeeds().then(res=>{
     });
    this.spinnerState=true;
    this.feeds.length = 0;
    this.getfeedsOnFeedname(childrefresh).then(val=>{
      if(val['length']==0){
            this.getfeedsOnSubcategory(childrefresh,'null').then(val=>{
                  this.variab.globalfeeds = val;

                  //Reverse the filter to sort according to latest feeds
                   this.variab.globalfeeds.reverse();
                //Call the checkForDeleted method to check for hidden/removed feeds
                //and remove those feeds from the display array
                      this.feeds=this.variab.globalfeeds;
                     // console.log("every",this.feeds);
                      if(this.variab.globalfeeds){
                        this.spinnerState=false;
                      }
            });


      }
      else{
          this.variab.globalfeeds = val;

          //Reverse the filter to sort according to latest feeds
           this.variab.globalfeeds.reverse();
        //Call the checkForDeleted method to check for hidden/removed feeds
        //and remove those feeds from the display array
              this.feeds=this.variab.globalfeeds;
             // console.log("every",this.feeds);
              if(this.variab.globalfeeds){
                this.spinnerState=false;
              }
      }
    
    //this.getfeedsOnSubcategory(childrefresh,'null').then(val=>{
      
     
          
        

    });

  }
  
 
  onpage(){
    window.scroll(0,0);
  }
   

}




