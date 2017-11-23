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

visible:boolean;
invisible:boolean;
staricon:boolean=false;
boardForm:FormGroup;
boardname = this.formBuilder.control('', [Validators.required]);
  constructor(public ngconfig:NgbDropdownConfig,public formBuilder: FormBuilder,public variab:Global,public boardservice:BoardService) {


 
}

  ngOnInit() {
    this.boardForm = this.formBuilder.group({
      boardname: this.boardname
    });
    this.boardservice.getAll().then((result)=>{
      this.variab.boardupdated=result;
    })


  }
  cancelboard(){
    this.visible=false;
    
  }
  savetoboard(i){
    if(this.variab.boardupdated[i].title){
      this.variab.boardupdated[i].status = 'true';
    }
    
  }
  createboard(){

    this.variab.boardupdated.push(
      {title:this.boardname.value,
      status:'true'});
    this.visible=false;
    console.log(this.variab.boardupdated);
  }

  removefromboard(i){
    this.variab.boardupdated[i].status = 'false';
  }
 
  
}
