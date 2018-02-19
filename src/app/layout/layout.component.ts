import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Userservice } from '../services/userservice';
@Component({
    selector: 'app-layout',
    templateUrl: './layout.component.html',
    styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {

    constructor(public router: Router,public userService:Userservice) { }

    ngOnInit() {
    	this.userService.checkExpired();
        if (this.router.url === '/') {
            this.router.navigate(['/dashboard']);
        }
    }

}
