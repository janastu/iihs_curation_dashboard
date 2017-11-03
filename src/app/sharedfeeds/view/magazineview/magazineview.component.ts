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
@Input('feeds') incomingfeeds:any=[];
metadata:any=[];
feeds:any=[];
Dataglobal:any;

  constructor(public service:Service) {
  	
   }

  ngOnInit() {
    console.log("fes",this.incomingfeeds);
  	this.service.getAll().then(result=>{
  	this.feeds= result;

  });

	}
  public handleEvent(childData:any){
    this.Dataglobal = childData;
    console.log("sam",this.Dataglobal);
  }
  
}