import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../../router.animations';
import { Service } from '../../services/services';
@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss'],
    animations: [routerTransition()]
})
export class DashboardComponent implements OnInit {
	feeds:any=[];
    constructor(public service:Service) {
    }

    ngOnInit() {
    	this.service.getAll().then(result=>{

this.feeds= result["_nr_stories"];
console.log("feeds",this.feeds);
});
    }
   
}
