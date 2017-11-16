import { Component,Input,ViewChild,ElementRef} from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';

@Component({
    selector: 'app-modal',
    templateUrl: './modal.component.html',
    styleUrls: ['./modal.component.scss']
})
export class ModalComponent {
    @Input() item: any;
    closeResult: string;
    @ViewChild('content') modal:any;
    @ViewChild('sharewithteam') teammodal:any;
    @ViewChild('ssharefeed') sharefeeds:any;
    @ViewChild('ic') ElementRef:any;
    icon:boolean=false;

    constructor(private modalService: NgbModal,public elementRef:ElementRef) { }

    open(content) {
       this.modalService.open(this.modal).result.then((result) => {
            this.closeResult = `Closed with: ${result}`;
        }, (reason) => {
            this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
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
}
