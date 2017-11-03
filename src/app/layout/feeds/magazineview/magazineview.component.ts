import { Component, OnInit, Input } from '@angular/core';
import { routerTransition } from '../../../router.animations';
import { Service } from '../../../services/services';
import { PageHeaderModule } from '../../../shared';

@Component({
  selector: 'app-magazineview',
  templateUrl: './magazineview.component.html',
  styleUrls: ['./magazineview.component.scss'],
  animations: [routerTransition()]

})

export class MagazineviewComponent implements OnInit {

metadata:any=[];
feeds:any=[];
Dataglobal:any;

  constructor(public service:Service) {
  	
   }

  ngOnInit() {
    
  	this.service.getAll().then(result=>{
  	this.feeds= result;

  });

	}
  public handleEvent(childData:any){
    this.Dataglobal = childData;
    console.log("sam",this.Dataglobal);
  }
  
}