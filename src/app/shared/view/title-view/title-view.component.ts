import { Component, OnInit,Input } from '@angular/core';
import { routerTransition } from '../../../router.animations';
import { DatePipe } from '@angular/common';
//import { HtmlParser} from '../../Utilities/html-parser';
@Component({
  selector: 'app-title-view',
  templateUrl: './title-view.component.html',
  styleUrls: ['./title-view.component.scss'],
  animations: [routerTransition()]
})
export class TitleViewComponent implements OnInit {
feeds:any=[];

@Input('feeds') item:any=[];
@Input('index') index:any;
  constructor() {
    	//console.log("mouseover",this.item);
    	 }

  ngOnInit() {
   
  }
 
  

}
