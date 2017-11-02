import { Component, OnInit } from '@angular/core';
import { Service } from '../../services/services';
@Component({
  selector: 'app-boardfeeds',
  templateUrl: './boardfeeds.component.html',
  styleUrls: ['./boardfeeds.component.scss']
})
export class BoardfeedsComponent implements OnInit {
feeds:any=[];
  constructor(public service:Service) { }

  ngOnInit() {
  	this.service.getAll().then(result=>{
    this.feeds= result;
    });
  }

}
