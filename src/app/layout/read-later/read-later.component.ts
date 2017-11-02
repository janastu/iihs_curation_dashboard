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
  constructor(public service:Service) { }

  ngOnInit() {
  	this.service.getAll().then(result=>{
    this.feeds= result;
    this.metadata=result["_nr_metadata"];
    });
  }

}
