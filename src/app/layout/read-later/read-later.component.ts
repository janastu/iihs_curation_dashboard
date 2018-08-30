import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../../router.animations';
import { DataService } from '../../services/data-service';//Import dataservice to fetch readlater feeds
import { ComponentsService } from '../../services/components-service';//Import dataservice to fetch readlater feeds
import { Global } from '../../shared';//Import Global to use global variables in the board feed's local scope
import { Utilities } from '../../shared';//Import utilities to perform sorting and filtering
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
annotations:any=[];          //variable to store annotations and get the feeds
date:any;                    //variable to store the state of dates to filters
user:any;
p:any;//variable to store the current page
spinnerState:boolean=false;//state variable to store the status of the spinner to display
alertNofeeds:boolean=false;//variable to store the boolean state for feeds exist or not
  constructor(public dataservice:DataService,public variab:Global,public util:Utilities,public componentsService:ComponentsService) {
   }

   //On loading Component
  ngOnInit() {

    //Fetch the data from service and store in global variable
  	var doc:any=[];

    this.user = localStorage.getItem('name');
    this.view = localStorage.getItem('view');
      this.spinnerState=true;
      this.p=0;

    this.dataservice.getreadlater(this.user).then((resultWithType:any=[])=>{


      //Set result to global variable as it can be accessed outdside the component
          this.globalfeeds=resultWithType;
          //this.feeds=this.globalfeeds;
          this.util.checkForDeletedFeeds(resultWithType).then(res=>{
            this.util.sortdescending(res).then(sorted=>{
              this.feeds = sorted;
              this.componentsService.getMessage().subscribe(res=>{
              //console.log("fees",res);
                if(res.type == 'hidelater'){
                  this.feeds.splice(res.data,1);
                }
              })
                if(this.feeds){
                  this.spinnerState=false;
                }
                this.alertNofeeds=false;//set alertnofeeds value to false
                if(this.feeds.length==0){
                  this.alertNofeeds=true;
                }
              //console.log(res);
            })

          });
    });

  }

  //Function to handle view event from page-header component
  public handleView(childView:any){
    this.view = childView;

  }
  //Function to handle Date event from page-header component
  public handleDate(childDates:any){
    this.util.filterDate(childDates,this.globalfeeds).then(res=>{
      this.feeds = res;

    });

  }
  //Function to handle clear Date event from page-header component
  handleClearDate(eve){
    if(eve == 'reset'){
      this.feeds = this.globalfeeds;
    }
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
  //Function to handle sort label like 'Latest','Oldest' feeds when clicked from page-header component
  handleSort(childSortLabel:any){
    var checkForCategory:any=[];
    if(childSortLabel === 'Latest'){
      this.util.sortdescending(this.globalfeeds).then(res=>{
        this.feeds = res;

      })
    }
    if(childSortLabel === 'Oldest'){
      this.util.sortascending(this.globalfeeds).then(res=>{
        this.feeds = res;
      })

    }
   // this.feedFromAnnotation();
  }
  onpage(){
    window.scroll(0,0);
  }



}
