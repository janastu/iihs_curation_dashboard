import { Component, OnInit, Input } from '@angular/core';
import { routerTransition } from '../../router.animations';
import { Service } from '../../services/services';


@Component({
  
  selector: 'app-feeds',
  templateUrl: './feeds.component.html',
  styleUrls: ['./feeds.component.scss'],
  animations: [routerTransition()]
})

export class FeedsComponent implements OnInit {
feeds:any=[];


  constructor(public service:Service) { }

  ngOnInit() {
 this.fetchData();
  }

  fetchData(){
    this.service.getAll().then(result=>{
    this.feeds= result["_nr_stories"];
    });
  }


}




