import { Component, OnInit } from '@angular/core';
import { FormBuilder,Validators, FormGroup} from '@angular/forms';
import { routerTransition } from '../../router.animations';
import { Global } from '../../shared'; //Import Global to use global variables in the dashboard's local scope
import { FeedService } from '../../services/feed-service';// Import Feed Service to fetch the recent feeds
import { Userservice } from '../../services/userservice';//Import UserService to get user subscribed feed names
import { ComponentsService } from '../../services/components-service';//Import UserService to get user subscribed feed names
import { Router } from "@angular/router";//Import router to navigate between components
import {NgbAlertConfig} from '@ng-bootstrap/ng-bootstrap';

import * as _ from 'lodash';
//import get from 'lodash-es/get'
@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss'],
    animations: [routerTransition()]
})
export class DashboardComponent implements OnInit {
    spinnerState:boolean=false;//state variable to store the status of the spinner to display
	  feeds:any=[]; //Local Variable to store recentfeeds
    categories:any=[]; //Local Variable to store recentfeeds
    user:any;     //Local Variable to store the user name
    alertupdated:boolean=false//alert variable to store the status of feeds updated
    alertupdating:boolean=false//alert variable to store the status of feeds updating
    constructor(public variab:Global,public service:FeedService,public router:Router,public userService:Userservice,public ngAlert:NgbAlertConfig,public componentsService:ComponentsService) {
    }

    ngOnInit() {

    this.user = localStorage.getItem('name');

         this.spinnerState=true;
       //Get recent feeds
        this.service.getrecentfeeds().then(res=>{

            this.variab.recentdocs=res;
            if(this.variab.recentdocs.length > 0) {
              this.variab.recentdocs.map(val=>{
                this.feeds.push({value:val});
                if(this.feeds){
                  this.spinnerState=false;
                }
              });
            }


         })

        //Get the user database url from user session
        //Get the user session object from local Storage and store it in the usersession variable
        var usersession = localStorage.getItem("superlogin.session");
        //Parse the usersession variable to JSON object and store in the jsonusersession variable
        var jsonusersession = JSON.parse(usersession);
        //Get the user db's url and store in the url variable
        let url = jsonusersession.userDBs.supertest;
        //Set the user db's url to another local Storage variable
         localStorage.setItem('url',url);

       //Get user subscribed feed names
        this.componentsService.getCategories().subscribe(res=>{
          //Store the user subscribed feed names in the Global variable
          this.categories=res;



        });




    }
    getDiffereceofFeeds(feedsarray,feedItems){



    //  if(feedsarray.length>0){
	     /*  var databasefeeds = feedsarray.map(value=>{

		         return value.value;

           });*/
            console.log(feedsarray.length,feedItems.length)
            var c = feedItems.filter(function(item) {
                //console.log(item);
              return !feedsarray.some(function(other) {
                //console.log(other)
                return item.title === other.value.title;
              });
            });
            console.log(c.length);
	   //var res = _.difference(feedItems,databasefeeds);
		   //console.log("result",res.length)

		     return c;


	  // }
  }
    //Click on a feed name to navigate to feeds page and get the feeds based on the feed name clicked
    oncategory(category){
        this.router.navigate(['/feeds'],{queryParams:{feedname:category}} )
    }


}
