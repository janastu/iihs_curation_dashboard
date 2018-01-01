import { Component, OnInit } from '@angular/core';
import { FormBuilder,Validators, FormGroup} from '@angular/forms';
import { routerTransition } from '../../router.animations';
import { Service } from '../../services/services';
import { DataService } from '../../services/data-service';
import { Global } from '../../shared';
import { ComponentsService } from '../../services/components-service';
import { Userservice } from '../../services/userservice';
import { CategoryService } from '../../services/category-service';
import { Router } from "@angular/router";
//import { SpinnerService } from 'angular-spinners';
@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss'],
    animations: [routerTransition()]
})
export class DashboardComponent implements OnInit {
	feeds:any=[];
    user:any;
    imgstatus:number=0;
    constructor(/*public spinnerService: SpinnerService,*/public service:Service,public dataservice:DataService,public variab:Global,public componentsService:ComponentsService,public categoryService:CategoryService,public router:Router,public userService:Userservice) {
    }

    ngOnInit() {

    this.user = localStorage.getItem('name');
        this.dataservice.getreadlater(this.user).then(result=>{

            this.variab.readlaterfeeds=result;
           
        });
        this.dataservice.getrecentlyread(this.user).then(result=>{
            //console.log(result);
            this.variab.recentlyread=result;
        });
        this.service.getrecentfeeds().then(res=>{
            //document.getElementById('loading').style.display = 'none';
            this.variab.recentdocs=res;
            this.variab.recentdocs.length = 0
            if(this.variab.recentdocs.length == 0) {
               // code...
               /*console.log("len em",this.variab.recentdocs.length);
               //this.spinnerService.show('mySpinner');
               this.imgstatus == 1;*/
               document.getElementById('loading').style.display = 'none';
             }
             else {
               //this.spinnerService.hide('mySpinner');
               console.log("nt em",this.variab.recentdocs.length);
               this.variab.recentdocs.map(val=>{
               this.feeds.push({value:val});
               });
             }
            
         });
        /*this.service.getlatestfeeds().then(res=>{
            this.feeds=res;
        });*/

        this.service.getAll().then(res=>{
            console.log(res);
        })

        this.categoryService.getfrompouch().then((result)=>{
            this.variab.categoryupdated=result;
        });
    }
    oncategory(category){
        this.router.navigate(['/feeds'],{ queryParams: { category } })
          this.service.getcategoryfeeds(category).then(res=>{
              this.variab.globalfeeds=res;
              this.variab.globalcatname = category;
                     console.log(res);
               //this.componentsService.alert(category,res); 
        
        });
    }

    
}
 
