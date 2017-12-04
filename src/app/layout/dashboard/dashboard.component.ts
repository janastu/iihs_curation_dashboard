import { Component, OnInit } from '@angular/core';
import { FormBuilder,Validators, FormGroup} from '@angular/forms';
import { routerTransition } from '../../router.animations';
import { Service } from '../../services/services';
import { DataService } from '../../services/data-service';
import { Global } from '../../shared';
@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss'],
    animations: [routerTransition()]
})
export class DashboardComponent implements OnInit {
	feeds:any=[];
    user:any;
    constructor(public service:Service,public dataservice:DataService,public variab:Global) {
    }

    ngOnInit() {
        var doc:any=[];

    this.user = localStorage.getItem('name');
    	this.service.getAll().then(result=>{

        this.feeds= result["_nr_stories"];
        console.log("feeds",this.feeds);
        })
        this.dataservice.getreadlater(this.user).then(result=>{
            
           doc=result;
           this.variab.readlaterfeeds = doc.map(feed=>{
             return feed.value.target;
           });
        });
    }
    
}
 
