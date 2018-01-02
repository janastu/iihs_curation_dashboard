import { Component, OnInit,Input } from '@angular/core';
import {NgbDropdownConfig} from '@ng-bootstrap/ng-bootstrap';
import {NgbDropdown} from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder,Validators, FormGroup} from '@angular/forms';
import { Global } from '../../../shared/global';
import { BoardService } from '../../../services/board-service';
import { CreateBoardStore } from '../../store/create-board-store';
import { DataService } from '../../../services/data-service';
import * as _ from 'lodash';
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
user:any;
labelForBoards:any=[];
outside:any;
  constructor(public ngconfig:NgbDropdownConfig,public formBuilder: FormBuilder,public variab:Global,public boardservice:BoardService,public createboardstore:CreateBoardStore,public dataservice:DataService) {

     
 
}

  ngOnInit() {

    var annos:any=[];
    this.ngconfig.autoClose='outside';
   this.user =localStorage.getItem('name');

    this.boardForm = this.formBuilder.group({
      boardname: this.boardname
    });
   

       //console.log("board",annos,this.feeditem.value.title);
       //Filter Feed with Annotations
       //Returns Array of annotaion for each feed.value.id

         var annotatedarray = this.variab.annotations.filter(anno=>{
          if(anno.value.target.id === this.feeditem.value._id){
            //State Variable to toggle the hover toolbar component star

             this.selectedstar = 1;

                 return anno;
               
                
          }
          
   
        });
        //Map Annotations by its label value
        //Returns array of annotations for each label
         var annosForBoards = this.variab.boardupdated.map( (board, index) => {
            //console.log("anoo",board,annotatedarray)
            return  _.filter(annotatedarray,function(o) { 
              if(o.key===board.key){
              return o  ; 
            }
            });

         })

         //console.log("annoforboards",annosForBoards);
         //Map Annos for Boards to return boolean array
         //Returns example:[true,false,true] 
         //Index of output == Index of label which means label[0] and label[1] 
         //is active for above output
        this.labelForBoards  =  annosForBoards.map(anno=>{
             if(anno[0]){
               
                 return true;
              }
               else{
                 return false;
               
             }
         })


   
  } 



  cancelboard(){
    this.visible=false;
    
  }
  savetoboard(title,i){ 
   
     console.log(this.feeditem.value)
      this.labelForBoards[i] = true;
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
        "label":[title.label]
      }
      this.createboardstore.dispatch('ADD_ITEMS',update);

    
    
  }
  createboard(){
    this.visible=false; 

console.log("true",this.labelForBoards[0]) 
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
    this.labelForBoards[i]=false;
  }
 
  
}
