import { Component,Input,ViewChild,ElementRef} from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { DatePipe } from '@angular/common';
import { ReadlaterStore } from '../../store/readlater-store';
import { Global } from '../../../shared/global';
import { DataService } from '../../../services/data-service';
@Component({
    selector: 'app-modal',
    templateUrl: './modal.component.html',
    styleUrls: ['./modal.component.scss']
})
export class ModalComponent {
    @Input() item: any;
    @Input() index: any;
    closeResult: string;
    @ViewChild('content') modal:any;
    @ViewChild('sharewithteam') teammodal:any;
    @ViewChild('ssharefeed') sharefeeds:any;
    @ViewChild('ic') ElementRef:any;
    icon:boolean=false;
    val:boolean=false;
    feed:any=[];
    selectedIndex: any;
    selectedIcon: number;
    user:any;

    date:Date;

    showDialog:boolean;

    constructor(private modalService: NgbModal,public elementRef:ElementRef,public readlaterstore:ReadlaterStore,public variab:Global,public dataservice:DataService) {
      this.date = new Date();
     }

    open(content) {
       this.modalService.open(this.modal).result.then((result) => {
            this.closeResult = `Closed with: ${result}`;
        }, (reason) => {
            this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        });
        
        this.feed.push({value:this.item})
        

        this.user = localStorage.getItem('name');
        
          
          this.variab.readlaterfeeds.filter(anno=>{
            if(anno.value.target.id === this.feed[0].value._id){
              this.selectedIndex=1;
            }
          });

          this.variab.recentlyread.filter(anno=>{
            if(anno.value.target.id === this.feed[0].value._id){
              this.selectedIcon=1;
            }
          });
        
    }

    openshareteam(content) {
       this.modalService.open(this.teammodal).result.then((result) => {
            this.closeResult = `Closed with: ${result}`;
        }, (reason) => {
            this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        });
        
    }

    opensharefeeds(content) {
       this.modalService.open(this.sharefeeds).result.then((result) => {
            this.closeResult = `Closed with: ${result}`;
        }, (reason) => {
            this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        });
        
    }

    

    private getDismissReason(reason: any): string {
        if (reason === ModalDismissReasons.ESC) {
            return 'by pressing ESC';
        } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
            return 'by clicking on a backdrop';
        } else {
            return  `with: ${reason}`;
        }
    }
    change(){
       this.icon=true;       
    }
    checkimg(feeds){

          return (/<img[\s\S]*>/i.test(feeds));
       
      }
      extracturl(str){
        //var regex = /<img.*?src='(.*?)'/;
        //var regex = /<img[\s\S]*>/i;
         //var src = regex.exec(str);
         //console.log("src",src[0]);
         //var s = src[0].replace(/(height=")\d+("\W+width=")\d+/, '$1$2');
         //console.log("s",s);
         var tmp = document.createElement('div');
         tmp.innerHTML = str;
         var src = tmp.querySelector('img').getAttribute('src');
         //console.log(src)
         return src;
         /*var div = document.createElement('div');
         div.innerHTML = src[0];
         var elements = div.childNodes;
         console.log("eleme",elements[0]);
         if(elements[0]){
           return elements[0]|| null;
         }
         else{
           return null;
         }*/
       
      }
      readlater(index: number){
        console.log("called");
         if(this.selectedIndex == index){
           this.selectedIndex = -1;
           this.selectedIndex = -1;
           this.variab.readlaterfeeds.map(anno=>{
             if(anno.value.target.id === this.item._id){
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
           let model = {
             "@context": "http://www.w3.org/ns/anno.jsonld",
             "type": "Annotation",
             "creator": this.user,
             "created": this.date.getTime(),
             "modified": this.date.getTime(),
             "generator": "mm_2017_v1",
             "generated": this.date.getTime(),
             "target": this.item,
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
             if(anno.value.target.id === this.item._id){
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
             "target": this.item,
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
          "target": this.item,
          "hidden":true
        }   
        this.variab.recentlyread.push({value:model});
        this.readlaterstore.dispatch('ADD_ITEMS',model)
       this.variab.globalfeeds.splice(this.index,1);

       
       console.log(this.index,this.variab.globalfeeds);
      }
}
