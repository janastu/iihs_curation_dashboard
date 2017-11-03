import { Component, OnInit, Input } from '@angular/core';
import { routerTransition } from '../../router.animations';



@Component({
  
  selector: 'app-feeds',
  templateUrl: './feeds.component.html',
  styleUrls: ['./feeds.component.scss'],
  animations: [routerTransition()]
})

export class FeedsComponent implements OnInit {
feeds:any=[];
metadata:any=[];
Dataglobal:any;

  constructor() { }

  ngOnInit() {
 //this.fetchData();
 console.log("sam",this.Dataglobal);
  }

  public handleEvent(childData:any){
    this.Dataglobal = childData;
    console.log("sam",this.Dataglobal);
  }

}




