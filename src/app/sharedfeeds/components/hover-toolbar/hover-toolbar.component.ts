import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-hover-toolbar',
  templateUrl: './hover-toolbar.component.html',
  styleUrls: ['./hover-toolbar.component.scss']
})
export class HoverToolbarComponent implements OnInit {
icon:boolean=false;
  constructor() { }

  ngOnInit() {
  	console.log("hover");
  }
  change(){
     this.icon=true;       
  }

}
