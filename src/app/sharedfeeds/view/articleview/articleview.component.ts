import { Component, OnInit, Input } from '@angular/core';
import { routerTransition } from '../../../router.animations';
import { Service } from '../../../services/services';
import { fadeInAnimation } from '../../../fade-in.animation';
@Component({
  selector: 'app-articleview',
  templateUrl: './articleview.component.html',
  styleUrls: ['./articleview.component.scss'],
  animations: [routerTransition(),fadeInAnimation],
  host: { '[@fadeInAnimation]': '' }
})
export class ArticleviewComponent implements OnInit {
metadata:any=[];
feeds:any=[];
boards:any=[];
visible:boolean=false;
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
  oncreateboard(){
    this.visible=true;
    console.log(this.visible);
  }
  cancelboard(){
    this.visible=false;
    console.log(this.visible);
  }
}