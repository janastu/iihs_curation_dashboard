import { Component, OnInit, Input } from '@angular/core';
import { routerTransition } from '../../../router.animations';
import { Service } from '../../../services/services';


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


  constructor(public service:Service) {
   }

  ngOnInit() {
     console.log("sam",this.incomingmetadata);

     this.checkimg(this.incomingfeeds);
	}
  checkimg(feeds){
    feeds.map((val)=>{
      if(/<img[\s\S]*>/i.test(val.desc)){
        this.itsimage = true;
        console.log(val.desc);
      }
    });
  }
  public handleEvent(childData:any){
    this.Dataglobal = childData;
   
  }
  
}