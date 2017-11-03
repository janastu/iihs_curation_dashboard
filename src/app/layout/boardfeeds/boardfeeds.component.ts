import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../../router.animations';
import { Service } from '../../services/services';
@Component({
  selector: 'app-boardfeeds',
  templateUrl: './boardfeeds.component.html',
  styleUrls: ['./boardfeeds.component.scss'],
  animations: [routerTransition()]
})
export class BoardfeedsComponent implements OnInit {
feeds:any=[];
Dataglobal:any;
  constructor(public service:Service) { }

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
