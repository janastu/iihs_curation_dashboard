import { Component, OnInit,Input } from '@angular/core';
import { Global } from '../../../shared';
import { BoardService } from '../../../services/board-service';
import { CreateBoardStore } from '../../store/create-board-store';
import { ReadlaterStore } from '../../store/readlater-store';
import { DataService } from '../../../services/data-service';
import { GroupService } from '../../../services/group-service';
import {NgbDropdownConfig} from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder,Validators, FormGroup} from '@angular/forms';
import * as _ from 'lodash';
@Component({
  selector: 'app-article-toolbar',
  templateUrl: './article-toolbar.component.html',
  styleUrls: ['./article-toolbar.component.scss']
})
export class ArticleToolbarComponent implements OnInit {
  @Input('item') feeditem:any;
  @Input('index') index:any;
visible:boolean;
selectedIndex: any;
labelForBoards:any=[];
user:any;
boardForm:FormGroup;
boardname = this.formBuilder.control('', [Validators.required]);
selectedIcon: number;
selectedstar:number;
showDialog:boolean;
date:Date;
  constructor(public ngconfig:NgbDropdownConfig,public variab:Global,public formBuilder: FormBuilder,public boardservice:BoardService,public createboardstore:CreateBoardStore,public dataservice:DataService,public readlaterstore:ReadlaterStore,public groupService:GroupService) { 
     this.selectedIndex = -1;
 
}

  ngOnInit() {
    this.date = new Date();
    this.ngconfig.autoClose='outside';
     this.user = localStorage.getItem('name');
    var annos:any=[];
   

    this.boardForm = this.formBuilder.group({
      boardname: this.boardname
    });
   
       this.dataservice.getannotations().then(res=>{

           annos=res;
          //console.log("board",annos,this.feeditem.value.title);
          //Filter Feed with Annotations
          //Returns Array of annotaion for each feed.value.id
            var annotatedarray = annos.filter(anno=>{
             if(anno.value.target.id === this.feeditem.value._id){
               //State Variable to toggle the hover toolbar component star
                this.selectedstar = 1;

                    return anno;
                  
                   
             }
             
      
           });
           //Map Annotations by its label value
           //Returns array of annotations for each label
            var annosForBoards = this.variab.boardupdated.map( (board, index) => {
               // console.log("anoo",board,annotatedarray)
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
    console.log("true",this.labelForBoards)

       });
   
   
    
   //Get annotations for readlater feeds and toogle the bookmark icon   
      this.variab.readlaterfeeds.filter(anno=>{
        if(anno.value.target.id === this.feeditem.value._id){
          this.selectedIndex=1;
        }
      });
       
      //Get annotations for recently read feeds and toogle the check icon   
      this.variab.recentlyread.filter(anno=>{
        if(anno.value.target.id === this.feeditem.value._id){
          this.selectedIcon=1;
        }
      });
  }

  cancelboard(){
    this.visible=false;
    
  }
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
       "label":title.label
     }
     this.createboardstore.dispatch('ADD_ITEMS',update);
    
    
    
  }
  createboard(){
    this.visible=true;     
    console.log("jb",this.boardname)
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
  readlater(index: number){
     if(this.selectedIndex == index){
       this.selectedIndex = -1;
       this.variab.readlaterfeeds.map(anno=>{
         if(anno.value.target.id === this.feeditem.value._id){
           anno.value.modified = this.date.getTime();
           anno.value.hidereadlateranno = true;
           console.log(anno.value); 

       this.readlaterstore.dispatch('MODIFY_DELETED',anno.value);
         }

       })
       this.variab.readlaterfeeds.splice(this.index,1)
     }
     else{
       this.selectedIndex = index;
       console.log(this.feeditem);  
       let model = {
         "@context": "http://www.w3.org/ns/anno.jsonld",
         "type": "Annotation",
         "creator": this.user,
         "created": this.date.getTime(),
         "modified": this.date.getTime(),
         "generator": "mm_2017_v1",
         "generated": this.date.getTime(),
         "target": this.feeditem,
         "motivation":"bookmarking"
       }   
       this.variab.readlaterfeeds.push({value:model});
       this.readlaterstore.dispatch('ADD_ITEMS',model)
     }
     
  }
  markasread(index:number){
    if(this.selectedIcon == index){
       this.selectedIcon = -1;
       this.variab.recentlyread.map(anno=>{
         if(anno.value.target.id === this.feeditem.value._id){
           anno.value.modified = this.date.getTime();
           anno.value.hiderecenltyreadanno = true;
           console.log(anno.value); 

       this.readlaterstore.dispatch('MODIFY_DELETED',anno.value);
         }

       })
       this.variab.recentlyread.splice(this.index,1)
     }
     else{
       this.selectedIcon = index;
       let model = {
         "@context": "http://www.w3.org/ns/anno.jsonld",
         "type": "Annotation",
         "creator": this.user,
         "created": this.date.getTime(),
         "modified": this.date.getTime(),
         "generator": "mm_2017_v1",
         "generated": this.date.getTime(),
         "target": this.feeditem,
         "motivation":"tagging"
       }   
       this.variab.recentlyread.push({value:model});
       this.readlaterstore.dispatch('ADD_ITEMS',model)
     }
    
  }
  /*hide(){
   this.variab.globalfeeds.splice(this.index,1);

   
   console.log(this.index,this.variab.globalfeeds);
  }*/

  hide(){

    
    let model = {
      "@context": "http://www.w3.org/ns/anno.jsonld",
      "type": "Annotation",
      "creator": this.user,
      "created": "2015-01-28T12:00:00Z",
      "modified": "2015-01-29T09:00:00Z",
      "generator": "mm_2017_v1",
      "generated": "2015-02-04T12:00:00Z",
      "target": this.feeditem,
      "hidden":true
    }   
    this.variab.recentlyread.push({value:model});
    this.readlaterstore.dispatch('ADD_ITEMS',model)
   this.variab.globalfeeds.splice(this.index,1);

   
   console.log(this.index,this.variab.globalfeeds);
   this.showDialog = false;
  }
 
}
