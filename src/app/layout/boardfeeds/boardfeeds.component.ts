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
globalfeeds:any=[];    //variable to store feeds globally
metadata:any=[];
feeds:any=[];          //variable to store feeds to display
view:any;              //variable to store the view state
date:any;              //variable to store the state of dates to filters
boardname:any;
  constructor(public dataService:DataService,public variab:Global,private route: ActivatedRoute) { }
  //On loading Component
  ngOnInit() {
    //
    //this.feeds = this.variab.boardfeeds;
    //this.route.params.subscribe( params => console.log(params));
    this.route.params
         .subscribe(params => {
           this.boardname = params.id;
           this.dataService.getboardfeeds(params.id).then(res=>{
              this.variab.boardfeeds = res;
               this.feeds = this.variab.boardfeeds;
             
                });
    });
    //this.componentsService.getBoards().subscribe(data => this.alertReceived(data));
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
