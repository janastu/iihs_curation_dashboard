import { Component, OnInit,Input } from '@angular/core';
import {NgbDropdownConfig} from '@ng-bootstrap/ng-bootstrap';
import {NgbDropdown} from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder,Validators, FormGroup} from '@angular/forms';
import { Router } from '@angular/router';
import { Global } from '../../../shared/global';
import { BoardService } from '../../../services/board-service';
import { CreateBoardStore } from '../../store/create-board-store';
import { DataService } from '../../../services/data-service';
import { GroupService } from '../../../services/group-service';
import { ComponentsService } from '../../../services/components-service';
import { Utilities } from '../../../shared';
import * as _ from 'lodash';
import {NgbAlertConfig} from '@ng-bootstrap/ng-bootstrap';
@Component({
  selector: 'app-createboardcomponent',
  templateUrl: './createboardcomponent.component.html',
  styleUrls: ['./createboardcomponent.component.scss']
})
export class CreateboardcomponentComponent implements OnInit {
  @Input('feeditem') feeditem:any;
  @Input('index') index:any;

selectedstar: number;//Status variable to store the status of star icon
visible:boolean;//variale to store the status to show th create board block
boardForm:FormGroup;//variable to store the form input
boardname = this.formBuilder.control('', [Validators.required]);//variable to store the input value of the form
user:any;//variable to store the user name of logged in user
labelForBoards:any=[];//variable to store the index of the boards
boardannotations:any=[];
outside:any;
date:Date;
alertexists:boolean=false;//alert variable to store the status if board already exists
alertempty:boolean=false;//alert variable to store the status if board name is empty
groupname:any;//variable to store the groupname
queryString:any;//variable to store the input to find a board name
boards:any=[];
spinnerstate:any=[];
  constructor(public ngconfig:NgbDropdownConfig,public formBuilder: FormBuilder,public variab:Global,public boardservice:BoardService,
  public createboardstore:CreateBoardStore,public dataservice:DataService,public router:Router,
  public groupService:GroupService,public ngAlert:NgbAlertConfig,public componentsService:ComponentsService,public util:Utilities) {

}

