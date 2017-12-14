import { Component, OnInit,Input } from '@angular/core';
import { Global } from '../../../shared';
import { BoardService } from '../../../services/board-service';
import { CreateBoardStore } from '../../store/create-board-store';
import { ReadlaterStore } from '../../store/readlater-store';
import { DataService } from '../../../services/data-service';
import { FormBuilder,Validators, FormGroup} from '@angular/forms';
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
annoforid:any=[];
htmlboardname:any=[];
user:any;
boardForm:FormGroup;
boardname = this.formBuilder.control('', [Validators.required]);
selectedIcon: number;
selectedstar:number;
  constructor(public variab:Global,public formBuilder: FormBuilder,public boardservice:BoardService,public createboardstore:CreateBoardStore,public dataservice:DataService,public readlaterstore:ReadlaterStore,) { 
     this.selectedIndex = -1;
 
}

  ngOnInit() {
     this.user = localStorage.getItem('name');
    var annos:any=[];
   

    this.boardForm = this.formBuilder.group({
      boardname: this.boardname
    });
   
    this.dataservice.getannotations().then(res=>{
        annos=res;

         annos.filter(anno=>{
          if(anno.value.target.id === this.feeditem.value._id){
             this.annoforid.push(anno);
               this.selectedstar =1;
                this.variab.boardupdated.map(boardname=>{
                  this.annoforid.map(anno=>{
                    if(anno.key === boardname.value.label){
                      
                      this.htmlboardname = boardname.value.label;
                      // console.log(this.htmlboardname,anno.key)
                    }
                  })
                })
          }
        });
    });
   
    
      
      this.variab.readlaterfeeds.filter(anno=>{
        if(anno.value.target.id === this.feeditem.value._id){
          this.selectedIndex=1;
        }
      });

      this.variab.recentlyread.filter(anno=>{
        if(anno.value.target.id === this.feeditem.value._id){
          this.selectedIcon=1;
        }
      });
  }

  cancelboard(){
    this.visible=false;
    
  }
  savetoboard(title,index:number ){ 
    
     this.variab.boardupdated.map(boardname=>{
       if(this.htmlboardname === boardname.value.label){
          this.htmlboardname = boardname.value.label;
       }
       this.htmlboardname = title.label;
     });

    
    if(this.selectedIndex == index){
      this.selectedIndex = -1;
    }
    else{
     this.selectedIndex = 1;
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
  readlater(index: number){
     if(this.selectedIndex == index){
       this.selectedIndex = -1;
     }
     else{
       this.selectedIndex = index;
     }
     console.log(this.feeditem);  
     let model = {
       "@context": "http://www.w3.org/ns/anno.jsonld",
       "type": "Annotation",
       "creator": this.user,
       "created": "2015-01-28T12:00:00Z",
       "modified": "2015-01-29T09:00:00Z",
       "generator": "mm_2017_v1",
       "generated": "2015-02-04T12:00:00Z",
       "target": this.feeditem,
       "motivation":"bookmarking"
     }   
     this.variab.readlaterfeeds.push({value:model});
     this.readlaterstore.dispatch('ADD_ITEMS',model)
  }
  markasread(index:number){
    if(this.selectedIcon == index){
       this.selectedIcon = -1;
     }
     else{
       this.selectedIcon = index;
       let model = {
         "@context": "http://www.w3.org/ns/anno.jsonld",
         "type": "Annotation",
         "creator": this.user,
         "created": "2015-01-28T12:00:00Z",
         "modified": "2015-01-29T09:00:00Z",
         "generator": "mm_2017_v1",
         "generated": "2015-02-04T12:00:00Z",
         "target": this.feeditem,
         "motivation":"tagging"
       }   
       this.variab.recentlyread.push({value:model});
       this.readlaterstore.dispatch('ADD_ITEMS',model)
     }
    
  }
  hide(){
   this.variab.globalfeeds.splice(this.index,1);

   
   console.log(this.index,this.variab.globalfeeds);
  }

 
}
