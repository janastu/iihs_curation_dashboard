import { Component, OnInit, Input,Output,EventEmitter } from '@angular/core';
import { ActivatedRoute,Router,UrlSerializer } from '@angular/router';
import 'rxjs/add/operator/filter';
import { routerTransition } from '../../router.animations';
import { fadeInAnimation } from '../../fade-in.animation';
import { FormControl, FormGroup, FormArray, FormBuilder, Validators,FormArrayName } from '@angular/forms';
import { DataService } from '../../services/data-service'; //Import dataservice file to get the hidden feeds
import { Global } from '../../shared/global';//Import Global to use global variables in the feeds's local scope
import * as _ from 'lodash'
import { DatePipe,Location } from '@angular/common';
import { ArchiveService } from '../../services/archive-service';//Import feed service to get feeds
import { Utilities } from '../../shared';//Import utilities to perform sorting and filtering
@Component({
  
  selector: 'app-publish',
  templateUrl: './publish.component.html',
  styleUrls: ['./publish.component.scss'],
  animations: [routerTransition()]
})

export class PublishComponent implements OnInit {
isCopied1: boolean = false;//variable to store the status if the input value is copied or not
publishingurl:any;//variable to store the publishing url
p:any; //variable to store the current page nuber
pageheading:any;  //variable to store and display as page heading
feeds:any=[];          //variable to store feeds to display
feedstobechecked:any=[]; //variable to store the feeds of today to be checked
checkForm:FormGroup;//variable to store the input of the checkbox form
boardname:any;//variable to store the input variable name
view:any;      //variable to store the view state
date:any;      //variable to store the state of dates to filters
user:any;     //variable to store the username
alertPublished:boolean=false;//alert variable to store boolean values to alert feeds published
alertNofeeds:boolean=false;//alert variable to store boolean values to alert feeds published
  constructor(private datepipe:DatePipe,public variab:Global,public dataservice:DataService,public archiveService:ArchiveService,private route: ActivatedRoute,public util:Utilities,public router:Router,public formBuilder:FormBuilder,public  urlSerializer:UrlSerializer,public location:Location) { }
  //On loading Component
  ngOnInit() {

    //checkbox form builder
     /* this.checkForm = this.formBuilder.group({
              feeds: this.formBuilder.array([])
      });
      console.log(this.checkForm);*/
    this.user =localStorage.getItem('name');
    
    //this.usersview = localStorage.getItem('view');
   
    this.view = localStorage.getItem('view') || null;



 //Access the query parameter and filter the feeds according to category
      this.route.params
            .subscribe(params => {
             //console.log("para",params);
           //get the board feeds
           this.boardname=params.id;
           this.dataservice.getboardfeeds(params.id).then(res=>{
             //console.log(res);
            //Function call to check for the deleted feeds
            this.util.checkForDeletedFeeds(res).then(res=>{
             //Get the deleted feeds store and display using feeds variable
             this.feeds = res;
             
            });
           
           //get the board feeds of today's
           this.dataservice.gettodayBoardFeeds().then(res=>{
             var todaysFeeds:any=[];
             todaysFeeds = res;
               
                  var datefeed = this.feeds.map( (board, index) => {
                     
                     return  _.filter(todaysFeeds,function(o) { 

                       if(o.value._id===board.value._id){
                       return o  ; 
                     }
                     });

                  });
               
                  //this.feedstobepublished=_.flatten(datefeed);
                  //console.log("annoforboards",datefeed);
                  //Map Annos for Boards to return boolean array
                  //Returns example:[true,false,true] 
                  //Index of output == Index of label which means label[0] and label[1] 
                  //is active for above output
                 this.feedstobechecked  =  datefeed.map(anno=>{

                      if(anno[0]){
                          return true;
                       }
                        else{
                          return false;
                        
                      }
                  })

                
                
               
               //console.log("yeno",this.feedstobechecked);
              
           })
        });
     });
   
  }
  //funvtion on selecting feeds
  /*onChange(email:string, isChecked: boolean) {
        var feedFormArray = <FormArray>this.checkForm.controls.feeds;

        console.log(feedFormArray,this.checkForm.get('checkboxes'));
        if(isChecked) {
          feedFormArray.push(new FormControl(email));
        } else {
          let index = feedFormArray.controls.findIndex(x => x.value == email)
          feedFormArray.removeAt(index);
        }
  }*/
  publish(){
    //console.log(this.feeds);
    var feeds = this.feeds.filter(feed=>{
      return feed.Checked;
    })
    console.log(feeds);
    var pub_date = new Date(); //get today's date
    var transform = this.datepipe.transform(pub_date, 'yyyy-MM-dd');//transform the date to the yyyy-mm-dd format
    let parsed = Date.parse(transform);//Parse the date to timestamp
    let isodate = new Date(parsed);//get the date by passing the transformed date
    //console.log(isodate);
    let doc={
      'pub_date':isodate.toISOString(),
      'boardname':this.boardname,
      'feeds':feeds
    }
    //console.log(doc);
    
    this.archiveService.addFeed(doc).then(res=>{
      if(res['ok']==true){

       var urltree = this.router.createUrlTree(['mm',this.boardname,transform]);
       //this.datepipe.transform(pub_date, 'yyyy-MM-dd')]
       var url = this.urlSerializer.serialize(urltree);
       this.publishingurl = window.location.origin + this.location.prepareExternalUrl(url);
       console.log(this.publishingurl);
       this.alertPublished=true;
       setTimeout(() => this.alertPublished = false, 2000);
       //this.router.navigate(['/boardfeeds',this.boardname]);
      }
    });
   
   

  }
  /*convertToValue(key: string) {
    console.log(this.checkForm.value[key])
    return this.checkForm.value[key].map((x, i) => x && this[key][i]).filter(x => !!x);
  }*/


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
      this.alertPublished=false;
  }
   

}




