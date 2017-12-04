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
selectedIndex: number;
visible:boolean;
boardForm:FormGroup;

boardname = this.formBuilder.control('', [Validators.required]);
  constructor(public ngconfig:NgbDropdownConfig,public formBuilder: FormBuilder,public variab:Global,public dataservice:DataService,public createboardstore:CreateBoardStore) {

    this.selectedIndex = -1;
 
}

  ngOnInit() {
    this.boardForm = this.formBuilder.group({
      boardname: this.boardname
    });
  /* this.variab.boardupdated.map(board=>{

     board.value.status=false;
     
     return board.value.target.map(feed=>{
       this.variab.globalfeeds.map(globalfeed=>{
         if(feed.doc._id === globalfeed.doc._id){
           board.value.status=true;
           console.log(feed.doc.title ,board.value.status);
         }
       })

     })
   });*/

  }
  cancelboard(){
    this.visible=false;
    
  }
  savetoboard(title,index: number,i){ 
  
    if(this.selectedIndex == index){
      this.selectedIndex = -1;
    }
    else{
      this.selectedIndex = index;
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
    }
 


    
    /*this.dataservice.getboardfeeds(title.label).then(result=>{
      
        boards=result;
        boards.map(res=>{
          res.value.target.map(feed=>{
            console.log(feed);
          this.variab.globalfeeds.map(globalfeed=>{

               //console.log(feed.doc._id,globalfeed.doc._id); 
               if(feed.doc._id === globalfeed.doc._id)
               this.variab.boardupdated[i].value.status = true;
             console.log(feed.doc.title,this.variab.boardupdated[i].value.status); 
                 
          }); 
          })

        })
       
    });*/
    
    
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
    this.variab.boardupdated[i].value.status = false;
  }
 
  
}
