import { Component, OnInit, Input } from '@angular/core';
import { routerTransition } from '../../../router.animations';
import { Service } from '../../../services/services';

@Component({
  selector: 'app-magazineview',
  templateUrl: './magazineview.component.html',
  styleUrls: ['./magazineview.component.scss'],
  animations: [routerTransition()]
})
export class MagazineviewComponent implements OnInit {
metadata:any=[];
feeds:any=[];
mouseover:boolean;
  constructor(public service:Service) {
  	
   }

  ngOnInit() {
  	this.service.getAll().then(result=>{
  	this.feeds= result;
    console.log(this.mouseover);
  });

	}
}