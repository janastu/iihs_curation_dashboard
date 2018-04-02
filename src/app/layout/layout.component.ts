import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Userservice } from '../services/userservice';
@Component({
    selector: 'app-layout',
    templateUrl: './layout.component.html',
    styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {
user:any;
    constructor(public router: Router,public userService:Userservice) { }

    ngOnInit() {
    	    
        this.user = localStorage.getItem('name')
        
        if (this.router.url === '/') {
           // console.log("in");
            this.userService.getAuser(this.user).then(userDoc=>{
             var groupname = userDoc['memberof'][0] ;
             if(groupname){

               this.router.navigate(['/dashboard'],{queryParams:{memberof:groupname}});
             } 
             else{
               this.router.navigate(['/dashboard']);
             }
            });
            //this.router.navigate(['/dashboard']);
        }
        if(this.router.url === '/mm'){
            console.log("publishing url")
        }
    }

}
