import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../../router.animations';
import { ActivatedRoute } from '@angular/router';
import 'rxjs/add/operator/filter';
import { DataService } from '../../services/data-service';//Import dataservice to fetch board feeds
import { ArchiveService } from '../../services/archive-service';//Import dataservice to fetch board feeds
import { Global } from '../../shared';//Import Global to use global variables in the board feed's local scope
import { Utilities } from '../../shared';//Import utilities to perform sorting and filtering
import * as _ from 'lodash'
@Component({
  selector: 'app-boardfeeds',
  templateUrl: './boardfeeds.component.html',
  styleUrls: ['./boardfeeds.component.scss'],
  animations: [routerTransition()]
})
export class BoardfeedsComponent implements OnInit {
//Local Variable declarations
p:any;//variable to store the current page
feeds:any=[];          //Variable to store feeds to display
view:any;              //Variable to store the view state
date:any;              //Variable to store the state of dates to filters
boardname:any;         //Variable to store the board name to display in the page heading
user:any;              //Variable to store user name of the logged in user
publishedfeeds:any=[]; //Variable to sotre the values of already published feeds
spinnerState:boolean=false;//state variable to store the status of the spinner to display
checkedfeeds:any=[]; //Variable to sotre the feeds that are checked 
selectedAll:any;
alertNofeeds:boolean=false;//variable to store the boolean state for feeds exist or not
  constructor(public dataService:DataService,public variab:Global,private route: ActivatedRoute,public util: Utilities,public archiveService: ArchiveService) { }
  //On loading Component
  ngOnInit() {
    //Get the user name from local storage and store in a local variable
    this.user =localStorage.getItem('name');
    this.view = localStorage.getItem('view');
     
    //Get the boardname from query parameters
    this.route.params
         .subscribe(params => {

           this.boardname = params.id;

             this.feeds.length=0;//Clear the feeds array 

           //Call service function to get board feeds by passing board name as parameter
             this.spinnerState=true; //Set the spinner state variable to true
           this.dataService.getboardfeeds(params.id).then(res=>{
              this.variab.boardfeeds = res;
              //this.handlePublished();
               //Function call to check for the deleted feeds
               this.util.checkForDeletedFeeds(this.variab.boardfeeds).then(res=>{
                  //Get the deleted feeds store and display using feeds variable
                  this.feeds = res;
                    if(this.feeds){
                      this.spinnerState=false;//Set the spinner state variable to false once feeds are fetched
                    }
                    //console.log(this.feeds.length);
                    this.alertNofeeds=false;//set alertnofeeds value to false
                    if(this.feeds.length==0){
                      this.alertNofeeds=true;
                    }
                 
                 this.util.checkForPublished(res,params.id).then(res=>{
                  this.publishedfeeds=res;
                  //console.log(this.publishedfeeds);
                   
                 });
                
                
                
               });
           });
            
    });

    
  }
  //Function to handle published and non published feed
  /*public handlePublished(){
  //console.log(this.variab.boardfeeds);
     this.util.getPublishedfeeds(this.variab.boardfeeds,this.boardname).then(res=>{
       console.log(res);
     })
  }*/

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

  //Function to handle sort label like 'Latest','Oldest' feeds when clicked from page-header component
  handleSort(childSortLabel:any){
    var checkForCategory:any=[];
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
  //Function to handle clear Date event from page-header component
  handleClearDate(eve){
    if(eve == 'reset'){
      this.feeds = this.variab.boardfeeds;
    }
  }
  //Function to handle checked Input values from the child view component
  handleCheckedInput(event){
    this.checkedfeeds.push(event);
    //
  }
  //Function to delete checked feeds
  deleteChecked(){
    
      this.checkedfeeds=this.feeds.filter(everyfeed=>{
        return everyfeed.Checked;
      })
      //console.log(this.checkedfeeds);
    this.checkedfeeds.map(feed=>{
      var index=this.variab.boardfeeds.indexOf(feed)
       this.util.hide(feed.value,index).then(res=>{
         if(res['ok']==true){
           this.variab.boardfeeds= this.variab.boardfeeds.filter(item=> item.value._id!== feed.value._id);
           this.feeds=this.variab.boardfeeds;
           this.selectedAll=false;
         }
       });
    })
  }
  //function on select all
  onSelectAll() {
      //console.log(this.selectedAll)
      for (var i = 0; i < this.variab.boardfeeds.length; i++) {
        this.feeds[i].Checked = this.selectedAll;
      }
  }

}
