import { Component, Input, OnInit,Output,EventEmitter } from '@angular/core';
import { FormBuilder,Validators, FormGroup} from '@angular/forms';
import { DatePipe } from '@angular/common';
import { Service } from '../../../services/services';
import { Global } from '../../global';
import { ComponentsService } from '../../../services/components-service';
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
    @Output('childSortLabel') Sortlabel:any = new EventEmitter();
    @Output('childrefresh') Refresh:any = new EventEmitter();
iconarticle:boolean=false;
iconmagazine:boolean=false;
iconcard:boolean=false;
icontitle:boolean=false;
iconreadlater:boolean=false;
loginForm:FormGroup;
fromdate = this.formBuilder.control('', [Validators.required]);
todate = this.formBuilder.control('', [Validators.required]);
selectedVal:any;
desc:any;

loading: boolean = false;

 constructor(public formBuilder: FormBuilder,public datepipe: DatePipe,public componentsService:ComponentsService,public variab:Global,public service:Service) { }

  ngOnInit() {

    this.loginForm = this.formBuilder.group({

      fromdate: this.fromdate,
      todate: this.todate
    });
   
  }
  //function to get input values annd emit to feed component
  datefilter(){
 
    var changefrom,changeto;
    changefrom = this.datepipe.transform(this.fromdate.value,'yyyy.MM.dd');
    changeto = this.datepipe.transform(this.todate.value,'yyyy.MM.dd');
    console.log("date value",changefrom,Date.parse(changefrom));
    this.Dates.emit({changefrom,changeto});
    
  }
  //function to get radio input values for view annd emit to feed component
  onChangeView(deviceValue) {
    this.outgoing.emit(deviceValue.value);
    //console.log(deviceValue.value);
    localStorage.setItem('view',deviceValue.value)
    if(deviceValue.value === 'Article'){
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

 //function to reload the page
 refresh(): void{
   var recentdocs:any=[];
   var refreshedDocs:any=[];
   console.log("called");
    this.loading = true;
    this.service.getrecentfeeds().then(res=>{
      recentdocs=res;
        recentdocs.map(val=>{
          refreshedDocs.push({value:val});
          this.Refresh.emit(refreshedDocs);
        });  
      });

   //this.service.getrecentfeeds()
   //$route.reload();
   //window.location.reload();
  
 }
 //function to share with teammates
 shareteam(event){
   
   console.log("share with team");
 }
 onSortlabel(val){
   this.Sortlabel.emit(val);
 }
}
