import { Component, OnInit, Input } from '@angular/core';
import { routerTransition } from '../../../router.animations';
import { Service } from '../../../services/services';
import { FeedsComponent } from '../feeds.component';
@Component({
  selector: 'app-articleview',
  templateUrl: './articleview.component.html',
  styleUrls: ['./articleview.component.scss'],
  animations: [routerTransition()]
})
export class ArticleviewComponent implements OnInit {
    @Input('feeds') incomingData: any;
feeds:any=[];
  constructor(public service:Service) {
  	console.log("articlwe",this.incomingData);
   }

  ngOnInit() {
  	this.service.getAll().then(result=>{
  	this.feeds= result["_nr_stories"];
  });

	}
}