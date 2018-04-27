import { Component, OnInit,Input } from '@angular/core';
import { NgbDropdownConfig} from '@ng-bootstrap/ng-bootstrap';
import { NgbDropdown} from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder,Validators, FormGroup} from '@angular/forms';
import { CategoryService } from '../../../services/category-service';
import { FeedService } from '../../../services/feed-service';
import { Userservice } from '../../../services/userservice';
import { Global } from '../../../shared/global';
import * as _ from 'lodash';
import {NgbAlertConfig} from '@ng-bootstrap/ng-bootstrap';
@Component({
  selector: 'app-create-feed',
  templateUrl: './create-feed.component.html',
  styleUrls: ['./create-feed.component.scss']
})
export class CreateFeedComponent implements OnInit {

feedForm:FormGroup;//variable of type form to store the feed form
feedname = this.formBuilder.control('', [Validators.required]);//variable to store the feedname value typed in the form
visible:boolean;//variable to store the status of showing createfeed block
labelForFeeds:any=[];//variables to store the index of feednames
feedsnames:any=[];//variable to store the feed names
followstatus:boolean=false;//boolean variable to store the status of the feed following or not
alertexists:boolean=false;
alertempty:boolean=false;
user:any;     //variable to store the username
queryString:any;//variable to store the input given to find a feed name
@Input('data') data:any;
@Input('url') url:any;
  constructor(public ngconfig:NgbDropdownConfig,public formBuilder: FormBuilder,public categoryservice:CategoryService,public variab:Global,public feedService:FeedService,public userservice:Userservice,public ngAlert:NgbAlertConfig) {
}

ngOnChanges(){
    this.user = localStorage.getItem('name');
    //get the feed name value from the form
    this.feedForm = this.formBuilder.group({
      feedname: this.feedname
    });
   

    //Check for link is added to a feedname and user subscriptions
    var linkExists = this.variab.categoryfeeds.map(link=>{
      
      var checkForLink = link.doc.metadata.map(everylink=>{
          //console.log("folloew",everylink)
        if(everylink.link === this.url){
          this.followstatus=true;
          
          return true;
        }
      })
      return _.compact(checkForLink);
    })
    //Map link for feeds to return boolean array
    //Returns example:[true,false,true] 
    //Index of output == Index of label which means label[0] and label[1] 
    //is active for above output
    this.labelForFeeds = linkExists.map(link=>{
      if(link[0]){
        return true;
      }
      else{
        return false;
      }
    })
}
  ngOnInit() {
    this.userservice.getUserSubscriptions().then(res=>{
      this.feedsnames = res;
    });
    //Check for link is added to a feedname and user subscriptions
    var linkExists = this.variab.categoryfeeds.map(link=>{
      
      var checkForLink = link.doc.metadata.map(everylink=>{
          //console.log("folloew",everylink.link,this.url)
        if(everylink.link === this.url){
          this.followstatus=true;
         // console.log(this.followstatus);
          return true;
        }
      })
      return _.compact(checkForLink);
    })
    //Map link for feeds to return boolean array
    //Returns example:[true,false,true] 
    //Index of output == Index of label which means label[0] and label[1] 
    //is active for above output
    this.labelForFeeds = linkExists.map(link=>{
      if(link[0]){
        return true;
      }
      else{
        return false;
      }
    })
     


  }
  //Create a new feed name and add the feed name and metadata to user subscriptions
 createfeed(i){
   var date = new Date();
   
   //Data model of the user subscription
   let doc={
         "feedname":this.feedname.value,
         "metadata":[this.data],
         "lastmodified":date.getTime()
        }

     //Check if entered feed name is empty
     if(this.feedname.value === ''){
       console.log("feedname cant be empty");
       this.alertempty = true;
       this.ngAlert.type = 'warning';
       setTimeout(() => this.alertempty = false, 2000);
     }
     
     else{
       var toCheckrepeatFeednames:any =[];
       var feednameExists :any = 0;
        
       this.feedsnames.map(feedname=>{
          if(this.feedname.value === feedname.doc.feedname){
            //console.log("boardname exists");
            feednameExists = 1; 
          }
        })
       //Check if feedname already exists in the user subscriptions
       if(feednameExists == 1){
         console.log("exit");
         this.alertexists = true;
         this.ngAlert.type = 'warning';
         setTimeout(() => this.alertexists = false, 2000);
       }
       //Add the feed model to the database
       if(feednameExists == 0){
         console.log("add");
         this.feedService.addFeed(doc).then(res=>{
               if(res['ok'] == true){
                 this.variab.categoryfeeds.push({doc:doc}); 
                
                 this.visible = false;
                 this.followstatus = true;
                 this.alertempty = false;
                 this.alertexists = false;
               }
         })
       }
     
       
       

     
   }
   
   
 }
 //Save the feed metadata and link  to a already feed name 
 addtofeed(feed,i){

 	var update:any;//update status variable

//Check if the feedname already exists in the database
   var checkForFeedname = this.variab.categoryfeeds.map(name=>{
     
        if(name.doc.feedname === feed){
          update = 1;
         }
         else{
           update = 0;
       
         }
        
     //If the feedname exists then update the already existing doc with the new feed link 
   
     if(update == 1){
         name.doc.metadata.push(this.data);
         this.feedService.update(name.id,name.doc)
         this.labelForFeeds[i]=true;
        }

   })

 this.followstatus = true;
 }
 cancelfeed(){
   this.visible = false;
   this.alertempty = false;
   this.alertexists = false;
 }
 removefromboard(i){
    this.labelForFeeds[i]=false;
  }
  public closeAlert() {
      this.alertexists=false;
      this.alertempty= false;
      
  }

  
}
