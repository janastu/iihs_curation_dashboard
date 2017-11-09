import { Component, OnInit,Input } from '@angular/core';
import { routerTransition } from '../../../router.animations';
import { Service } from '../../../services/services';

@Component({
  selector: 'app-card-view',
  templateUrl: './card-view.component.html',
  styleUrls: ['./card-view.component.scss'],
  animations: [routerTransition()]
})
export class CardViewComponent implements OnInit {
feeds:any=[];
@Input('feeds') incomingfeeds:any=[];
  constructor(public service:Service) { }

  ngOnInit() {
  this.service.getAll().then(result=>{
  	this.feeds= result;

});
  }

}
