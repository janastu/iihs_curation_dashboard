import { Component, OnInit,Input,Output,EventEmitter } from '@angular/core';
import { routerTransition } from '../../../router.animations';
import { DatePipe } from '@angular/common';
//import { HtmlParser} from '../../Utilities/html-parser';
import { Router } from '@angular/router';
@Component({
  selector: 'app-title-view',
  templateUrl: './title-view.component.html',
  styleUrls: ['./title-view.component.scss'],
  animations: [routerTransition()]
})
export class TitleViewComponent implements OnInit {

desc:any;//Parameter to pass with modal component
@Input('feeds') item:any=[];
@Input('publishedfeeds') publishedfeeds:any=[];
@Input('index') index:number;
@Output('checkedInput') checked:any = new EventEmitter();
  constructor(public router:Router) {
    	//console.log("mouseover",this.item);
    	 }

  ngOnInit() {
   
  }
   onFilterChange(eve: any) {
    this.checked.emit(this.item);   
  }
  onSelectAll(eve:any){
     this.checked.emit(eve); 
  }
  

}
