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
selectedIndex: any;
selectedIcon: number;
user:any;
showDialog:boolean;
  constructor(public readlaterstore:ReadlaterStore,public variab:Global,public dataservice:DataService) {

    this.selectedIndex = -1;
    //this.variab.selectedIcon = -1;
    //console.log(this.variab.selectedIcon)
   }

  ngOnInit() {

    
    this.user = localStorage.getItem('name');
   
      
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
  readlater(index: number){
    console.log("called");
     if(this.selectedIndex == index){
       this.selectedIndex = -1;
     }
     else{
       this.selectedIndex = index;
     }
       
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
