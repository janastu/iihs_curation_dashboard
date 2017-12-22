import { Component, OnInit, Input, ViewChild} from '@angular/core';
import { routerTransition } from '../../../router.animations';
import { Service } from '../../../services/services';
import { fadeInAnimation } from '../../../fade-in.animation';
//import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { DatePipe } from '@angular/common';
@Component({
  selector: 'app-articleview',
  templateUrl: './articleview.component.html',
  styleUrls: ['./articleview.component.scss'],
  animations: [routerTransition()]
})
export class ArticleviewComponent implements OnInit {
  @Input('feeds') incomingfeeds:any=[];
 

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
 
	}
  oncreateboard(){
    this.visible=true;
    
  }
  cancelboard(){
    this.visible=false;
    console.log(this.visible);
  }
  change(index){
    console.log(index);
     this.icon=true;
  }
  checkimg(feeds){
    return (/<img[\s\S]*>/i.test(feeds));
   
  }
  extracturl(str){
    //var regex = /<img.*?src='(.*?)'/;
    /*var regex = /<img[\s\S]*>/i;
    var src = regex.exec(str);
     console.log("src",src[0]);
     return src[0];*/
     var tmp = document.createElement('div');
     tmp.innerHTML = str;
     var src = tmp.querySelector('img').getAttribute('src');
     return src;
   
  }
}