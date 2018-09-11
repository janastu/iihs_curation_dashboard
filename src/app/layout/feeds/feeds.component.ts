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
import { ComponentsService } from '../../services/components-service';//Import feed service to get feeds
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
globalfeeds:any=[];          //variable to store feeds to display
passBoards:any=[];
view:any;      //variable to store the view state
date:any;      //variable to store the state of dates to filters
user:any;     //variable to store the username
alertNofeedsinrange:boolean=false;//alert variable to store boolean values if the given input dates has not feeds
alertupdated:boolean=false//alert variable to store the status of feeds updated
alertupdating:boolean=false//alert variable to store the status of feeds updating
  constructor(private datepipe:DatePipe,public variab:Global,public dataservice:DataService,public feedService:FeedService,public userService:Userservice,private route: ActivatedRoute,public util:Utilities,public componentsService:ComponentsService) { }

  //On loading Component
  ngOnInit() {
  var date = new Date();
  var last = new Date(date.getTime() - (3 * 24 * 60 * 60 * 1000));
window.scroll(0,0);
    this.user =localStorage.getItem('name');

        //this.usersview = localStorage.getItem('view');

        this.view = localStorage.getItem('view') || null;

        //this.dataservice.removeUnwanted();
     //Access the query parameter and filter the feeds according to category
          this.route.queryParams
                .subscribe(params => {

                 this.p=0;

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

                  this.getfeedsOnSubcategory(params.subcategory,date,last).then((metaFeedsWithType:any=[])=>{


                    //Reverse the filter to sort according to latest feeds
                     //this.globalfeeds=val;
                     metaFeedsWithType.reverse();
                     //this.feeds = this.globalfeeds;
                     this.feeds = metaFeedsWithType.filter((set => f => !set.has(f.value.title) && set.add(f.value.title))(new Set));

                     if(this.feeds){

                       this.spinnerState=false;
                     }



                  });

                }
                //To get feeds,filtered according to feedname
                else{

                   this.spinnerState=true;
                  //this.feeds.length=0;

                  this.pageheading = params.feedname;
                     this.userService.getUserSubscriptions().then((resWithType:any=[])=>{
                       //this.variab.categoryfeeds=res;
                //  console.log(this.spinnerState,this.variab.categoryfeeds);
                  resWithType.map(category=>{
                    if(category.doc.feedname == params.feedname){


                            this.getAndUpdatedatabase(category,date,last).then((statusUpdate:any)=>{
                              //console.log(statusUpdate);
                              this.getfeedsOnFeedname(params.feedname).then((feedsWithType:any=[])=>{
                              //  this.globalfeeds = val;

                                //Reverse the filter to sort according to latest feeds
                                 feedsWithType.reverse();
                              //Call the checkForDeleted method to check for hidden/removed feeds
                              //and remove those feeds from the display array
                                  this.globalfeeds = feedsWithType.filter((set => f => !set.has(f.value.title) && set.add(f.value.title))(new Set));
                                    this.feeds = this.globalfeeds;
                                    this.componentsService.getMessage().subscribe(res=>{
                                    //console.log("fees",res);
                                      if(res.type == 'hide'){
                                        this.feeds.splice(res.data,1);
                                      }
                                  })

                                  if(this.feeds){

                                    this.spinnerState=false;
                                  }
                              });
                            });


                    }


                  });

                });


                }

         });



      }



  //Get feeds filtered on feedname
  getfeedsOnFeedname(feedname){
   //console.log("feedsinfeedname",feedname);
    return new Promise(resolve=>{
      /*var firstDay = new Date();
       var previousweek= new Date(firstDay.getTime() - 7 * 24 * 60 * 60 * 1000);
     //Call the feed service to get the feeds filtered according to feedname
     this.feedService.getPostsSince(previousweek.toISOString());*/
      this.feedService.getlatestfeeds(feedname).then(res=>{
           //console.log("sdf",res);
           if(res['length'] == 0){
             console.log('no feeds in pouch');
            /* this.feedService.replicatefeedsdb(feedname).then(repres=>{
               resolve(repres);
             })*/
              resolve(res);
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
  getfeedsOnSubcategory(subcategory,date,last){

        return new Promise(resolve=>{
        //Call the feed service to get the feeds filtered according to subcategory
          this.feedService.getmetacategories(subcategory,date,last).then(res=>{
          //this.feedService.feed$.subscribe(res=>{
         // console.log("sis",res);

             if(res['length'] == 0){


             }



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
 var fromdate = new Date(childDates.changefrom);
 var todate = new Date(childDates.changeto);
  this.spinnerState=true;//Set spinner
  //this.feeds.length=0;
  this.userService.getUserSubscriptions().then((resWithType:any=[])=>{
    //this.variab.categoryfeeds=res;
//  console.log(this.spinnerState,this.variab.categoryfeeds);
resWithType.map(category=>{
 if(category.doc.feedname == this.pageheading){
   //console.log(childDates);


         this.getAndUpdatedatabase(category,todate,fromdate).then((statusUpdate:any)=>{
           //console.log(statusUpdate);
           this.util.filterDate(this.pageheading,childDates).then((feedsWithType:any=[])=>{

           //  this.globalfeeds = val;
           if(feedsWithType.length == 0){
             this.alertNofeedsinrange = true;
             setTimeout(() => this.alertNofeedsinrange = false, 2000);
           }
           else{
             //Reverse the filter to sort according to latest feeds
              feedsWithType.reverse();
           //Call the checkForDeleted method to check for hidden/removed feeds
           //and remove those feeds from the display array
               this.globalfeeds = feedsWithType.filter((set => f => !set.has(f.value.title) && set.add(f.value.title))(new Set));
                 this.feeds = this.globalfeeds;
                 this.componentsService.getMessage().subscribe(res=>{
                 //console.log("fees",res);
                   if(res.type == 'hide'){
                     this.feeds.splice(res.data,1);
                   }
               })

               if(this.feeds){

                 this.spinnerState=false;
               }
             }
           });
         });


 }


});

});


  }
  //Function to handle clear Date event from page-header component
  handleClearDate(eve){
    if(eve == 'reset'){
      console.log(this.globalfeeds);
      this.feeds = this.globalfeeds;
    }
  }
  //Function to handle sort label like 'Latest','Oldest' feeds when clicked from page-header component
  handleSort(childSortLabel:any){
    var checkForCategory:any=[];
    if(childSortLabel === 'Latest'){
      //If input is latest sort the feeds in the descending order
      this.util.sortdescending(this.globalfeeds).then(res=>{
        this.feeds = res;
      })

    }
    if(childSortLabel === 'Oldest'){
      //If input is oldest sort the feeds in the descending order
      this.util.sortascending(this.globalfeeds).then(res=>{
        this.feeds = res;
      })
    }
  }
  //Function to handle refreshed feeds when clicked from page-header component
  handleRefresh(childrefresh:any){
    /*this.userService.pullnewFeeds().then(res=>{
    });*/
    var date = new Date();
    var last = new Date(date.getTime() - (3 * 24 * 60 * 60 * 1000));
    this.spinnerState=true;
    this.feeds.length = 0;
    this.getfeedsOnFeedname(childrefresh).then(val=>{
      if(val['length']==0){
            this.getfeedsOnSubcategory(childrefresh,date,last).then(val=>{
                  this.globalfeeds = val;

                  //Reverse the filter to sort according to latest feeds
                   this.globalfeeds.reverse();
                //Call the checkForDeleted method to check for hidden/removed feeds
                //and remove those feeds from the display array
                      this.feeds=this.globalfeeds;
                     // console.log("every",this.feeds);
                      if(this.globalfeeds){
                        this.spinnerState=false;
                      }
            });


      }
      else{
          this.globalfeeds = val;

          //Reverse the filter to sort according to latest feeds
           this.globalfeeds.reverse();
        //Call the checkForDeleted method to check for hidden/removed feeds
        //and remove those feeds from the display array
              this.feeds=this.globalfeeds;
             // console.log("every",this.feeds);
              if(this.globalfeeds){
                this.spinnerState=false;
              }
      }

    //this.getfeedsOnSubcategory(childrefresh,'null').then(val=>{





    });

  }


  onpage(){
  //  console.log(this.feeds);
    window.scroll(0,0);
  }
  //Get difference of feedS
  getDiffereceofFeeds(feedsarray,feedItems){



  //  if(feedsarray.length>0){
     /*  var databasefeeds = feedsarray.map(value=>{

           return value.value;

         });*/
          console.log(feedsarray.length,feedItems.length)
          var c = feedItems.filter(function(item) {
              //console.log(item);
            return !feedsarray.some(function(other) {
              //console.log(other)
              return item.title === other.value.title;
            });
          });
          console.log(c.length);
   //var res = _.difference(feedItems,databasefeeds);
     //console.log("result",res.length)

       return c;


  // }
}
getAndUpdatedatabase(category,date,last){
  var feedsFromDb:any=[];
  //var date = new Date();
  //var last = new Date(date.getTime() - (3 * 24 * 60 * 60 * 1000));
  //console.log(meta.categories[0]);
return new Promise(resolve=>{
  category.doc.metadata.map(meta=>{
    if(meta.categories[0]==undefined){
        this.getfeedsOnFeedname(category.doc.feedname).then((valWithType:any=[])=>{
        //  this.util.checkForDeletedFeeds(valWithType).then((removeDeleted:any=[])=>{

        //console.log(removeDeleted)
          this.userService.pullnewFeeds(meta.categories[0] || meta.link,last).then((feedsToUpdate:any=[])=>{
            //console.log(feedsToUpdate);
            this.util.checkForDeletedFeeds(feedsToUpdate).then((resWithType:any=[])=>{
              //console.log(res);
              var  updateFeeds =  this.getDiffereceofFeeds(valWithType,resWithType);
                if(updateFeeds.length>0){
                    this.feedService.addtopouch(updateFeeds,category.doc.feedname).then(res=>{
              //  console.log("resultsave",res);
                    if(res[0]['ok']==true){
                      resolve(true);
                    }
                })
              }
              else{
                resolve(false);
              }
            })


          });
        //});
      })
    }
    else{

      this.getfeedsOnSubcategory(meta.categories[0],date,last).then(value=>{
        feedsFromDb = value;
        this.userService.pullnewFeeds(meta.categories[0] || meta.link,last).then((feedsToUpdate:any=[])=>{

          var  updateFeeds =  this.getDiffereceofFeeds(feedsFromDb,feedsToUpdate);
            if(updateFeeds.length>0){
                this.feedService.addtopouch(updateFeeds,category.doc.feedname).then(res=>{
          //  console.log("resultsave",res);
                if(res[0]['ok']==true){
                  resolve(true);
                }
            })
          }
          else{
            resolve(false);
          }
        });

      });
    }

  });
})
}


}
