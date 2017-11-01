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