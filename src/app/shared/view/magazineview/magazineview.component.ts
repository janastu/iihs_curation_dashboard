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
publishingurl:any;//variable to store the publishing url
isCopied1: boolean = false;//variable to store the status if the input value is copied or not
mouseOvered:boolean=false;
  constructor(public html:HtmlParser,public router:Router) {

   }

  ngOnInit() {
    //console.log(this.item);  
	}  
  onFilterChange(eve: any) {
    console.log("eve",this.item);
    //this.checked.emit(this.item);   
  }
  //handle event select all
  onSelectAll(eve:any){
     this.checked.emit(eve); 
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

  //Handle the event on clicking on published
 /* OnPublished(feed){
    this.archiveService.getPublishingUrlofFeed(feed.id).then(res=>{

      this.publishingurl = res[0].value;
      
    })
  }*/
 
  
}
