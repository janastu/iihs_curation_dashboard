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
feeds:any=[];
metadata:any=[];
Dataglobal:any;
date:any;
  constructor(public service:Service) { }

  ngOnInit() {
 //this.fetchData();
 
   this.service.getAll().then(result=>{
   this.feeds= result;

 });
  }

  public handleEvent(childData:any){
    this.Dataglobal = childData;

  }
  public handleDate(childDates:any){
    
    this.date = childDates;
    console.log("sam",this.date,this.feeds);
   var datefilteredfeeds =  this.feeds.map((res)=>{
      console.log(res.date,this.date.changefrom);
        if(res.date >= this.date.changefrom && res.date <= this.date.changeto ){
          console.log(res.title);
        }

    })
  }

}




