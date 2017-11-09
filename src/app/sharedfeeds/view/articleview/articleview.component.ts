import { Component, OnInit, Input, ViewChild} from '@angular/core';
import { routerTransition } from '../../../router.animations';
import { Service } from '../../../services/services';
import { fadeInAnimation } from '../../../fade-in.animation';
//import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
@Component({
  selector: 'app-articleview',
  templateUrl: './articleview.component.html',
  styleUrls: ['./articleview.component.scss'],
  animations: [routerTransition()]
})
export class ArticleviewComponent implements OnInit {
  @Input('feeds') incomingfeeds:any=[];
metadata:any=[];
feeds:any=[];
boards:any=[];
visible:boolean=false;
closeResult: string;
icon:boolean=false;
  constructor(public service:Service) {
  this.boards.push({
    title:'tech'
  },
  {
    title:'science'
  });
   }

  ngOnInit() {
  	this.service.getAll().then(result=>{
  	this.feeds= result;
  });

	}
  oncreateboard(){
    this.visible=true;
    console.log(this.visible);
  }
  cancelboard(){
    this.visible=false;
    console.log(this.visible);
  }
  change(index){
    console.log(index);
     this.icon=true;
  }
}