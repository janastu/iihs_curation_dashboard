import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../../router.animations';
import { DataService } from '../../services/data-service'; //Import data service to fetch recently read feeds
import { Global } from '../../shared';//Import Global to use global variables in the recently read feed's local scope
import { Utilities } from '../../shared';//Import utilities to perform sorting and filtering
@Component({
  selector: 'app-recently-read',
  templateUrl: './recently-read.component.html',
  styleUrls: ['./recently-read.component.scss'],
  animations: [routerTransition()]
})
export class RecentlyReadComponent implements OnInit {
feeds:any=[];                //variable to store feeds to display
metadata:any=[];             //variable to store metadata of feeds
view:any;                    //variable to store the view state
globalfeeds:any=[];          //variable to store feeds globally
date:any;                    //variable to store the state of dates to filters
user:any;
p:any;//variable to store the current page
spinnerState:boolean=false;//state variable to store the status of the spinner to display
alertNofeeds:boolean=false;//variable to store the boolean state for feeds exist or not
  constructor(public variab:Global,public dataservice:DataService,public util:Utilities) {
   }
   
   //On loading Component
  ngOnInit() {
    var doc:any=[];
    this.user = localStorage.getItem('name');
    this.view = localStorage.getItem('view');
      this.spinnerState=true;
    //Fetch the data from service and store in global variable
  	this.dataservice.getrecentlyread(this.user).then(result=>{
                      this.p=0;
                       //Set result to global variable as it can be accessed outdside the component
                       this.variab.recentlyread=result;
                       
                  this.util.checkForDeletedFeeds(this.variab.recentlyread).then(res=>{
                    this.util.sortdescending(res).then(sorted=>{
                      this.feeds = res;
                        if(this.feeds){
                          this.spinnerState=false;
                        }
                        this.alertNofeeds=false;//set alertnofeeds value to false
                        if(this.feeds.length==0){
                          this.alertNofeeds=true;
                        }
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
    this.util.filterDate(childDates,this.variab.boardfeeds).then(res=>{
      this.feeds = res;
      console.log(this.feeds);
    })

  }
  //Function to handle clear Date event from page-header component
  handleClearDate(eve){
    if(eve == 'reset'){
      this.feeds = this.variab.recentlyread;
    }
  }
  //Function to handle sort label like 'Latest','Oldest' feeds when clicked from page-header component
  handleSort(childSortLabel:any){
   
    if(childSortLabel === 'Latest'){
    
     this.util.sortdescending(this.variab.boardfeeds).then(res=>{
       this.feeds = res;
       console.log(this.feeds)
     })
     
    
    }
    if(childSortLabel === 'Oldest'){
      this.util.sortascending(this.variab.boardfeeds).then(res=>{
        this.feeds = res;
      })
    }
  }
  onpage(){
    window.scroll(0,0);
  }
   


}
