import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../../router.animations';
//import { Service } from '../../services/services';
import { DataService } from '../../services/data-service';
import { Global } from '../../shared';
import * as _ from 'lodash'
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
user:any;
  constructor(public dataservice:DataService,public variab:Global) {
   }
   
   //On loading Component
  ngOnInit() {
   
    //Fetch the data from service and store in global variable
  	var doc:any=[];

    this.user = localStorage.getItem('name');
    this.dataservice.getreadlater(this.user).then(result=>{
      //Set result to global variable as it can be accessed outdside the component
        this.variab.readlaterfeeds=result;
  
       this.checkForDeletedFeeds();
      // this.feedFromAnnotation();
    // console.log("readlater",this.variab.readlaterfeeds);
   });
    
  }
 //Function to check of any deleted feeds and pop the deleted feeds from the global buffer
 // and display the rest of the feeds
 checkForDeletedFeeds(){
   
   let hiddenfeeds:any=[];
   this.dataservice.getdeletedfeeds(this.user).then(res=>{
    hiddenfeeds=res;
    console.log("hidden",hiddenfeeds,this.variab.readlaterfeeds)
    if(hiddenfeeds.length == 0){
      this.feeds = this.variab.readlaterfeeds;
      document.getElementById('loading').style.display = 'none';
      }
     
    console.log("resd",this.variab.readlaterfeeds)
     this.variab.readlaterfeeds.map(globalfeed=>{
       hiddenfeeds.map(feed=>{
       console.log("hiddem",feed.value._id,globalfeed.value._id)
          if(feed.value._id === globalfeed.value._id) {
           var i = _.indexOf(this.variab.readlaterfeeds,globalfeed);
           this.variab.readlaterfeeds.splice(i,hiddenfeeds.length);

           this.feeds = this.variab.readlaterfeeds;
          //  console.log("feedis",this.feeds,this.variab.readlaterfeeds)
              if(this.feeds.length == 0){
                 //this.loading = true;
                 
                 document.getElementById('loading').style.display = 'block';
              }
              else{
                  //this.loading = false;
                  document.getElementById('loading').style.display = 'none';

              }
          }
          else{
          this.feeds = this.variab.readlaterfeeds;
          if(this.feeds.length == 0){
             //this.loading = true;
             
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

    this.feeds =  this.variab.readlaterfeeds.filter((res)=>{
        
       if(fromdate<=Date.parse(res.value.date) && todate>=Date.parse(res.value.date)){
        //console.log("date",res.value.target);
          return res;
        }
       

    });

  }
  //Function to handle clear Date event from page-header component
  handleClearDate(eve){
    if(eve == 'reset'){
      this.feeds = this.variab.readlaterfeeds;
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
  
     this.variab.readlaterfeeds.sort(function(a, b) {
        
       return new Date(b.value.date).getTime() - new Date(a.value.date).getTime()
     });
    //this.feedFromAnnotation();
    }
    if(childSortLabel === 'Oldest'){
      this.variab.readlaterfeeds.sort(function(a, b) {
         
        return new Date(a.value.date).getTime() - new Date(b.value.date).getTime()
      });
  
    }
   // this.feedFromAnnotation();
  }


}
