import { Component, OnInit,Input } from '@angular/core';
import { routerTransition } from '../../../router.animations';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-card-view',
  templateUrl: './card-view.component.html',
  styleUrls: ['./card-view.component.scss'],
  animations: [routerTransition()]
})
export class CardViewComponent implements OnInit {

@Input('feeds') incomingfeeds:any=[];
@Input('metadata') metadata:any=[];
  constructor() { }

  ngOnInit() {
  
  }
  checkimg(feeds){
    return (/<img[\s\S]*>/i.test(feeds));
   
  }
  extracturl(str){
    //var regex = /<img.*?src='(.*?)'/;
   /* var regex = /<img[\s\S]*>/i;
    var src = regex.exec(str);
     console.log("src",src[0]);
     return src[0];*/
     var tmp = document.createElement('div');
     tmp.innerHTML = str;
     var src = tmp.querySelector('img').getAttribute('src');
     return src;
   
  }
  checkhtml(feeds){
    return (/<p|a|span|div[\s\S]*>/i.test(feeds));
    
  }
  stripHtml(html){
      // Create a new div element
      var temporalDivElement = document.createElement("div");
      // Set the HTML content with the providen
      temporalDivElement.innerHTML = html;
      // Retrieve the text property of the element (cross-browser support)
      return temporalDivElement.textContent || temporalDivElement.innerText || "";
  }

}
