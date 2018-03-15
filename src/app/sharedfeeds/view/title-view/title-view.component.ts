import { Component, OnInit,Input } from '@angular/core';
import { routerTransition } from '../../../router.animations';
import { Service } from '../../../services/services';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-title-view',
  templateUrl: './title-view.component.html',
  styleUrls: ['./title-view.component.scss'],
  animations: [routerTransition()]
})
export class TitleViewComponent implements OnInit {
feeds:any=[];
mouseover:boolean = false;
p:any;
@Input('feeds') item:any=[];

  constructor(public service:Service) {
    	console.log("mouseover",this.item);
    	 }

  ngOnInit() {
    this.service.getAll().then(result=>{
  	  this.feeds= result;
    });
  }
  checkimg(feeds){
    return (/<img[\s\S]*>/i.test(feeds));
   
  }
  

}
