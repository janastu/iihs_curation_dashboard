import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup} from '@angular/forms';
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
iconarticle:any=0;
iconmagazine:any=0;
iconcard:any=0;
icontitle:any=0;
iconreadlater:any=0;
loginForm;
fromdate = this.formBuilder.control('', [Validators.required]);
todate = this.formBuilder.control('', [Validators.required]);
 constructor(public formBuilder: FormBuilder,public datepipe: DatePipe,public router:Router) { }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      fromdate: this.fromdate,
      todate: this.todate

    });
  
    if(this.router.url === '/articleview'){
      this.iconarticle=1;
    }
    else if (this.router.url === '/magazineview'){
      this.iconmagazine=1;
    }
    else if(this.router.url === '/title-view'){
      this.icontitle=1;
    }
    else if(this.router.url === '/card-view'){
      this.iconcard = 1;
    }
    else if(this.router.url === '/readlater' || this.router.url === '/boardfeeds'){
      this.iconreadlater = 1;
    }
  }
  datefilter(){
    var changefrom,changeto;
     changefrom = this.datepipe.transform(this.fromdate.value, 'dd.MM.yyyy');
     changeto = this.datepipe.transform(this.todate.value, 'dd.MM.yyyy');
   
    }
  
   readlater(item){
  	console.log("called",item);
  

  }
  onChange(deviceValue) {
    console.log(deviceValue);
    if(deviceValue === 'Magazine') 
      { 
        console.log(deviceValue);
        this.router.navigate(['/magazineview'])
       
  }
  else if(deviceValue === 'Article') 
      { 
        console.log(deviceValue);
        this.router.navigate(['/articleview'])
     
  }
  else if(deviceValue === 'Title') 
      { 
        console.log(deviceValue);
        this.router.navigate(['/title-view'])
  }
  else  
      { 
        console.log(deviceValue);
        this.router.navigate(['/card-view'])
  }
  
  
}

 


}
