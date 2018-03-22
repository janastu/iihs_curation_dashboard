import { Component, OnInit, Input, ViewChild} from '@angular/core';
import { routerTransition } from '../../../router.animations';
import { fadeInAnimation } from '../../../fade-in.animation';
import { HtmlParser } from '../../Utilities/html-parser';
import { DatePipe } from '@angular/common';
@Component({
  selector: 'app-articleview',
  templateUrl: './articleview.component.html',
  styleUrls: ['./articleview.component.scss'],
  animations: [routerTransition()]
})
export class ArticleviewComponent implements OnInit {
  @Input('feeds') item:any=[];
  @Input('index') index:any; 
  desc:any;//Parameter to pass with modal component
  constructor(public html:HtmlParser) {
   }

  ngOnInit() {
 
	}

}