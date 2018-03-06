import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../../router.animations';
import { ActivatedRoute } from '@angular/router';
import 'rxjs/add/operator/filter';
//import { ComponentsService } from '../../services/components-service';
//import { Service } from '../../services/services';
import { DataService } from '../../services/data-service';
import { Global } from '../../shared';
import { PageHeaderModule } from '../../shared';
import * as _ from 'lodash'
@Component({
  selector: 'app-boardfeeds',
  templateUrl: './boardfeeds.component.html',
  styleUrls: ['./boardfeeds.component.scss'],
  animations: [routerTransition()]
})
export class BoardfeedsComponent implements OnInit {
//Local Variable declarations
feeds:any=[];          //Variable to store feeds to display
view:any;              //Variable to store the view state
date:any;              //Variable to store the state of dates to filters
boardname:any;         //Variable to store the board name to display in the page heading
user:any;              //Variable to store user name of the logged in user
  constructor(public dataService:DataService,public variab:Global,private route: ActivatedRoute) { }
  //On loading Component
  ngOnInit() {
    //Get the user name from local storage and store in a local variable
    this.user =localStorage.getItem('name');
    //this.feeds = this.variab.boardfeeds;
    //this.route.params.subscribe( params => console.log(params));
    //Get the boardname from query parameters
    this.route.queryParams
         .subscribe(params => {

           this.boardname = params.boardname;
           //Call service function to get board feeds by passing board name as parameter
           console.log("boa",params.boardname);
           this.dataService.getboardfeeds(params.boardname).then(res=>{
              this.variab.boardfeeds = res;
               //Function call to check for the deleted feeds
               this.checkForDeletedFeeds();
                });
    });
    
  }
  //Function to check of any deleted feeds and pop the deleted feeds from the global buffer
  // and display the rest of the feeds
  checkForDeletedFeeds(){
    
    let hiddenfeeds:any=[];
    this.dataService.getdeletedfeeds(this.user).then(res=>{
     hiddenfeeds=res;
    // console.log(hiddenfeeds)
     if(hiddenfeeds.length == 0){
       this.feeds = this.variab.boardfeeds;
       //console.log("check",this.variab.globalfeeds);
       document.getElementById('loading').style.display = 'none';
       }
      
     
      this.variab.boardfeeds.map(globalfeed=>{
        hiddenfeeds.map(feed=>{
        console.log("hiddem",feed.value._id,globalfeed.id)
           if(feed.value._id === globalfeed.value._id) {
            var i = _.indexOf(this.variab.boardfeeds,globalfeed);
            this.variab.boardfeeds.splice(i,hiddenfeeds.length);

            this.feeds = this.variab.boardfeeds;
           //  console.log("feedis",this.feeds,this.variab.boardfeeds)
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
           this.feeds = this.variab.boardfeeds;
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

    this.feeds =  this.variab.boardfeeds.filter((res)=>{
        console.log("date",Date.parse(res.value.date));
       if(fromdate<=Date.parse(res.value.date) && todate>=Date.parse(res.value.date)){
        
          return res;
        }
       

    });
  }

  //Function to handle sort label like 'Latest','Oldest' feeds when clicked from page-header component
  handleSort(childSortLabel:any){
    var checkForCategory:any=[];
    if(childSortLabel === 'Latest'){
  
     this.variab.boardfeeds.sort(function(a, b) {
        
       return new Date(b.value.date).getTime() - new Date(a.value.date).getTime()
     });
    
    }
    if(childSortLabel === 'Oldest'){
      this.variab.boardfeeds.sort(function(a, b) {
         
        return new Date(a.value.date).getTime() - new Date(b.value.date).getTime()
      });
  
    }
  }

}
