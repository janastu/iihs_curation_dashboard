import { Component, OnInit, Input,Output,EventEmitter } from '@angular/core';
import { ActivatedRoute,Router,UrlSerializer } from '@angular/router';
import 'rxjs/add/operator/filter';
import { routerTransition } from '../router.animations';
import { fadeInAnimation } from '../fade-in.animation';
import { FormControl, FormGroup, FormArray, FormBuilder, Validators,FormArrayName } from '@angular/forms';
import { DataService } from '../services/data-service'; //Import dataservice file to get the hidden feeds
import { Global } from '../shared/global';//Import Global to use global variables in the feeds's local scope
import * as _ from 'lodash'
import { DatePipe,Location } from '@angular/common';
import { ArchiveService } from '../services/archive-service';//Import feed service to get feeds
import { Utilities } from '../shared';//Import utilities to perform sorting and filtering
import { DbConfig } from '../services/db-config';//Import to config db setup when the app loads
@Component({
  
  selector: 'app-mmpublish',
  templateUrl: './mmpublish.component.html',
  styleUrls: ['./mmpublish.component.scss'],
  animations: [routerTransition()]
})

export class MmpublishComponent implements OnInit {
spinnerState:boolean=false;//state variable to store the status of the spinner to display
p:any; //variable to store the current page nuber
pageheading:any;  //variable to store and display as page heading
feeds:any=[];          //variable to store feeds to display
statefeeds:any=[]; //variable to store the feeds state 
boardnamepublished:any;//variable to store the input variable name
view:any;      //variable to store the view state
datepublished:any;      //variable to store the state of dates to filters
user:any;     //variable to store the username
alertNofeeds:boolean=false;//alert variable to store boolean values if the given input dates has not feeds
  constructor(private datepipe:DatePipe,public variab:Global,public dataservice:DataService,public archiveService:ArchiveService,private route: ActivatedRoute,public util:Utilities,public router:Router,public formBuilder:FormBuilder,public  urlSerializer:UrlSerializer,public location:Location,public dbconfig:DbConfig) { }
  //On loading Component
  ngOnInit() {

      //console.log(this.checkForm);
    this.user =localStorage.getItem('name');
    
    //this.usersview = localStorage.getItem('view');
   
    this.view = localStorage.getItem('view') || null;

 //Access the query parameter and filter the feeds according to category
      this.route.params
            .subscribe(params => {
              var parsedDate = Date.parse(params.date);//parse the date to timestamp
              var isodate = new Date(parsedDate);//get the date by passing the timestamp to get the iso conversion
              //console.log(isodate,parsedDate,params.date);
              this.datepublished = params.date;
              console.log(this.datepublished);
              this.boardnamepublished = params.boardname;
              if(params.date && params.boardname != '*'){
                this.feeds.length = 0;//set the feeds array as empty to display the feeds
                   this.spinnerState=true;//set the spinner state as true
                   console.log("feesd",params.boardname,isodate.toISOString());
                this.archiveService.getPublishedFeeds(isodate.toISOString(),params.boardname).then(res=>{
                    console.log(res['value']);
                  //this.statefeeds = res['value'].feeds;
                   this.feeds.push({board: params.boardname, data:res['value'].feeds});

                   if(this.feeds){
                     this.spinnerState=false;
                   }
                })
              }
              if(params.boardname == '*'){
                this.archiveService.getPublishedboardsOnDates(isodate.toISOString()).then(res=>{
                  var boards:any=[];
                  boards = res;
                  boards.map(board=>{
                    this.feeds.length=0;
                    //console.log("feesd",params.boardname,isodate.toISOString());
                    this.archiveService.getPublishedFeeds(isodate.toISOString(),board.value).then(res=>{
                      //this.statefeeds.push(res['value'].feeds);
                      this.util.sortdescending(_.flatten(res['value'].feeds)).then(res=>{
                        this.feeds.push({board: board.value, data:res});
                        this.feeds.sort(function(a,b) {return (a.board > b.board) ? 1 : ((b.board > a.board) ? -1 : 0);} );
                        //this.feeds = res;
                        if(this.feeds){
                          this.spinnerState=false;
                        }
                      });

                    })
                  })
                })
              }
              
     });
   
  }

  //Function to handle view event from page-header component
  public handleView(childView:any){
    this.view= childView;

  }
  //Function to handle Date event from page-header component
  public handleDate(childDates:any){
    this.util.filterDate(childDates,this.statefeeds).then(res=>{
      //console.log(res);
      if(res['length'] == 0){
        this.alertNofeeds = true;
        setTimeout(() => this.alertNofeeds = false, 2000);
      }
      else{
        this.feeds = res;
      }
    })
  
  }
  //Function to handle clear Date event from page-header component
  handleClearDate(eve){
    if(eve == 'reset'){
      this.feeds = this.statefeeds;
    }
  }
  //Function to handle sort label like 'Latest','Oldest' feeds when clicked from page-header component
  handleSort(childSortLabel:any){
    var checkForCategory:any=[];
    if(childSortLabel === 'Latest'){
      //If input is latest sort the feeds in the descending order
      this.util.sortdescending(this.statefeeds).then(res=>{
        this.feeds = res;
      })
     
    }
    if(childSortLabel === 'Oldest'){
      //If input is oldest sort the feeds in the descending order
      this.util.sortascending(this.statefeeds).then(res=>{
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
   //Send in new tabs
   sendInnewTab(){
     //window.open('#/mm/'+this.boardnamepublished+'/'+this.datepublished);
   }

}




