import { Component, OnInit,Input } from '@angular/core';
import { routerTransition } from '../../../router.animations';


@Component({
  selector: 'app-card-view',
  templateUrl: './card-view.component.html',
  styleUrls: ['./card-view.component.scss'],
  animations: [routerTransition()]
})
export class CardViewComponent implements OnInit {

@Input('feeds') incomingfeeds:any=[];
@Input('metadata') metadata:any=[];
  constructor() { }

  ngOnInit() {
  
  }

}
