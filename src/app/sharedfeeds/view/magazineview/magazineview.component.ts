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

  constructor() {
   }

  ngOnInit() {
    
  

   
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

 
  
}