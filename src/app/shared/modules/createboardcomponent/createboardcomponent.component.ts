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
outside:any;
date:Date;
alertexists:boolean=false;//alert variable to store the status if board already exists
alertempty:boolean=false;//alert variable to store the status if board name is empty
groupname:any;//variable to store the groupname
queryString:any;//variable to store the input to find a board name
  constructor(public ngconfig:NgbDropdownConfig,public formBuilder: FormBuilder,public variab:Global,public boardservice:BoardService,public createboardstore:CreateBoardStore,public dataservice:DataService,public router:Router,public groupService:GroupService,public ngAlert:NgbAlertConfig) {



}

  ngOnInit() {
    this.date = new Date();





   this.user =localStorage.getItem('name');

   this.groupname = localStorage.getItem('group');
    this.boardForm = this.formBuilder.group({
      boardname: this.boardname
    });



        //Get board annotations
                   ///this.dataservice.getannotations().then(res=>{
                     //Set result to global variable as it can be accessed outdside the component
                    //this.variab.annotations=res;

                  //  console.log(this.variab.annotaions);


       //console.log("board",this.feeditem.value.title);
       //Filter Feed with Annotations
       //Returns Array of annotaion for each feed.value.id

         var annotatedarray = this.variab.annotations.filter(anno=>{
          //console.log("target",anno.value.target.id);
          if(anno.value.target.id === this.feeditem.value._id){
            //State Variable to toggle the hover toolbar component star

            // this.selectedstar = 1;

                 return anno;


          }


        });
        //console.log("annotations",annotatedarray);
        //Map Annotations by its label valuea
        //Returns array of annotations for each label
        //console.log("anoo",this.variab.boardupdated)
         var annosForBoards = this.variab.boardupdated.map( (board, index) => {

            return  _.filter(annotatedarray,function(o) {
             //console.log(o.key,board.value._id);
              if(o.key===board.value._id){
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

    //  });
       //console.log(this.labelForBoards);

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
      this.variab.boardupdated.map(boardname=>{
         if(this.boardname.value === boardname.value.label){
           //console.log("boardname exists");
           boardExists = 1;

         }
       })
      if(boardExists == 1){
        this.alertexists = true;
        this.ngAlert.type = 'warning'
        setTimeout(() => this.alertexists = false, 2000);
      }
      //Add the board to the database
      if(boardExists == 0){
        //console.log("add");
        this.boardservice.addboard(model).then(res=>{

              if(res['ok'] == true){
                this.boardservice.getboards().then(res=>{
                  console.log("ew",res);
                  this.variab.boardupdated = res;
                  this.variab.boardupdated = this.variab.boardupdated.filter(board=>{
                   if(board.value.group){

                     return board.value.group === this.groupname;
                   }

                  })
                })

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

    this.variab.annotations.map(anno=>{
    //  console.log(anno.value.label[0],title.label);
      if(anno.value.target.id === this.feeditem.value._id){

           anno.value.modified = this.date.getTime();
           anno.value.hideboardanno = true;

            this.dataservice.updatedatabase(anno.value).then(res=>{
              if(res['ok']==true){
                this.labelForBoards[i]=false;
                this.selectedstar = 0;
                if(this.router.url.includes('/boardfeeds')){
                  this.variab.boardfeeds.splice(this.index,1);
                }
              }
            })
           //this.createboardstore.dispatch('MODIFY_DELETED',anno.value);
           //console.log("in boards",this.router.url);

      }
    })

  }
  public closeAlert() {
      this.alertexists=false;
      this.alertempty= false;

  }


}
