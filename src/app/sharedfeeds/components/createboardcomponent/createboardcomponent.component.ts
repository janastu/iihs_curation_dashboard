import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-createboardcomponent',
  templateUrl: './createboardcomponent.component.html',
  styleUrls: ['./createboardcomponent.component.scss']
})
export class CreateboardcomponentComponent implements OnInit {
boards:any=[];
visible:boolean;
  constructor() {
  this.boards.push({
    title:'tech'
  },
  {
    title:'science'
  }); 
  //This will hide the DIV by default.
 
}

  ngOnInit() {

  }
  oncreateboard(){
    this.visible=true;
    console.log(this.visible);
  }
  cancelboard(){
    this.visible=false;
    console.log(this.visible);
  }
}
