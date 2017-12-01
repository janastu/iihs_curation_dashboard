import { Component, OnInit,Input } from '@angular/core';

@Component({
  selector: 'app-hover-toolbar',
  templateUrl: './hover-toolbar.component.html',
  styleUrls: ['./hover-toolbar.component.scss']
})
export class HoverToolbarComponent implements OnInit {
  @Input('item') feeditem:any;
icon:boolean=false;
  constructor() {
    
   }

  ngOnInit() {
  }
  readlater(){
     this.icon=true; 
     console.log(this.feeditem);      
  }

}
