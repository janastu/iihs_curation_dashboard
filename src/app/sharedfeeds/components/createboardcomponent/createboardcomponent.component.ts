import { Component, OnInit } from '@angular/core';
import {NgbDropdownConfig} from '@ng-bootstrap/ng-bootstrap';
import {NgbDropdown} from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder,Validators, FormGroup} from '@angular/forms';
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
boardForm:FormGroup;
boardname = this.formBuilder.control('', [Validators.required]);
  constructor(public ngconfig:NgbDropdownConfig,public formBuilder: FormBuilder) {
    
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
    console.log("boar",this.boards);
    this.boardForm = this.formBuilder.group({
      boardname: this.boardname
    });

  }
  cancelboard(){
    this.visible=false;
    
  }
  savetoboard(i){
    if(this.boards[i].title){
      console.log(this.boards[i].title);
      this.boards[i].status = 'true';
    }
    
  }
  createboard(){
    console.log("df",this.boardname.value,this.boards);

    this.boards.push(
      {title:this.boardname.value,
      status:'true'});
    this.visible=false;
  }

  removefromboard(i){
    this.boards[i].status = 'false';
  }
 
  
}
