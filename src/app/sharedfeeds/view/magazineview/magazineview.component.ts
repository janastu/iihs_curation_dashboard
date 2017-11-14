import { Component, OnInit, Input } from '@angular/core';
import { routerTransition } from '../../../router.animations';
import { Service } from '../../../services/services';
import * as _ from 'lodash'

@Component({
  selector: 'app-magazineview',
  templateUrl: './magazineview.component.html',
  styleUrls: ['./magazineview.component.scss'],
  animations: [routerTransition()]

})

export class MagazineviewComponent implements OnInit {
@Input('feeds') incomingfeeds:any=[];
@Input('metadata') incomingmetadata:any=[];
itsimage:boolean=false;
Dataglobal:any;
images:any=[];

  constructor(public service:Service) {
   }

  ngOnInit() {
   //this.images = this.checkimg(this.incomingfeeds);
   //console.log("images",this.images);
	}
  /*checkimg(feeds){
    var imagecollection = feeds.filter((val)=>{ 
      if(/<img[\s\S]*>/i.test(val.desc)){
        this.itsimage=true;
        return val;
      }
    });
    return imagecollection;
   
  }*/
  public handleEvent(childData:any){
    this.Dataglobal = childData;
   
  }
  
}