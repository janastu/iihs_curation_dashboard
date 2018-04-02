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
  constructor(public dataService:DataService,public variab:Global,private route: ActivatedRoute,public util: Utilities,public archiveService: ArchiveService) { }
  //On loading Component
  ngOnInit() {
    //Get the user name from local storage and store in a local variable
    this.user =localStorage.getItem('name');
    this.view = localStorage.getItem('view');
    //this.feeds = this.variab.boardfeeds;
    //this.route.params.subscribe( params => console.log(params));
    //Get the boardname from query parameters
    this.route.params
         .subscribe(params => {

           this.boardname = params.id;
           //Call service function to get board feeds by passing board name as parameter
           console.log("boa",params.id);
           this.dataService.getboardfeeds(params.id).then(res=>{
              this.variab.boardfeeds = res;
               //Function call to check for the deleted feeds
               this.util.checkForDeletedFeeds(this.variab.boardfeeds).then(res=>{
                 this.checkForPublished(res);
                //Get the deleted feeds store and display using feeds variable
                this.feeds = res;
                
               });
           });
    });
    
  }
  //function to check if the feeds in the board are already published
  checkForPublished(boardfeeds){
    var alreadypublished:any=[];
    this.archiveService.getAlreadyPublishedfeeds(this.boardname).then(res=>{
            alreadypublished=res;
        var datefeed = boardfeeds.map( (board, index) => {
           
           return  _.filter(alreadypublished,function(o) { 
             //console.log(o)
             if(o.value._id===board.value._id){
             return o  ; 
           }
           });

        });
       
        //this.feedstobepublished=_.flatten(datefeed);
        //console.log("annoforboards",datefeed);
        //Map Annos for Boards to return boolean array
        //Returns example:[true,false,true] 
        //Index of output == Index of label which means label[0] and label[1] 
        //is active for above output
       this.publishedfeeds  =  datefeed.map(anno=>{

            if(anno[0]){
                return true;
             }
              else{
                return false;
              
            }
        })
    })
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

}
