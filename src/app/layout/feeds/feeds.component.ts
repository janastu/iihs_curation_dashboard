import { Component, OnInit, Input } from '@angular/core';
import { routerTransition } from '../../router.animations';
import { fadeInAnimation } from '../../fade-in.animation';
import { Service } from '../../services/services';
import * as _ from 'lodash'

@Component({
  
  selector: 'app-feeds',
  templateUrl: './feeds.component.html',
  styleUrls: ['./feeds.component.scss'],
  animations: [routerTransition(),fadeInAnimation],
  host: { '[@fadeInAnimation]': '' }
})

export class FeedsComponent implements OnInit {
globalfeeds:any=[];
feeds:any=[];
metadata:any=[];
Dataglobal:any;
date:any;
  constructor(public service:Service) { }

  ngOnInit() {
 //this.fetchData();
 
     this.service.getAll().then(result=>{
       this.globalfeeds= result;
       this.feeds = this.globalfeeds;
     });
  }

  public handleEvent(childData:any){
    this.Dataglobal = childData;

  }
  public handleDate(childDates:any){

    this.date = childDates;
    var fromdate = Date.parse(this.date.changefrom);
    var todate = Date.parse(this.date.changeto);
    console.log("global",this.globalfeeds);
   var datefilteredfeeds =  this.globalfeeds.filter((res)=>{
      var checkdate = Date.parse(res.date);
       if(fromdate<=checkdate && todate>=checkdate){
          return res;
        }

    });
   
   this.feeds = datefilteredfeeds;
   console.log("filtered",datefilteredfeeds);
  }

}




