import { Component, OnInit, Input,Output,EventEmitter } from '@angular/core';
import { routerTransition } from '../../../router.animations';
import * as _ from 'lodash'
import { DatePipe } from '@angular/common';
import { HtmlParser } from '../../Utilities/html-parser';
import { Router } from '@angular/router';
@Component({
  selector: 'app-magazineview',
  templateUrl: './magazineview.component.html',
  styleUrls: ['./magazineview.component.scss'],
  animations: [routerTransition()]

})

export class MagazineviewComponent implements OnInit {
@Input('feeds') item:any=[];
@Input('publishedfeeds') publishedfeeds:any=[];
@Input('index') index:number;
@Output('checkedInput') checked:any = new EventEmitter();
alert:boolean=false;
imgstatus:number=0;
feedmark:number =0;
//p:any;
  constructor(public html:HtmlParser,public router:Router) {

   }

  ngOnInit() {
	}  
  onFilterChange(eve: any) {
    //console.log(eve,this.item);
    this.checked.emit(this.item);   
  }
  
  handleAlert(sendAlert:any){
    if(sendAlert){
      this.alert=true;
    }
  }
  public closeAlert(alert: any) {
      this.alert=false;
  }
  handleIcon(sendIcon:any){
    
    //this.feedmark = sendIcon;
    console.log("icon",this.feedmark)
  }

 
  
}