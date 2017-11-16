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
    @Output('childView') outgoing:any = new EventEmitter();
    @Output('childDates') Dates:any = new EventEmitter();
    @Output('childCategory') Category:any = new EventEmitter();
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
  //function to get input values annd emit to feed component
  datefilter(){
 
    var changefrom,changeto;
    changefrom = this.fromdate.value;
    changeto = this.todate.value;
    console.log("date value",this.fromdate.value,Date.parse(changefrom));
    this.Dates.emit({changefrom,changeto});
    
  }
  //function to get radio input values for view annd emit to feed component
  onChangeView(deviceValue) {
    this.outgoing.emit(deviceValue.value);

    if(deviceValue.value.value === 'Article'){
      this.iconarticle=true;
      this.iconmagazine = false;
      this.iconcard = false;
      this.icontitle=false;
      
    }
    else if ( deviceValue.value === 'Magazine'){
      this.iconmagazine=true;
      this.iconarticle = false;
      this.iconcard = false;
      this.icontitle=false;
    }
    else if(deviceValue.value === 'Title'){
      this.icontitle=true;
      this.iconmagazine = false;
      this.iconcard = false;
      this.iconarticle=false;
    }
    else if(deviceValue.value === 'Card'){
      this.iconcard = true;
      this.iconmagazine = false;
      this.icontitle = false;
      this.iconarticle=false;
    }
     
  }
 //function to get radio input values for Category annd emit to feed component
  onCate(cat){
    console.log(cat.value);
    this.Category.emit(cat.value);
  }

 


}
