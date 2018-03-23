import { Component, OnInit,Input } from '@angular/core';
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

@Input('feeds') item:any=[];
@Input('index') index:any;
  constructor(public html : HtmlParser) { }

  ngOnInit() {
  
  }


}
