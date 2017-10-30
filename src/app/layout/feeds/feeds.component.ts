import { Component, OnInit, Input } from '@angular/core';
import { routerTransition } from '../../router.animations';
import { Service } from '../../services/services';
import { AlertComponent } from './_directives/index';
import { AlertService } from './_services/index';
import { FormBuilder, Validators, FormGroup} from '@angular/forms';
import { DatePipe } from '@angular/common';
import { NgbModal, NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import { Global } from '../../shared/global';
import { Router } from "@angular/router";


@Component({
  selector: 'app-feeds',
  templateUrl: './feeds.component.html',
  styleUrls: ['./feeds.component.scss'],
  animations: [routerTransition()]
})

export class FeedsComponent implements OnInit {
feeds:any=[];
readlaterfeeds:any=[];
timefilterfeeds:any=[];
rlater:any=0; //state variable
timefilter:any=0; //state variable
loginForm;
fromdate = this.formBuilder.control('', [Validators.required]);
todate = this.formBuilder.control('', [Validators.required]);
  constructor(public service:Service,public alertservice:AlertService,public formBuilder: FormBuilder,public datepipe: DatePipe,private modalService: NgbModal,public variab : Global,public router:Router) { }

  ngOnInit() {

    this.loginForm = this.formBuilder.group({
      fromdate: this.fromdate,
      todate: this.todate

    });
 
  	this.service.getAll().then(result=>{
  	this.feeds= result;

});
  	
  }

  readlater(item){
  	console.log("called",item);
  	this.readlaterfeeds.push(item);
  	
  	this.alertservice.success('Added to Read Later');

  }
  displayreadfilter(){
  	console.log("display",this.rlater);
  	this.rlater = 1;
  }
  datefilter(){
    var changefrom,changeto;
     changefrom = this.datepipe.transform(this.fromdate.value, 'dd.MM.yyyy');
     changeto = this.datepipe.transform(this.todate.value, 'dd.MM.yyyy');
    
    for(var i in this.feeds){
      console.log("change",Date.parse(this.feeds[i].date));
      if(Date.parse(this.feeds[i].date) >= Date.parse(changefrom) && Date.parse(this.feeds[i].date) <= Date.parse(changeto) ){
       this.timefilterfeeds.push(this.feeds[i]);
       console.log("da",this.timefilterfeeds);
       this.timefilter=1;
     }
    }
        this.loginForm.reset();
  }
  open(item) {
    const modalRef = this.modalService.open(NgbdModalContent);
    modalRef.componentInstance.name = item.title;
    modalRef.componentInstance.item = item;
  }


}
@Component({
  selector: 'app-feeds',
  templateUrl:'./modalcomponent.html' 
})
export class NgbdModalContent implements OnInit {
  @Input() name;
  @Input() item;
  loginForm;
  boardfeed:any=[];
board = this.formBuilder.control('', [Validators.required]);
  constructor(public activeModal: NgbActiveModal,public formBuilder: FormBuilder,public variab : Global,public router:Router) {}
  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      board: this.board

    });
    
  }
  save(){
    console.log("label",this.board.value);
    this.activeModal.close('Close click');
    this.variab.boardfeeds.push({"board title":this.board.value,"feed":this.item});
    console.log("label",this.variab.boardfeeds);
    

  }
}



