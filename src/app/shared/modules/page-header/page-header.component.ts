import { Component, Input, OnInit,Output,EventEmitter } from '@angular/core';
import { FormBuilder,Validators, FormGroup} from '@angular/forms';
import { DatePipe } from '@angular/common';
import { Router } from '@angular/router';

@Component({
    selector: 'app-page-header',
    templateUrl: './page-header.component.html',
    styleUrls: ['./page-header.component.scss']
})
export class PageHeaderComponent implements OnInit{
    @Input() heading: string;
    @Input() icon: string;
    @Output('childData') outgoing:any = new EventEmitter();
    @Output('childDates') Dates:any = new EventEmitter();
iconarticle:boolean=false;
iconmagazine:boolean=false;
iconcard:boolean=false;
icontitle:boolean=false;
iconreadlater:boolean=false;
loginForm:FormGroup;
fromdate = this.formBuilder.control('', [Validators.required]);
todate = this.formBuilder.control('', [Validators.required]);

 constructor(public formBuilder: FormBuilder,public datepipe: DatePipe,public router:Router) { }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({

      fromdate: this.fromdate,
      todate: this.todate
    });
  }
  datefilter(){
 
    var changefrom,changeto;
     changefrom = this.datepipe.transform(this.fromdate.value, 'dd.MM.yyyy');
     changeto = this.datepipe.transform(this.todate.value, 'dd.MM.yyyy');
      console.log("date value",changefrom);
      this.Dates.emit({changefrom,changeto});
      this.loginForm.reset();
    }
  
   readlater(item){
  	console.log("called",item);
  

  }
  onChange(deviceValue) {
    this.outgoing.emit(deviceValue);

    if(deviceValue === 'Article'){
      this.iconarticle=true;
      this.iconmagazine = false;
      this.iconcard = false;
      this.icontitle=false;
      
    }
    else if ( deviceValue === 'Magazine'){
      this.iconmagazine=true;
      this.iconarticle = false;
      this.iconcard = false;
      this.icontitle=false;
    }
    else if(deviceValue === 'Title'){
      this.icontitle=true;
      this.iconmagazine = false;
      this.iconcard = false;
      this.iconarticle=false;
    }
    else if(deviceValue === 'Card'){
      this.iconcard = true;
      this.iconmagazine = false;
      this.icontitle = false;
      this.iconarticle=false;
    }
     
}

 


}
