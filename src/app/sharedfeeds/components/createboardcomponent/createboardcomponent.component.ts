import { Component, OnInit,Input } from '@angular/core';
import {NgbDropdownConfig} from '@ng-bootstrap/ng-bootstrap';
import {NgbDropdown} from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder,Validators, FormGroup} from '@angular/forms';
import { Global } from '../../../shared/global';
import { DataService } from '../../../services/data-service';
import { CreateBoardStore } from '../../store/create-board-store';
@Component({
  selector: 'app-createboardcomponent',
  templateUrl: './createboardcomponent.component.html',
  styleUrls: ['./createboardcomponent.component.scss']
})
export class CreateboardcomponentComponent implements OnInit {
  @Input('feeditem') feeditem:any;

visible:boolean;
invisible:boolean;
staricon:boolean=false;
boardForm:FormGroup;
boardname = this.formBuilder.control('', [Validators.required]);
  constructor(public ngconfig:NgbDropdownConfig,public formBuilder: FormBuilder,public variab:Global,public dataservice:DataService,public createboardstore:CreateBoardStore) {


 
}

  ngOnInit() {
    this.boardForm = this.formBuilder.group({
      boardname: this.boardname
    });
    


  }
  cancelboard(){
    this.visible=false;
    
  }
  savetoboard(i,title){ 
    var boards:any=[];
    let update = {
      "@context": "http://www.w3.org/ns/anno.jsonld",
      "type": "Annotation",
      "creator": "http://example.org/user1",
      "created": "2015-01-28T12:00:00Z",
      "modified": "2015-01-29T09:00:00Z",
      "generator": "mm_2017_v1",
      "generated": "2015-02-04T12:00:00Z",
      "target": this.feeditem,
      "motivation":"tagging",
      "label":title.label
    }
    this.createboardstore.dispatch('UPDATE_ITEM',update);
    
    this.dataservice.getfromdatabase().then(result=>{
      boards = result;
    

    console.log("board",boards);
      boards.map(boardname=>{
        if(boardname.value.label === title.label){
          return boardname.value.target.map(feed=>{
            console.log(feed);
            if(feed.title === this.feeditem.title){
              this.staricon=true;
            }
          })
        }
      })
    });
   
    
  }
  createboard(){
    this.visible=false;
    

     
      let model={
       
         "@context": "http://www.w3.org/ns/anno.jsonld",
         "type": "Annotation",
         "creator": "http://example.org/user1",
         "created": "2015-01-28T12:00:00Z",
         "modified": "2015-01-29T09:00:00Z",
         "generator": "mm_2017_v1",
         "generated": "2015-02-04T12:00:00Z",
         "target": [this.feeditem],
         "motivation":"tagging",
         "label":this.boardname.value

       };
       this.createboardstore.dispatch('ADD_ITEMS',model);
        this.variab.boardupdated.push({value:model});
     
  }

  removefromboard(i){

    console.log(this.variab.boardupdated);
    this.variab.boardupdated[i].doc.status = 'false';
  }
 
  
}
