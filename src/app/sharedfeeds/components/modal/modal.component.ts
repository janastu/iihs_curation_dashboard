import { Component,Input,ViewChild,ElementRef} from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { DatePipe } from '@angular/common';
import { ReadlaterStore } from '../../store/readlater-store';
import { Global } from '../../../shared/global';
import { DataService } from '../../../services/data-service';
import { Router } from '@angular/router';
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
    
    selectedIndex: any;
    selectedIcon: number;
    user:any;
    alertremove:boolean=false
    date:Date;

    showDialog:boolean;

    constructor(private modalService: NgbModal,public elementRef:ElementRef,public readlaterstore:ReadlaterStore,public variab:Global,public dataservice:DataService,public router:Router) {
      this.date = new Date();
     
     }

    open(content) {
       this.modalService.open(this.modal).result.then((result) => {
            this.closeResult = `Closed with: ${result}`;
        }, (reason) => {
            this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        });
        //console.log(this.item);
       // this.feed.push({value:this.item})
        

        this.user = localStorage.getItem('name');
        
          
          this.variab.readlaterfeeds.filter(anno=>{
            if(anno.value._id === this.item.value._id){
              this.selectedIndex=1;
            }
          });

          this.variab.recentlyread.filter(anno=>{
            if(anno.value._id === this.item.value._id){
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
      //console.log(feeds);
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
      checkhtml(feeds){
        return (/<p|a|span|div[\s\S]*>/i.test(feeds));
        
      }
      stripHtml(html){
          // Create a new div element
          var temporalDivElement = document.createElement("div");
          // Set the HTML content with the providen
          temporalDivElement.innerHTML = html;
          // Retrieve the text property of the element (cross-browser support)
          return temporalDivElement.textContent || temporalDivElement.innerText || "";
      }
  readlater(index: number){
    //console.log("called");
     if(this.selectedIndex == index){
       this.selectedIndex = -1;
       
       this.variab.readlaterfeeds.map(anno=>{
         if(anno.value._id === this.item.value._id){
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
         "target": this.item,
         "motivation":"bookmarking"
       }   
        //console.log(this.feed)
       this.variab.readlaterfeeds.push({value:model});
        console.log("postmodal",this.variab.readlaterfeeds)
       this.readlaterstore.dispatch('ADD_ITEMS',model)
     }
       
     
  }
  markasread(index:number){
    if(this.selectedIcon == index){
       this.selectedIcon = -1;
       console.log("recentlyread")
       this.variab.recentlyread.map(anno=>{
         if(anno.value._id === this.item.value._id){
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
    
    console.log(this.router.url);
    if(this.router.url === '/trashbox'){
      console.log('donot remove from trash');
      this.alertremove=true
    }

  else{
    //this.variab.recentlyread.push({value:model});
   this.readlaterstore.dispatch('ADD_ITEMS',model)
   
   this.variab.globalfeeds.splice(this.index,1);
   this.variab.boardfeeds.splice(this.index,1);
   this.variab.readlaterfeeds.splice(this.index,1);
   this.variab.recentlyread.splice(this.index,1);
   this.showDialog = false;
   }

  }
  public closeAlert() {
      this.alertremove=false;
      
  }
}
