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
import { ComponentsService } from '../../services/components-service';
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
loading: boolean = false;

  constructor(public service:Service,private datepipe:DatePipe,public variab:Global,public readlaterstore:ReadlaterStore,public dataservice:DataService,public componentsService:ComponentsService,private route: ActivatedRoute) { }
  //On loading Component
  ngOnInit() {
    
    
    this.usersview = localStorage.getItem('view');
 
    this.view = this.usersview;



 //Access the query parameter and filter the feeds according to category
           this.route.params
            .subscribe(params => {
              this.catname = params.id;
               this.service.getcategoryfeeds(this.catname).then(res=>{
                     this.variab.globalfeeds = res;

                     //After filtering the feeds according to category remove the hidden feeds 
                     //and display the rest feeds
                       let hiddenfeeds:any=[];
                       
                       
                      
                        this.dataservice.getdeletedfeeds(this.catname).then(res=>{
                         hiddenfeeds=res;
                         console.log("hideen",hiddenfeeds)
                         if(hiddenfeeds.length == 0){
                         this.feeds = this.variab.globalfeeds
                         }
                          this.variab.globalfeeds.map(globalfeed=>{
                            hiddenfeeds.map(feed=>{
                               if(feed.value.id === globalfeed.id) {
                                var i = _.indexOf(this.variab.globalfeeds,globalfeed);
                                this.variab.globalfeeds.splice(i,1);

                                this.feeds = this.variab.globalfeeds;

                                   if(this.feeds.length == 0){
                                      //this.loading = true;
                                      console.log("feed spiiner");
                                      document.getElementById('loading').style.display = 'block';
                                   }
                                   else{
                                       //this.loading = false;
                                       document.getElementById('loading').style.display = 'none';
                                   }
                               }
                            })
                         })

                        })
             });

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
    
       if(fromdate<=res.value.date && todate>=res.value.date){
        
          return res;
        }

    });
  
  }
  //Function to handle Category event from page-header component
  public handleCategory(childCategory:any){
    console.log("in feed",childCategory)
      this.service.getcategoryfeeds(childCategory).then(result =>{
        this.feeds = result;
        this.catname = childCategory;
      })
  }
  //Function to handle sort label like 'Latest','Oldest' feeds when clicked from page-header component
  handleSort(childSortLabel:any){
    var checkForCategory:any=[];
    if(childSortLabel === 'Latest'){
     this.service.getlatestfeeds(this.catname).then(result=>{
       this.feeds=result;
       this.feeds.reverse();
     })
    }
    if(childSortLabel === 'Oldest'){
      
     this.service.getoldestfeeds(this.catname).then(result=>{
       this.feeds=result;
       console.log(this.feeds)
     })
    }
  }
  //Function to handle refreshed feeds when clicked from page-header component
  handleRefresh(childrefresh:any){
    this.feeds = childrefresh
  }
   

}




