import { Component, OnInit } from '@angular/core';
import {NgbDropdownConfig} from '@ng-bootstrap/ng-bootstrap';
import {NgbDropdown} from '@ng-bootstrap/ng-bootstrap';
@Component({
  selector: 'app-createboardcomponent',
  templateUrl: './createboardcomponent.component.html',
  styleUrls: ['./createboardcomponent.component.scss']
})
export class CreateboardcomponentComponent implements OnInit {
boards:any=[];
visible:boolean;
invisible:boolean;
staricon:boolean=false;
  constructor(public ngconfig:NgbDropdownConfig) {
    
  this.boards.push({
    title:'tech',
    status:'false'
  },
  {
    title:'science',
    status:'false'
  }); 
  //This will hide the DIV by default.

 
}

  ngOnInit() {

  }
  cancelboard(){
    this.visible=false;
    
  }
  savetoboard(i){
    
    this.boards[i].status = 'true';
  }
  removefromboard(i){
    this.boards[i].status = 'false';
  }
 
  
}
