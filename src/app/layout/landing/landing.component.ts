import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../../router.animations';
import { Service } from '../../services/services';
@Component({
    selector: 'app-landing',
    templateUrl: './landing.component.html',
    styleUrls: ['./landing.component.scss'],
    animations: [routerTransition()]
})
export class LandingComponent implements OnInit {
	feeds:any=[];
    constructor(public service:Service) {
    }

    ngOnInit() {
    	this.service.getAll().then(result=>{

this.feeds= result;
console.log("feeds",this.feeds);
});
    }
   
}
