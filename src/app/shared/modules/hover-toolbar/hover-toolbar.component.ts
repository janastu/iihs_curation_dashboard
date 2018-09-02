import { Component, OnInit,Input,Output,EventEmitter,Inject } from '@angular/core';
import { ReadlaterStore } from '../../store/readlater-store';
import { Global } from '../../../shared';
import { DataService } from '../../../services/data-service';//Import dataservice to get annotations
import { FeedService } from '../../../services/feed-service';//Import feed service to update feed when removed
import { ComponentsService } from '../../../services/components-service';//Import feed service to update feed when removed
import { Router } from '@angular/router';
import { Utilities } from '../../../shared';//Import utilities to perform sorting and filtering
@Component({
  selector: 'app-hover-toolbar',
  templateUrl: './hover-toolbar.component.html',
  styleUrls: ['./hover-toolbar.component.scss']
})
export class HoverToolbarComponent implements OnInit {
  @Input('item') feeditem:any;
  @Input('index') index:any;
  @Input('published') published:any;
  @Output('sendAlert') outgoing:any = new EventEmitter();
  @Output('sendIconState') iconState:any = new EventEmitter();
selectedIndex: any;//variable to store the status of readlater icon
selectedIcon: any;//variable to store the status of recently read icon
user:any;//variable to store the username of loggied in user
showDialog:boolean;//variable to store the status to show the dialog component when hide is called
date:Date;//variable to store the current date
alertremove:boolean=false;//alert variable to store the status to show the alert to remove from trashbox
readlaterannos:any=[];//variable to store read later annotations
recentlyreadannos:any=[];//variable to store recently read annotations
  constructor(public readlaterstore:ReadlaterStore,public variab:Global,public dataservice:DataService,public router:Router,public feedService:FeedService,public util:Utilities,public componentsService:ComponentsService) {
   }

  ngOnInit() {


this.date = new Date();
//console.log("readlaterhighlightfeeds");
    this.user = localStorage.getItem('name');
    if(!this.router.url.includes('/mm')){
       //Get the read later annos
       //.then((res=>{
         this.readlaterannos = this.componentsService.getReadLater();

         //Highlight the bookmark icon if annotated
         this.readlaterannos.data.filter(anno=>{
          //console.log(anno)
           if(anno.value.target.value._id === this.feeditem.value._id){
             this.selectedIndex=1;
           }
         });
    //   });
       //Get the recently read annos
       //this.dataservice.getrecentlyreadannotations().then(res=>{
         this.recentlyreadannos =  this.componentsService.getRecentlyRead();
         //console.log("recentlyreadhighlight",res);
         //Highlight the bookmark icon if annotated
         this.recentlyreadannos.data.filter(anno=>{
           if(anno.value.target.value._id === this.feeditem.value._id){
             this.selectedIcon=1;
           }
         });
       //})
     }

  }
  //On clicked on readlater
  readlater(index: number){
    //if the bookmark is highlighted then remove the readlater annotation
     if(this.selectedIndex == index){


       this.readlaterannos.data.map(anno=>{
         if(anno.value.target.value._id === this.feeditem.value._id){
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
       //this.readlaterannos.data.push({value:model});

       //this.readlaterstore.dispatch('ADD_ITEMS',model)
        this.dataservice.addtodatabase(model).then(res=>{
            if(res['ok']==true){
              this.dataservice.getreadlaterannotations().then((resWithType:any=[])=>{
               this.componentsService.addReadLater('add',resWithType);
             })
                this.selectedIndex = index;
            }
        })

     }


  }
  //On click mark as read
  markasread(index:number){
    //if the read(tick) is highlighted then remove the readlater annotation
     if(this.selectedIcon == index){

       //console.log("recentlyread")
       this.recentlyreadannos.data.map(anno=>{
          if(anno.value.target.value._id === this.feeditem.value._id){
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
           this.dataservice.getrecentlyreadannotations().then((resWithType:any=[])=>{
            this.componentsService.addRecentlyRead('add',resWithType);
          })
           this.selectedIcon = index;
         }
       });

     }

  }
 //Click hide to remove the feed and push to trashbox
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
      this.alertremove=false;

  }

}
