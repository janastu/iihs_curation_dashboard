import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../../../router.animations';
import { Service } from '../../../services/services';
@Component({
  selector: 'app-articleview',
  templateUrl: './articleview.component.html',
  styleUrls: ['./articleview.component.scss'],
  animations: [routerTransition()]
})
export class ArticleviewComponent implements OnInit {
feeds:any=[];
  constructor(public service:Service) {
  	console.log("articlwe")
   }

  ngOnInit() {
  	this.service.getAll().then(result=>{
  	this.feeds= result;
  });

	}
}