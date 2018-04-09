import { Component, OnInit, Input,Output,EventEmitter } from '@angular/core';
import { ActivatedRoute,Router,UrlSerializer } from '@angular/router';
import 'rxjs/add/operator/filter';
import { routerTransition } from '../router.animations';
import { fadeInAnimation } from '../fade-in.animation';
import { FormControl, FormGroup, FormArray, FormBuilder, Validators,FormArrayName } from '@angular/forms';
import { DataService } from '../services/data-service'; //Import dataservice file to get the hidden feeds
import { Global } from '../shared/global';//Import Global to use global variables in the feeds's local scope
import * as _ from 'lodash'
import { DatePipe,Location } from '@angular/common';
import { ArchiveService } from '../services/archive-service';//Import feed service to get feeds
import { Utilities } from '../shared';//Import utilities to perform sorting and filtering
import { DbConfig } from '../services/db-config';//Import to config db setup when the app loads
@Component({
  
  selector: 'app-mmpublish',
  templateUrl: './mmpublish.component.html',
  styleUrls: ['./mmpublish.component.scss'],
  animations: [routerTransition()]
})

export class MmpublishComponent implements OnInit {

p:any; //variable to store the current page nuber
pageheading:any;  //variable to store and display as page heading
feeds:any=[];          //variable to store feeds to display
feedstobechecked:any=[]; //variable to store the feeds of today to be checked
feedstobepublished:any=[];//variable to store the feeds of today to be published
checkForm:FormGroup;//variable to store the input of the checkbox form
boardname:any;//variable to store the input variable name
view:any;      //variable to store the view state
date:any;      //variable to store the state of dates to filters
user:any;     //variable to store the username
alertNofeeds:boolean=false;//alert variable to store boolean values if the given input dates has not feeds
  constructor(private datepipe:DatePipe,public variab:Global,public dataservice:DataService,public archiveService:ArchiveService,private route: ActivatedRoute,public util:Utilities,public router:Router,public formBuilder:FormBuilder,public  urlSerializer:UrlSerializer,public location:Location,public dbconfig:DbConfig) { }
  //On loading Component
  ngOnInit() {

    //checkbox form builder
      this.checkForm = this.formBuilder.group({
              feeds: this.formBuilder.array([])
      });
      console.log(this.checkForm);
    this.user =localStorage.getItem('name');
    
    //this.usersview = localStorage.getItem('view');
   
    this.view = localStorage.getItem('view') || null;


 //Access the query parameter and filter the feeds according to category
      this.route.params
            .subscribe(params => {
              var parsedDate = Date.parse(params.date);//parse the date to timestamp
               let isodate = new Date(parsedDate);//get the date by passing the timestamp to get the iso conversion
              this.archiveService.getPublishedFeeds(isodate.toISOString(),params.boardname).then(res=>{

                this.feeds=res;
               
              })
     });
   
  }
  //funvtion on selecting feeds
  onChange(email:string, isChecked: boolean) {
        var feedFormArray = <FormArray>this.checkForm.controls.feeds;

        console.log(feedFormArray,this.checkForm.get('checkboxes'));
        if(isChecked) {
          feedFormArray.push(new FormControl(email));
        } else {
          let index = feedFormArray.controls.findIndex(x => x.value == email)
          feedFormArray.removeAt(index);
        }
    }
  publish(){
    console.log("valled",this.checkForm.value,this.feedstobepublished);
    if(this.checkForm.value.feeds.length==0){
      var feeds = this.feedstobepublished;
    }
    else{
      feeds = _.union(this.feedstobepublished,this.checkForm.value.feeds)
    }
    var pub_date = new Date();
    
    let doc={
      'pub_date':pub_date.toISOString(),
      'boardname':this.boardname,
      'feeds':feeds
    }
    console.log(doc);
    var date = new Date();
    var urltree = this.router.createUrlTree(['mm',this.boardname,this.datepipe.transform(date, 'yyyyMMdd')]);
    var url = this.urlSerializer.serialize(urltree);
    let fullUrl = window.location.origin + this.location.prepareExternalUrl(url);
    console.log(fullUrl);
    /*this.archiveService.addFeed(doc).then(res=>{
      if(res['ok']==true){
        var date = new Date();
        var url = this.router.createUrlTree(['mm/'+this.boardname+'/'+this.datepipe.transform(date, 'yyyyMMdd')]).toString();
        console.log(url);
      }
    })*/
    /*const valueToStore = Object.assign({}, this.checkForm.value, {
          feeds: this.convertToValue('feeds'),
          
        });
        console.log(valueToStore);*/
   

  }
  convertToValue(key: string) {
    console.log(this.checkForm.value[key])
    return this.checkForm.value[key].map((x, i) => x && this[key][i]).filter(x => !!x);
  }


  //Function to handle view event from page-header component
  public handleView(childView:any){
    this.view= childView;

  }
  //Function to handle Date event from page-header component
  public handleDate(childDates:any){
    this.util.filterDate(childDates,this.variab.globalfeeds).then(res=>{
      //console.log(res);
      if(res['length'] == 0){
        this.alertNofeeds = true;
        setTimeout(() => this.alertNofeeds = false, 2000);
      }
      else{
        this.feeds = res;
      }
    })
  
  }
  //Function to handle clear Date event from page-header component
  handleClearDate(eve){
    if(eve == 'reset'){
      this.feeds = this.variab.globalfeeds;
    }
  }
  //Function to handle sort label like 'Latest','Oldest' feeds when clicked from page-header component
  handleSort(childSortLabel:any){
    var checkForCategory:any=[];
    if(childSortLabel === 'Latest'){
      //If input is latest sort the feeds in the descending order
      this.util.sortdescending(this.variab.globalfeeds).then(res=>{
        this.feeds = res;
      })
     
    }
    if(childSortLabel === 'Oldest'){
      //If input is oldest sort the feeds in the descending order
      this.util.sortascending(this.variab.globalfeeds).then(res=>{
        this.feeds = res;
      })
    }
  }
  //Function to handle refreshed feeds when clicked from page-header component
  handleRefresh(childrefresh:any){
    this.pageheading = 'Recent feeds'
    this.feeds = childrefresh;
  }
  //Function to close alerts
  public closeAlert() {
      this.alertNofeeds=false;
  }
   

}




