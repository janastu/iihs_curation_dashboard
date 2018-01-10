import { Component, OnInit,Input,Output,EventEmitter,Inject } from '@angular/core';
import { ReadlaterStore } from '../../store/readlater-store';
import { Global } from '../../../shared';
import { DataService } from '../../../services/data-service';

@Component({
  selector: 'app-hover-toolbar',
  templateUrl: './hover-toolbar.component.html',
  styleUrls: ['./hover-toolbar.component.scss']
})
export class HoverToolbarComponent implements OnInit {
  @Input('item') feeditem:any;
  @Input('index') index:any;
  @Output('sendAlert') outgoing:any = new EventEmitter();
   @Output('sendIconState') iconState:any = new EventEmitter();
selectedIndex: any;
selectedIcon: number;
user:any;
showDialog:boolean;
date:Date;
  constructor(public readlaterstore:ReadlaterStore,public variab:Global,public dataservice:DataService) {

    this.selectedIndex = -1;
    //this.variab.selectedIcon = -1;
    //console.log(this.variab.selectedIcon)
   }

  ngOnInit() {
this.date = new Date();
    
    this.user = localStorage.getItem('name');
   
      
      this.variab.readlaterfeeds.filter(anno=>{
        if(anno.value.target.id === this.feeditem.value._id){
          this.selectedIndex=1;
        }
      });

      this.variab.recentlyread.filter(anno=>{
        if(anno.value.target.id === this.feeditem.value._id){
          this.selectedIcon=1;
          this.iconState.emit(this.selectedIcon);

        }
      });
    


  }
  readlater(index: number){
    console.log("called");
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
       console.log(this.variab.readlaterfeeds);
     }
     else{
       this.selectedIndex = index;
       
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
       console.log("recentlyread")
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
        console.log("notrecentlyread")
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
 
  hide(){

    
    let model = {
      "@context": "http://www.w3.org/ns/anno.jsonld",
      "type": "Annotation",
      "creator": this.user,
      "created": this.date.getTime(),
      "modified": this.date.getTime(),
      "generator": "mm_2017_v1",
      "generated": this.date.getTime(),
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
