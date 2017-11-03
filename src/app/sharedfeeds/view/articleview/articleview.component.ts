import { Component, OnInit, Input } from '@angular/core';
import { routerTransition } from '../../../router.animations';
import { Service } from '../../../services/services';

@Component({
  selector: 'app-articleview',
  templateUrl: './articleview.component.html',
  styleUrls: ['./articleview.component.scss'],
  animations: [routerTransition()]
})
export class ArticleviewComponent implements OnInit {
metadata:any=[];
feeds:any=[];
boards:any=[];
  constructor(public service:Service) {
  this.boards.push({
    title:'tech'
  },
  {
    title:'science'
  });
   }

  ngOnInit() {
  	this.service.getAll().then(result=>{
  	this.feeds= result;
  });

	}
}