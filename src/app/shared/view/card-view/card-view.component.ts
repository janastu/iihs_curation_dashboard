import { Component, OnInit,Input,Output,EventEmitter } from '@angular/core';
import { routerTransition } from '../../../router.animations';
import { DatePipe } from '@angular/common';
import { HtmlParser } from '../../Utilities/html-parser';
@Component({
  selector: 'app-card-view',
  templateUrl: './card-view.component.html',
  styleUrls: ['./card-view.component.scss'],
  animations: [routerTransition()]
})
export class CardViewComponent implements OnInit {
p:any; //variable to store the current page nuber
@Input('feeds') feeds:any=[];
@Input('publishedfeeds') publishedfeeds:any=[];
@Input('index') index:number;
@Output('checkedInput') checked:any = new EventEmitter();
  constructor(public html : HtmlParser) { }

  ngOnInit() {
  
  }


}
