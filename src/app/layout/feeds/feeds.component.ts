import { Component, OnInit, Input,Output,EventEmitter } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import 'rxjs/add/operator/filter';
import { routerTransition } from '../../router.animations';
import { fadeInAnimation } from '../../fade-in.animation';
import { Service } from '../../services/services';
import { DataService } from '../../services/data-service';
import { Global } from '../../shared/global';
import * as _ from 'lodash'
import { DatePipe } from '@angular/common';
import { ReadlaterStore } from '../../sharedfeeds/store/readlater-store';
import { FeedService } from '../../services/feed-service';
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
view:any;              //variable to store the view state
date:any;              //variable to store the state of dates to filters
catname:any;
usersview:any;
user:any;
alertrange:boolean=false;
  constructor(public service:Service,private datepipe:DatePipe,public variab:Global,public readlaterstore:ReadlaterStore,public dataservice:DataService,public feedService:FeedService,private route: ActivatedRoute) { }
  //On loading Component
  ngOnInit() {
    this.user =localStorage.getItem('name');
    
    this.usersview = localStorage.getItem('view');
 
    this.view = this.usersview;



 //Access the query parameter and filter the feeds according to category
           this.route.queryParams
            .subscribe(params => {
              console.log(params);
              this.feedService.getcategoryfeeds(params.feedname);
              if(params.subcategory){
                
              this.catname = params.subcategory;
              this.feedService.getmetacategories(this.catname).then(res=>{
                console.log(res);
                this.variab.globalfeeds = res;
                 this.variab.globalfeeds.reverse();
                 this.checkForDeletedFeeds(); 
              })
            }
            else{
              this.catname = params.feedname
               this.feedService.getlatestfeeds(params.feedname).then(res=>{
                
                 
                    this.variab.globalfeeds = res;
                     this.variab.globalfeeds.reverse();
                     //After filtering the feeds according to category remove the hidden feeds 
                     //and display the rest feeds
                       
                      
                       
                    this.checkForDeletedFeeds();   
                       
                        
                   
             });
            }

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
       console.log("check",this.variab.globalfeeds);
       document.getElementById('loading').style.display = 'none';
       }
      
     
      this.variab.globalfeeds.map(globalfeed=>{
        hiddenfeeds.map(feed=>{
         console.log("hiddem",feed.value._id,globalfeed.value._id)
           if(feed.value._id === globalfeed.id) {
            var i = _.indexOf(this.variab.globalfeeds,globalfeed);
            this.variab.globalfeeds.splice(i,hiddenfeeds.length);

            this.feeds = this.variab.globalfeeds;
             //console.log("feedis",this.feeds,this.variab.globalfeeds)
               if(this.feeds.length == 0){
                  //this.loading = true;
                  
                  document.getElementById('loading').style.display = 'block';
               }
               else{
                   //this.loading = false;
                   document.getElementById('loading').style.display = 'none';

               }
           }
          // console.log("else",this.variab.globalfeeds);
          this.feeds = this.variab.globalfeeds;
          if(this.feeds.length == 0){
             //this.loading = true;
             
             document.getElementById('loading').style.display = 'block';
          }
          else{
              //this.loading = false;
              document.getElementById('loading').style.display = 'none';

          }
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
    //this.feeds = childDates;
    this.date = childDates;
    var xmlLink:any;
    var fromdate = Date.parse(this.date.changefrom);
    var todate = Date.parse(this.date.changeto);

    this.feeds =  this.variab.globalfeeds.filter((res)=>{
        
       if(fromdate<=Date.parse(res.value.date) && todate>=Date.parse(res.value.date)){
        
          return res;
        }     
        else{
          this.alertrange=true;
        }

    });

    /*if (this.feeds.length == 0) {
     //console.log("apito newsrack",xmlLink); 
     this.feedService.getRangeFeeds(fromdate,todate,xmlLink).then(res=>{
             return res;
      }) 
    }*/
    
  
  }
  //Function to handle Category event from page-header component
  public handleCategory(childCategory:any){
    console.log("in feed",childCategory)
     /* this.feedService.getcategoryfeeds(childCategory).then(result =>{
        this.feeds = result;
        this.catname = childCategory;
      })*/
  }
  //Function to handle sort label like 'Latest','Oldest' feeds when clicked from page-header component
  handleSort(childSortLabel:any){
    var checkForCategory:any=[];
    if(childSortLabel === 'Latest'){
      this.route.queryParams
       .subscribe(params => {
          if(params.subcategory){
            this.feedService.getmetacategories(params.subcategory).then(result=>{
                this.variab.globalfeeds=result;
                this.checkForDeletedFeeds();
                
                this.variab.globalfeeds.reverse();

            })
          }
          else{
            this.feedService.getlatestfeeds(this.catname).then(result=>{
              this.variab.globalfeeds=result;
              this.checkForDeletedFeeds();
              //this.feeds=this.variab.globalfeeds;
              this.variab.globalfeeds.reverse();
              
              
            })

          } 
       });

     
    }
    if(childSortLabel === 'Oldest'){
      
     this.route.queryParams
      .subscribe(params => {
         if(params.subcategory){
           this.feedService.getmetacategories(params.subcategory).then(result=>{
               this.variab.globalfeeds=result;
               this.checkForDeletedFeeds();

           })
         }
         else{
           this.feedService.getlatestfeeds(this.catname).then(result=>{
             this.variab.globalfeeds=result;
             this.checkForDeletedFeeds();
             
           })

         } 
      });
    }
  }
  //Function to handle refreshed feeds when clicked from page-header component
  handleRefresh(childrefresh:any){
    this.catname = 'Recent feeds'
    this.feeds = childrefresh
  }
   

}




