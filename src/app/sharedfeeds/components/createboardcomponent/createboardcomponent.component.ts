import { Component, OnInit,Input } from '@angular/core';
import {NgbDropdownConfig} from '@ng-bootstrap/ng-bootstrap';
import {NgbDropdown} from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder,Validators, FormGroup} from '@angular/forms';
import { Global } from '../../../shared/global';
import { BoardService } from '../../../services/board-service';
import { CreateBoardStore } from '../../store/create-board-store';
import { DataService } from '../../../services/data-service';
import { GroupService } from '../../../services/group-service';
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
date:Date;
  constructor(public ngconfig:NgbDropdownConfig,public formBuilder: FormBuilder,public variab:Global,public boardservice:BoardService,public createboardstore:CreateBoardStore,public dataservice:DataService,public groupService:GroupService) {

     
 
}

  ngOnInit() {
    this.date = new Date();

    var annos:any=[];

   

   this.user =localStorage.getItem('name');

    this.boardForm = this.formBuilder.group({
      boardname: this.boardname
    });
      


        //Get board annotations
                   this.dataservice.getannotations().then(res=>{
                     //Set result to global variable as it can be accessed outdside the component
                    this.variab.annotations=res;
                    
                   

      
       //console.log("board",annos,this.feeditem.value.title);
       //Filter Feed with Annotations
       //Returns Array of annotaion for each feed.value.id
        
         var annotatedarray = this.variab.annotations.filter(anno=>{
          // console.log("target",anno.value.target.id);  
          if(anno.value.target.id === this.feeditem.value._id){
            //State Variable to toggle the hover toolbar component star

             this.selectedstar = 1;

                 return anno;
               
                
          }
          
   
        });
         console.log("annotations",annotatedarray,this.variab.boardupdated);
        //Map Annotations by its label valuea
        //Returns array of annotations for each label
        //console.log("anoo",this.variab.boardupdated)
         var annosForBoards = this.variab.boardupdated.map( (board, index) => {
            
            return  _.filter(annotatedarray,function(o) { 
              if(o.key===board.value.label){
              return o  ; 
            }
            });

         });

         console.log("annoforboards",annosForBoards);
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

      });
       // console.log(this.labelForBoards);
   
  } 


//Function called from Create new board block to remove the block
  cancelboard(){
    this.visible=false;
    
  }
 //Function called from Create board division to open a new createboard block
  opencreateboard(){
    this.visible=true;
  }
  //Function called from Create board block to save the feed to the board
  savetoboard(title,i){ 
   
      this.labelForBoards[i] = true;
      this.selectedstar=1;
      let update = {
        "@context": "http://www.w3.org/ns/anno.jsonld",
        "type": "Annotation",
        "creator": this.user,
        "created": this.date.getTime(),
        "modified": this.date.getTime(),
        "generator": "mm_2017_v1",
        "generated": this.date.getTime(),
        "target": this.feeditem,
        "motivation":"tagging",
        "label":[title.label]
      }
      this.createboardstore.dispatch('ADD_ITEMS',update);
    
    
    
  }

  //Function called from Create new board block to create new board by giving a board name 
  createboard(){
    this.visible=false; 

      let model={
       
         "@context": "http://www.w3.org/ns/anno.jsonld",
         "type": "Annotation",
         "creator": this.user,
         "created": this.date.getTime(),
         "modified": this.date.getTime(),
         "generator": "mm_2017_v1",
         "generated": this.date.getTime(),
         "motivation":"identifying",
         "label":this.boardname.value

       };
       this.boardservice.addboard(model);
       this.variab.boardupdated.push({value:model});  
      //this.variab.displayUserBoards.push(this.boardname.value);  
    //Update the group database with board idboardupdated:any=[];


    this.groupService.getgroups().then(res=>{
      var groups:any=[];
      groups=res;
      
      groups.map(group=>{
        //Check if the logged member is part of any group
        var checkmemberof = group.value.members.map(member=>{
          if(member == this.user){
            return group.value.groupname;
          }
        })
        
        //get the group name and update the group with the board
        checkmemberof.map(value=>{
          if(group.value.groupname === value){
            
              group.value.boards.push(this.boardname.value);
           
            console.log("checkmember",group.value);
            this.groupService.update(group.value);
          }
        })

      })
      


    })

     
  }

  //Function called from Create board block to remove the feed from the board
  removefromboard(title,i){
    this.labelForBoards[i]=false;
    this.selectedstar = 0;
    this.variab.annotations.map(anno=>{
      if(anno.value.target.id === this.feeditem.value._id && anno.key === title.label){
           
           anno.value.modified = this.date.getTime();
           anno.value.hideboardanno = true; 
           this.createboardstore.dispatch('MODIFY_DELETED',anno.value);
            
      }
    })
    
  }
 
        
}
