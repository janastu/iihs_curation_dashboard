import { Component, OnInit } from '@angular/core';
import { FormBuilder,Validators, FormGroup} from '@angular/forms';
import { routerTransition } from '../../router.animations';
import { Service } from '../../services/services';
import { DataService } from '../../services/data-service';
import { Global } from '../../shared';
import { ComponentsService } from '../../services/components-service';
import { CategoryService } from '../../services/category-service';
@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss'],
    animations: [routerTransition()]
})
export class DashboardComponent implements OnInit {
	feeds:any=[];
    user:any;
    constructor(public service:Service,public dataservice:DataService,public variab:Global,public componentsService:ComponentsService,public categoryService:CategoryService) {
    }

    ngOnInit() {

    this.user = localStorage.getItem('name');
        this.dataservice.getreadlater(this.user).then(result=>{
            this.variab.readlaterfeeds=result;
           
        });
        this.dataservice.getrecentlyread(this.user).then(result=>{
            this.variab.recentlyread=result;
        });
        this.service.getfrompouch().then(result=>{
          
          this.variab.globalfeeds= result;
         this.feeds = this.variab.globalfeeds;
          
        });
        this.categoryService.getfrompouch().then((result)=>{
            this.variab.categoryupdated=result;
        });
    }

    
}
 