  ngOnInit() {
    this.date = new Date();





   this.user =localStorage.getItem('name');

   this.groupname = localStorage.getItem('group');
    this.boardForm = this.formBuilder.group({
      boardname: this.boardname
    });


    //console.log(this.boardannotations);
          //Get BoardS
         this.util.boardsOnGroup(this.groupname).then((resWithType:any=[])=>{
           this.componentsService.addBoards('add',resWithType);
           })
          this.componentsService.getBoards().subscribe(val=>{
               this.boards = val;
              // console.log(this.boards,this.index);

              this.dataservice.annotation$.subscribe((reswithtype:any=[])=>{
               //console.log(reswithtype);
                this.componentsService.addAnnotations('add',reswithtype.rows);
           //Get board annotations
           this.boardannotations = this.componentsService.getannotations();

        //console.log(this.boardannotations);
       //Filter Feed with Annotations
       //Returns Array of annotaion for each feed.value.id
      //.subscribe((annotationsWithType:any)=>{
      //  console.log("anoservice",annotationsWithType);

         var annotatedarray = this.boardannotations.data.filter(anno=>{
          //console.log("target",anno.value.target);
          if(anno.value.target.value._id === this.feeditem.value._id){
            //State Variable to toggle the hover toolbar component star

            // this.selectedstar = 1;

                 return anno;


          }


        });
      // console.log("annotations",annotatedarray);
        //Map Annotations by its label valuea
        //Returns array of annotations for each label
        //console.log("anoo",this.boards)
         var annosForBoards = this.boards.data.map( (board, index) => {
        //  console.log("labe",board.value._id);
            return  _.filter(annotatedarray,function(o) {

              if(o.value.label===board.value._id){
                //console.log(o);
              return o  ;
            }
            });

         });

         //console.log("annoforboards",annosForBoards);
         //Map Annos for Boards to return boolean array
         //Returns example:[true,false,true]
         //Index of output == Index of label which means label[0] and label[1]
         //is active for above output
        this.labelForBoards  =  annosForBoards.map(anno=>{
             if(anno[0]){
               this.selectedstar = 1;
                 return true;
              }
               else{
                 return false;

             }
         })
        // console.log("annoforboards",this.labelForBoards);
      });
   });


  }


//Function called from Create new board block to remove the block
  cancelboard(){
    this.visible=false;
    this.alertempty = false;
    this.alertexists = false;

  }
 //Function called from Create board division to open a new createboard block
  opencreateboard(){
    this.visible=true;
  }
  //Function called from Create board block to save the feed to the board
  savetoboard(title,i){
    // console.log(title);
this.spinnerstate[i]=true;
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
        "label":[title._id]
      }
      //this.createboardstore.dispatch('ADD_ITEMS',update);
        this.dataservice.addtodatabase(update).then(res=>{
          if(res['ok']==true){
            this.labelForBoards[i] = true;
            this.selectedstar=1;
            this.spinnerstate[i]=false;
          }
        })


  }

  //Function called from Create new board block to create new board by giving a board name
  createboard(){
//   var model;

 // console.log('mem',title,this.labelForBoards);
  if(this.groupname){
    var model={

       "@context": "http://www.w3.org/ns/anno.jsonld",
       "type": "Annotation",
       "creator": this.user,
       "created": this.date.getTime(),
       "modified": this.date.getTime(),
       "generator": "mm_2017_v1",
       "generated": this.date.getTime(),
       "motivation":"identifying",
       "label":this.boardname.value,
       "group":this.groupname

     };

  }
    //Check if boardname exists
    if(this.boardname.value === ''){
      //console.log("boardname cant be empty");
      this.alertempty = true;
      this.ngAlert.type = 'warning';
      setTimeout(() => this.alertempty = false, 2000);
    }
    //check if board already exists by getting the boards
    else{

      var boardExists :any = 0;
      this.util.boardsOnGroup(this.groupname).then((resWithType:any=[])=>{

        this.boards = resWithType;
        this.boards.map(boardname=>{
         if(this.boardname.value === boardname.value.label){
           //console.log("boardname exists");
           boardExists = 1;

         }
       })

     });
      if(boardExists == 1){
        this.alertexists = true;
        this.ngAlert.type = 'warning'
        setTimeout(() => this.alertexists = false, 2000);
      }
      //Add the board to the database
      if(boardExists == 0){
        console.log("add",model);
        this.boardservice.addboard(model).then(res=>{

              if(res['ok'] == true){
                this.util.boardsOnGroup(this.groupname).then((resWithType:any=[])=>{

                  //this.boards = resWithType;
                    //console.log(this.boards,this.index);
                  this.componentsService.addBoards('add',resWithType);
                  //this.variab.boardupdated=res;

                      this.componentsService.getBoards().subscribe(val=>{
                          this.boards = val;
                      });

                })

                /*this.boardservice.getboards().then(response=>{
                  console.log("ew",response);
                  this.boards = response;

                  this.boards = this.boards.filter(board=>{
                   if(board.value.group){

                     return board.value.group === this.groupname;
                   }

                  })
                })*/

                this.visible=false;
                this.alertempty = false;
                this.alertexists = false;


              }
        })

      }

  }


  }

  //Function called from Create board block to remove the feed from the board
  removefromboard(title,i){
  this.spinnerstate[i]=true;
  this.dataservice.annotation$.subscribe((reswithtype:any=[])=>{
   //console.log(reswithtype);
    this.componentsService.addAnnotations('add',reswithtype.rows);
  //console.log(this.boardannotations.data);
   var boardannotations = this.componentsService.getannotations();
    boardannotations.data.map(anno=>{
    //  console.log(anno.value.label[0],title.label);
      if(anno.value.target.value._id === this.feeditem.value._id){
          this.dataservice.getAdocument(anno.id).then((annodoc:any)=>{

            annodoc.modified = this.date.getTime();
            annodoc.hideboardanno = true;
              // console.log(annodoc);
             this.dataservice.updatedatabase(annodoc).then(res=>{
               if(res['ok']==true){
                 this.labelForBoards[i]=false;
                 this.selectedstar = 0;
                 this.spinnerstate[i]=false;
                 if(this.router.url.includes('/boardfeeds')){
                   this.componentsService.alert('hideboard',this.index);
                   //this.variab.boardfeeds.splice(this.index,1);
                 }
               }
             })

          })

           //this.createboardstore.dispatch('MODIFY_DELETED',anno.value);
           //console.log("in boards",this.router.url);

      }
    })
  });

  }
  public closeAlert() {
      this.alertexists=false;
      this.alertempty= false;

  }


}
