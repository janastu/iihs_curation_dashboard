import { Component, OnInit, Input, ViewChild,Output,EventEmitter} from '@angular/core';
import { routerTransition } from '../../../router.animations';
import { fadeInAnimation } from '../../../fade-in.animation';
import { HtmlParser } from '../../Utilities/html-parser';
import { DatePipe } from '@angular/common';
import { Router } from '@angular/router';
@Component({
  selector: 'app-articleview',
  templateUrl: './articleview.component.html',
  styleUrls: ['./articleview.component.scss'],
  animations: [routerTransition()]
})
export class ArticleviewComponent implements OnInit {
  @Input('feeds') item:any=[];
  @Input('publishedfeeds') publishedfeeds:any=[];
  @Input('index') index:number;
  @Output('checkedInput') checked:any = new EventEmitter();
  desc:any;//Parameter to pass with modal component
  constructor(public html:HtmlParser,public router:Router) {
   }

  ngOnInit() {
 
	}

}