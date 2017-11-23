import { Component, OnInit } from '@angular/core';
import {NgbDropdownConfig} from '@ng-bootstrap/ng-bootstrap';
import {NgbDropdown} from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder,Validators, FormGroup} from '@angular/forms';
import { Global } from '../../../shared/global';
import { BoardService } from '../../../services/board-service'
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
  constructor(public ngconfig:NgbDropdownConfig,public formBuilder: FormBuilder,public variab:Global,public boardService:BoardService) {


 
}

  ngOnInit() {
    this.boardForm = this.formBuilder.group({
      boardname: this.boardname
    });
    this.boardService.getAll().then((result)=>{
      this.variab.boards=result;
    })


  }
  cancelboard(){
    this.visible=false;
    
  }
  savetoboard(i){
    if(this.variab.boards[i].title){
      this.variab.boards[i].status = 'true';
    }
    
  }
  createboard(){

    this.variab.boards.push(
      {title:this.boardname.value,
      status:'true'});
    this.visible=false;
  }

  removefromboard(i){
    this.variab.boards[i].status = 'false';
  }
 
  
}
