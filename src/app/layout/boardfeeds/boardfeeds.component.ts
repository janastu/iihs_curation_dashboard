import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../../router.animations';
import { Service } from '../../services/services';
@Component({
  selector: 'app-boardfeeds',
  templateUrl: './boardfeeds.component.html',
  styleUrls: ['./boardfeeds.component.scss'],
  animations: [routerTransition()]
})
export class BoardfeedsComponent implements OnInit {
 globalfeeds:any=[];
feeds:any=[];
Dataglobal:any;
date:any;
  constructor(public service:Service) { }

  ngOnInit() {
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
