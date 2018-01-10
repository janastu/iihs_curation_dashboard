import { Component, OnInit, Input } from '@angular/core';
import { routerTransition } from '../../../router.animations';
import * as _ from 'lodash'
import { DatePipe } from '@angular/common';
@Component({
  selector: 'app-magazineview',
  templateUrl: './magazineview.component.html',
  styleUrls: ['./magazineview.component.scss'],
  animations: [routerTransition()]

})

export class MagazineviewComponent implements OnInit {
@Input('feeds') incomingfeeds:any=[];
alert:boolean=false;
imgstatus:number=0;
feedmark:number =0;
  constructor() {
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
    /*if(this.incomingfeeds.length == 0) {
       // code...
       document.getElementById('loading').style.display = 'block';
       setTimeout(5000);
       console.log("load spinner");
       console.log("mang loading",this.incomingfeeds.length);
       this.imgstatus == 1;
     }
     else {
       document.getElementById('loading').style.display = 'none';
       console.log("mang loaded",this.incomingfeeds.length);

     }
  */
  console.log(this.incomingfeeds)

   
	}
  checkimg(feeds){

      return (/<img[\s\S]*>/i.test(feeds));
   
  }
  extracturl(str){
    //var regex = /<img.*?src='(.*?)'/;
    //var regex = /<img[\s\S]*>/i;
     //var src = regex.exec(str);
     //console.log("src",src[0]);
     //var s = src[0].replace(/(height=")\d+("\W+width=")\d+/, '$1$2');
     //console.log("s",s);
     var tmp = document.createElement('div');
     
     tmp.innerHTML = str;
     var src = tmp.querySelector('img').getAttribute('src');
     
     return src;
     /*var div = document.createElement('div');
     div.innerHTML = src[0];
     var elements = div.childNodes;
     console.log("eleme",elements[0]);
     if(elements[0]){
       return elements[0]|| null;
     }
     else{
       return null;
     }*/
   
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