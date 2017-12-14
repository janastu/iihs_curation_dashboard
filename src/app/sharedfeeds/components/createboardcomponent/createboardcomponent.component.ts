import { Component, OnInit,Input } from '@angular/core';
import {NgbDropdownConfig} from '@ng-bootstrap/ng-bootstrap';
import {NgbDropdown} from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder,Validators, FormGroup} from '@angular/forms';
import { Global } from '../../../shared/global';
import { BoardService } from '../../../services/board-service';
import { CreateBoardStore } from '../../store/create-board-store';
import { DataService } from '../../../services/data-service';
@Component({
  selector: 'app-createboardcomponent',
  templateUrl: './createboardcomponent.component.html',
  styleUrls: ['./createboardcomponent.component.scss']
})
export class CreateboardcomponentComponent implements OnInit {
  @Input('feeditem') feeditem:any;
selectedstar: number;
visible:boolean;
boardForm:FormGroup;
boardname = this.formBuilder.control('', [Validators.required]);
annoforid:any=[];
htmlboardname:any=[];
user:any;
  constructor(public ngconfig:NgbDropdownConfig,public formBuilder: FormBuilder,public variab:Global,public boardservice:BoardService,public createboardstore:CreateBoardStore,public dataservice:DataService) {

     
 
}

  ngOnInit() {

    var annos:any=[];
   this.user =localStorage.getItem('name');

    this.boardForm = this.formBuilder.group({
      boardname: this.boardname
    });
   
    this.dataservice.getannotations().then(res=>{
        annos=res;

         annos.filter(anno=>{
          if(anno.value.target.id === this.feeditem.value._id){

             this.selectedstar = 1;

                this.htmlboardname = this.variab.boardupdated.map(boardname=>{
                

                    if(anno.key === boardname.value.label){
                     return boardname.value.label;
                     
                    }
                  
                })
                //console.log(this.htmlboardname)
          }
        });
    });
  }

  cancelboard(){
    this.visible=false;
    
  }
  savetoboard(title,index: number,i){ 
   
     
      this.htmlboardname[i] = title.label;
      this.selectedstar=1;
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
      this.createboardstore.dispatch('ADD_ITEMS',update);

    
    
  }
  createboard(){
    this.visible=false;     
      let model={
       
         "@context": "http://www.w3.org/ns/anno.jsonld",
         "type": "Annotation",
         "creator": this.user,
         "created": "2015-01-28T12:00:00Z",
         "modified": "2015-01-29T09:00:00Z",
         "generator": "mm_2017_v1",
         "generated": "2015-02-04T12:00:00Z",
         "motivation":"identifying",
         "label":this.boardname.value

       };
       this.boardservice.addboard(model);
       this.variab.boardupdated.push({value:model});  
     
  }

  removefromboard(i){

    console.log(this.variab.boardupdated);
    this.variab.boardupdated[i].value.status = false;
  }
 
  
}
