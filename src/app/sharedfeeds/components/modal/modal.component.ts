import { Component,Input,ViewChild,ElementRef} from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';

@Component({
    selector: 'app-modal',
    templateUrl: './modal.component.html',
    styleUrls: ['./modal.component.scss']
})
export class ModalComponent {
    @Input() item: any;
    @Input() metadata: any;
    closeResult: string;
    @ViewChild('content') modal:any;
    @ViewChild('newcontent') newmodal:any;
    @ViewChild('ic') ElementRef:any;
    icon:boolean=false;
    val:boolean=false;
    constructor(private modalService: NgbModal,public elementRef:ElementRef) { }

    open(content) {
       this.modalService.open(this.modal).result.then((result) => {
            this.closeResult = `Closed with: ${result}`;
        }, (reason) => {
            this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        });
        
    }
    openanother(content) {
       this.modalService.open(this.newmodal).result.then((result) => {
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
}
