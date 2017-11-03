import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../../router.animations';
import { Service } from '../../services/services';

@Component({
  selector: 'app-read-later',
  templateUrl: './read-later.component.html',
  styleUrls: ['./read-later.component.scss'],
  animations: [routerTransition()]
})
export class ReadLaterComponent implements OnInit {
feeds:any=[];
metadata:any=[];
Dataglobal:any;
  constructor(public service:Service) {
   console.log("sam",this.Dataglobal); }
   

  ngOnInit() {
  	this.service.getAll().then(result=>{
    this.feeds= result;
    this.metadata=result["_nr_metadata"];
    });
  }
  public handleEvent(childData:any){
    this.Dataglobal = childData;
   
  }

}
