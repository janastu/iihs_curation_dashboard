import { Component, OnInit, Input } from '@angular/core';
import { routerTransition } from '../../../router.animations';
import * as _ from 'lodash'
import { DatePipe } from '@angular/common';
import { HtmlParser } from '../../Utilities/html-parser';
@Component({
  selector: 'app-magazineview',
  templateUrl: './magazineview.component.html',
  styleUrls: ['./magazineview.component.scss'],
  animations: [routerTransition()]

})

export class MagazineviewComponent implements OnInit {
@Input('feeds') item:any=[];
@Input('index') childIndex:any;
alert:boolean=false;
imgstatus:number=0;
feedmark:number =0;
//p:any;
  constructor(public html:HtmlParser) {
    
   /*if(this.incomingfeeds.length == 0) {
      // code...
      //document.getElementById('loading').style.display = 'block';
      //setTimeout(5000);
      //console.log("load spinner");
     // console.log("mang",this.incomingfeeds.length);
      this.imgstatus == 1;
    }
    else {
      console.log("nt em",this.incomingfeeds.length);

    }*/
   }

  ngOnInit() {
	}  
  /*checkimg(feeds){
     
      
      
      return (/<img[\s\S]*>/i.test(feeds));
   
  }*/
  
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