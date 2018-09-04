import { Component, OnInit,Input } from '@angular/core';
import { Global } from '../../../shared';
import { BoardService } from '../../../services/board-service';
import { CreateBoardStore } from '../../store/create-board-store';
import { ReadlaterStore } from '../../store/readlater-store';
import { DataService } from '../../../services/data-service';
import { GroupService } from '../../../services/group-service';
import { ComponentsService } from '../../../services/components-service';
import { Utilities } from '../../../shared';
import {NgbDropdownConfig} from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder,Validators, FormGroup} from '@angular/forms';
import * as _ from 'lodash';
import {NgbAlertConfig} from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
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
queryString:any;
alertexists:boolean=false;
alertempty:boolean=false;
alertremove:boolean=false;
groupname:any;//variable to store the groupname
boardannotations:any=[];
readlaterannos:any=[];
recentlyreadannos:any=[];
boards:any=[];
  constructor(public ngconfig:NgbDropdownConfig,public variab:Global,public formBuilder: FormBuilder,public boardservice:BoardService,
  public createboardstore:CreateBoardStore,public dataservice:DataService,public readlaterstore:ReadlaterStore,public util:Utilities,
  public groupService:GroupService,public ngAlert:NgbAlertConfig,public router:Router,public componentsService:ComponentsService) {
     this.selectedIndex = -1;
     this.user = localStorage.getItem('name');
     //Get Readlater annotations and add to service
     this.dataservice.getreadlaterannotations(this.user).then((resWithType:any=[])=>{
     // console.log(resWithType);
      this.componentsService.addReadLater('add',resWithType);
    });
    //Get recently read annotation and set a service
    this.dataservice.getrecentlyreadannotations(this.user).then((resWithType:any=[])=>{
      this.componentsService.addRecentlyRead('add',resWithType);
    });

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
          //console.log("target",anno.value.target.id);
          if(anno.value.target.value._id === this.feeditem.value._id){
            //State Variable to toggle the hover toolbar component star

            // this.selectedstar = 1;

                 return anno;


          }


        });
      //  console.log("annotations",annotatedarray);
        //Map Annotations by its label valuea
        //Returns array of annotations for each label
        //console.log("anoo",this.boards)
         var annosForBoards = this.boards.data.map( (board, index) => {

            return  _.filter(annotatedarray,function(o) {
             //console.log(o.key,board.value._id);
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


   //Get annotations for readlater feeds and toogle the bookmark icon
    this.componentsService.getReadLater().subscribe((res:any=[])=>{

   //Highlight the bookmark icon if annotated
   res.data.filter(anno=>{
    //console.log(anno)
     if(anno.value.value._id === this.feeditem.value._id){
       this.selectedIndex=1;
     }
   });
});
      //Get annotations for recently read feeds and toogle the check icon
      this.componentsService.getRecentlyRead().subscribe((res:any=[])=>{
      //console.log("recentlyreadhighlight",res);
      //Highlight the bookmark icon if annotated
      res.data.filter(anno=>{
        if(anno.value.value._id === this.feeditem.value._id){
          this.selectedIcon=1;
        }
      });
    });
  }

  cancelboard(){
    this.visible=false;

  }
  //Function called from Create board block to save the feed to the board
  savetoboard(title,i){
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
      this.dataservice.addtodatabase(update).then(res=>{
        if(res['ok']==true){
          this.labelForBoards[i] = true;
          this.selectedstar=1;
        }
      })
      //this.createboardstore.dispatch('ADD_ITEMS',update);



  }

  //Function called from Create new board block to create new board by giving a board name
  createboard(){
    console.log("ifadd",this.groupname);
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
//   console.log("add",model);

    //Check if boardname exists
    if(this.boardname.value === ''){
      console.log("boardname cant be empty");
      console.log("add",model);
      this.alertempty = true;
      this.ngAlert.type = 'warning';
      setTimeout(() => this.alertempty = false, 2000);
    }
    //check if board already exists by getting the boards
    else{

      var boardExists :any = 0;
      this.boards.data.map(boardname=>{
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
        console.log("add",model);
        this.boardservice.addboard(model).then(res=>{

              if(res['ok'] == true){
                this.util.boardsOnGroup(this.groupname).then((resWithType:any=[])=>{
                //  this.boards = resWithType;
                  this.componentsService.addBoards('add',resWithType);
                  //this.variab.boardupdated=res;

                      this.componentsService.getBoards().subscribe(val=>{
                          this.boards = val;
                      });

                })

                this.visible=false;
                this.alertempty = false;
                this.alertexists = false;


              }
        })

      }

  }


  }

  removefromboard(title,i){
    this.dataservice.annotation$.subscribe((reswithtype:any=[])=>{
     //console.log(reswithtype);
      this.componentsService.addAnnotations('add',reswithtype.rows);
    //console.log(this.boardannotations.data);
     var boardannotations = this.componentsService.getannotations();
    boardannotations.data.map(anno=>{
    //  console.log(anno.value.label[0],title.label);
      if(anno.value.target.value._id === this.feeditem.value._id){

           anno.value.modified = this.date.getTime();
           anno.value.hideboardanno = true;

            this.dataservice.updatedatabase(anno.value).then(res=>{
              if(res['ok']==true){
                this.labelForBoards[i]=false;
                this.selectedstar = 0;
                if(this.router.url.includes('/boardfeeds')){
                  this.componentsService.alert('hideboard',this.index);
                  //this.variab.boardfeeds.splice(this.index,1);
                }
              }
            })
           //this.createboardstore.dispatch('MODIFY_DELETED',anno.value);
           //console.log("in boards",this.router.url);

      }
    })
  });

  }
  readlater(index: number){
    if(this.selectedIndex == index){

 this.componentsService.getReadLater().subscribe((res:any=[])=>{
      res.data.map(anno=>{
        if(anno.value.value._id === this.feeditem.value._id){
          anno.value.modified = this.date.getTime();
          anno.value.hidereadlateranno = true;
         // console.log(anno.value);

          //this.readlaterstore.dispatch('MODIFY_DELETED',anno.value);
           this.dataservice.updatedatabase(anno.value).then(res=>{
             if(res['ok'] == true){
               this.selectedIndex = -1;
               this.componentsService.alert('hidelater',this.index);
               //this.variab.readlaterfeeds.splice(this.index,1)
             }
           })

        }

      })

});
    }
    //Else add the feed as annotation
    else{

      // console.log("notrecentlyread",this.feeditem)
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
      //this.readlaterannos.push({value:model});

      //this.readlaterstore.dispatch('ADD_ITEMS',model)
       this.dataservice.addtodatabase(model).then(res=>{
           if(res['ok']==true){
             this.dataservice.getreadlaterannotations(this.user).then((resWithType:any=[])=>{
              this.componentsService.addReadLater('add',resWithType);
            })
               this.selectedIndex = index;
           }
       })

    }

  }
  markasread(index:number){
    if(this.selectedIcon == index){
this.componentsService.getRecentlyRead().subscribe((res:any=[])=>{
      //console.log("recentlyread")
      res.data.map(anno=>{
         if(anno.value.value._id === this.feeditem.value._id){
          anno.value.modified = this.date.getTime();
          anno.value.hiderecenltyreadanno = true;
          //console.log(anno.value);

           this.dataservice.updatedatabase(anno.value).then(res=>{
             if(res['ok'] == true){
               this.selectedIcon = -1;
               this.componentsService.alert('hideread',this.index);
               //this.variab.recentlyread.splice(this.index,1)
             }
           });

         }

      });
});
    }
    //Else add the feed as annotation
    else{


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

      this.dataservice.addtodatabase(model).then(res=>{
        if(res['ok'] == true){
          this.recentlyreadannos.data.push({value:model});
          this.dataservice.getrecentlyreadannotations(this.user).then((resWithType:any=[])=>{
           this.componentsService.addRecentlyRead('add',resWithType);
         })
          this.selectedIcon = index;
        }
      });

    }

  }

  hide(){
    if(this.router.url === '/trashbox'){
      this.alertremove=true
    }


    else{
      this.util.hide(this.feeditem.value,this.index).then(res=>{
        if(res['ok']==true){
          this.componentsService.alert('hide',this.index);


        }
      });
    }

  }
  public closeAlert() {
      this.alertexists=false;
      this.alertempty= false;
      this.alertremove=false;
  }

}
