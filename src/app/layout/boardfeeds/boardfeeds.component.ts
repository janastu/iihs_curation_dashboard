import { Component, OnInit } from '@angular/core';
import { DatePipe,Location } from '@angular/common';
import { routerTransition } from '../../router.animations';
import { ActivatedRoute,Router,UrlSerializer } from '@angular/router';
import 'rxjs/add/operator/filter';
import { DataService } from '../../services/data-service';//Import dataservice to fetch board feeds
import { ArchiveService } from '../../services/archive-service';//Import dataservice to fetch board feeds
import { ComponentsService } from '../../services/components-service';//Import dataservice to fetch board feeds
import { Global } from '../../shared';//Import Global to use global variables in the board feed's local scope
import { Utilities } from '../../shared';//Import utilities to perform sorting and filtering
import * as _ from 'lodash'
@Component({
  selector: 'app-boardfeeds',
  templateUrl: './boardfeeds.component.html',
  styleUrls: ['./boardfeeds.component.scss'],
  animations: [routerTransition()]
})
export class BoardfeedsComponent implements OnInit {
//Local Variable declarations
p:any;//variable to store the current page
feeds:any=[];          //Variable to store feeds to display
boardfeeds:any=[];          //Variable to store feeds to display
view:any;              //Variable to store the view state
date:any;              //Variable to store the state of dates to filters
boardname:any;         //Variable to store the board name to display in the page heading
user:any;              //Variable to store user name of the logged in user
publishedfeeds:any=[]; //Variable to sotre the values of already published feeds
spinnerState:boolean=false;//state variable to store the status of the spinner to display
spinnerstatedelete:boolean=false;
checkedfeeds:any=[]; //Variable to sotre the feeds that are checked
selectedAll:any;
alertNofeeds:boolean=false;//variable to store the boolean state for feeds exist or not
checkedtodelete:boolean=false;
publishingurl:any;
alertPublished:boolean=false;
 //state variable to store the status variable of delete button
  constructor(private datepipe:DatePipe,public  urlSerializer:UrlSerializer,public dataService:DataService,public variab:Global,private route: ActivatedRoute,public util: Utilities,public archiveService: ArchiveService,public router:Router,public location:Location,public componentsService:ComponentsService) { }
  //On loading Component
  ngOnInit() {

    //Get the user name from local storage and store in a local variable
    this.user =localStorage.getItem('name');
    this.view = localStorage.getItem('view');
     this.route.params
          .subscribe(params => {
            this.boardname = params.id;
            //console.log(params);
     })
    //Get the boardname from query parameters
    this.route.queryParams
         .subscribe(queryparams => {
           //console.log(params,"prams");
             this.p=0;
             this.feeds.length=0;//Clear the feeds array

           //Call service function to get board feeds by passing board name as parameter
             this.spinnerState=true; //Set the spinner state variable to true
              if(this.spinnerState == true){
                this.alertNofeeds = false;
              }
             //Fetching board feeds and is removed for code refactoring
             /* this.dataService.getboardfeeds(params.id).then(res=>{
              this.boardfeeds = res;
              console.log(this.boardfeeds, "board feeds");
              //this.handlePublished();
              //console.log(this.boardfeeds);
               //Function call to check for the deleted feeds:
               //

               console.log(this, this.boardfeeds);
               this.util.checkForDeletedFeeds(this.boardfeeds).then(res=>{

                 console.log(res, "respond");
                  this.util.sortdescending(res).then(sorted=>{
                    console.log(sorted, "sorted feeds");
                      if(this.variab.annotations.length>0){

                        //Get the deleted and feeds store and display using feeds variable
                        this.feeds = sorted;
                        if(this.feeds){
                          this.spinnerState=false;//Set the spinner state variable to false once feeds are fetched

                        }
                        //console.log(this.feeds.length);
                        this.alertNofeeds=false;//set alertnofeed  s value to false
                        if(this.feeds.length==0){
                          this.alertNofeeds=true;
                        }
                        console.log("if block");
                      }

                      else{
                        console.log("Else block");



                          //Get board annotations
                              this.dataService.getannotations().then(res=>{
                               this.variab.annotations=res;
                               console.log("vra",this.variab.annotations);
                               //Get the deleted and feeds store and display using feeds variable
                               this.feeds = sorted;
                               this.componentsService.getMessage().subscribe(res=>{
                                 //console.log("fees",res);
                                   if(res.type == 'hide'){
                                     this.feeds.splice(res.data,1);
                                   }
                               })
                               if(this.feeds){
                                 this.spinnerState=false;//Set the spinner state variable to false once feeds are fetched

                               }
                               //console.log(this.feeds.length);
                               this.alertNofeeds=false;//set alertnofeed  s value to false
                               if(this.feeds.length==0){
                                 this.alertNofeeds=true;
                               }
                              })

                          }


                 this.util.checkForPublished(sorted,this.boardname).then(res=>{
                  this.publishedfeeds=res;
                 });

                 })

               });
           });*/
          /* this.util.checkForPublished(sorted,this.boardname).then(res=>{
            this.publishedfeeds=res;
           });*/
          // var reswithtype = this.componentsService.getannotations();
           //console.log(reswithtype);

           //this.dataService.getannotations();
           //this.dataService.getdeletedfeeds();
           this.dataService.annotation$.subscribe((reswithtype:any=[])=>{
            //console.log("deleted docs",reswithtype);
             this.componentsService.addAnnotations('add',reswithtype.rows);
             //console.log(reswithtype,"reswithtype");
             //this.variab.annotations = reswithtype;

            //if(reswithtype.type == 'annotaion'){
              //console.log("anno",reswithtype.data);
            //}
            console.log("anno",queryparams.id);
             var feedsByBoard=reswithtype['rows'].map(feed=>{
               if (feed.value.label==queryparams.id) {
                 //console.log(feed,"resfeed");
                 return feed.value.target;
               }
             })
             this.boardfeeds = _.compact(feedsByBoard);
             this.util.checkForDeletedFeeds(this.boardfeeds).then(deleted=>{
               //this.dataService.dataSubject.next(res);
                 //console.log(res, "respond");
                  this.util.sortdescending(deleted).then(sorted=>{
                  //console.log(this.board, "sorted feeds");
                  this.util.checkForPublished(sorted,this.boardname).then(res=>{
                    this.publishedfeeds=res;
                    this.feeds = sorted;
                    ///console.log(this.publishedfeeds,"inter");
                //  });


                   this.componentsService.getMessage().subscribe(res=>{
                     //console.log("fees",deleted);
                       if(res.type == 'hide' || res.type == 'hideboard'){
                         this.feeds.splice(res.data,1);
                         //this.dataService.dataSubject.next(this.feeds);
                       }
                   })
                   if(this.feeds){
                     this.spinnerState=false;//Set the spinner state variable to false once feeds are fetched

                   }

                    this.alertNofeeds=false;//set alertnofeed  s value to false
                   if(this.feeds.length==0){
                     this.alertNofeeds=true;
                   }
                   //console.log(this.feeds,"publishedfeeds")
                   for (var i = 0; i < this.feeds.length; i++) {
                     this.feeds[i].Checked = false;
                    // this.checkedtodelete = this.selectedAll;
                   }
              });

           })
                })
              //}
           });

    });




  }
  //Function to handle published and non published feed
  /*public handlePublished(){
  //console.log(this.boardfeeds);
     this.util.getPublishedfeeds(this.boardfeeds,this.boardname).then(res=>{
       console.log(res);
     })
  }*/

  //Function to handle view event from page-header component
  public handleView(childView:any){
    this.view = childView;
  }
  //Function to handle Date event from page-header component
  public handleDate(childDates:any){
    this.util.filterDate(childDates,this.boardfeeds).then(res=>{
      this.feeds = res;
      console.log(this.feeds);
    })
  }

  //Function to handle sort label like 'Latest','Oldest' feeds when clicked from page-header component
  handleSort(childSortLabel:any){
    var checkForCategory:any=[];
    if(childSortLabel === 'Latest'){
        this.util.sortdescending(this.boardfeeds).then(res=>{
          this.feeds = res;
          console.log(this.feeds)
        })

    }
    if(childSortLabel === 'Oldest'){
      this.util.sortascending(this.boardfeeds).then(res=>{
        this.feeds = res;
      })

    }
  }
  //Function to handle clear Date event from page-header component
  handleClearDate(eve){
    if(eve == 'reset'){
      this.feeds = this.boardfeeds;
    }
  }
  //Function to handle checked Input values from the child view component
  handleCheckedInput(event){
    if (event.Checked) {
      // code...
      this.checkedtodelete = true;
    }

    //console.log(this.checkedtodelete,"checkedtodelete");
  }
  //Function to delete checked feeds
  deleteChecked(){
      this.spinnerstatedelete=true;
      this.checkedfeeds=this.feeds.filter(everyfeed=>{
        return everyfeed.Checked;
      })
      //console.log(this.checkedfeeds);
    this.checkedfeeds.map(feed=>{
      var index=this.boardfeeds.indexOf(feed)
       this.util.hide(feed.value,index).then(res=>{
         if(res['ok']==true){
           this.boardfeeds= this.boardfeeds.filter(item=> item.value._id!== feed.value._id);
           this.feeds=this.boardfeeds;
             this.util.checkForPublished(this.boardfeeds,this.boardname).then(res=>{
              this.publishedfeeds=res;
                //console.log()
             });
           this.selectedAll=false;
           this.spinnerstatedelete=false
         }
       });
    })
  }
  //function on select all
  onSelectAll() {
      //console.log(this.selectedAll)
      for (var i = 0; i < this.feeds.length; i++) {
        this.feeds[i].Checked = this.selectedAll;
        this.checkedtodelete = this.selectedAll;
      }
  }
  onpage(){
    window.scroll(0,0);
  }



  //Function called when clicked on publish
    publish(){
      //console.log(this.feeds,"boardfeeds")
      //console.log(this.checkedfeeds);
      var publishedfeeds = this.feeds.filter(feed=>{
        return feed.Checked;
      })

     console.log(publishedfeeds);

     var pub_date = new Date(); //get today's date
      var transform = this.datepipe.transform(pub_date, 'yyyy-MM-dd');//transform the date to the yyyy-mm-dd format
      let parsed = Date.parse(transform);//Parse the date to timestamp
      let isodate = new Date(parsed);//get the date by passing the transformed date
      //console.log(isodate);

     //Generating publishong url
      var urltree = this.router.createUrlTree(['mm',this.boardname,transform]);
      //this.datepipe.transform(pub_date, 'yyyy-MM-dd')]
      var url = this.urlSerializer.serialize(urltree);
      this.publishingurl = window.location.origin + this.location.prepareExternalUrl(url);

      //Data model for storing the published feeds
      let doc={
        'pub_date':isodate.toISOString(),
        'boardname':this.boardname,
        'feeds':publishedfeeds,
        'publishing_url':this.publishingurl,
        'modified_pub_date':pub_date,
        'pub_date_time':pub_date
      }

      this.archiveService.getPublishedFeeds(isodate.toISOString(),this.boardname).then(res=>{
        if(res['length'] == 0){

              this.archiveService.addFeed(doc).then(response=>{
                if(response['ok']==true){
                  //console.log("inadd",publishedfeeds);
                 // localStorage.setItem('publishedfeeds',JSON.stringify(publishedfeeds));
                     // window.open('#/')
                      this.alertPublished = true;
                      setTimeout(() => this.alertPublished = false, 5000);
                      this.ngOnInit();

                     //this.router.navigate(['/mm',this.boardname,transform]);
                    // window.open('#/mm/'+this.boardname+'/'+transform,'_blank');
                }
              });
        }
        else{
          //console.log(publishedfeeds);
          publishedfeeds.map(pubfeed=>{

            res['value']['feeds'].push(pubfeed);
          })
            res['value']['modified_pub_date']=pub_date;
            console.log(res['value']);
            //this.archiveService.postjsonfile(res,this.boardname,transform);
          this.archiveService.updatedatabase(res['value']).then(response=>{
            if(response['ok']==true){
                //console.log("inupdate",res['value']['feeds']);
               //localStorage.setItem('publishedfeeds',JSON.stringify(res['value']['feeds']))
                  this.alertPublished = true;
                  setTimeout(() => this.alertPublished = false, 5000);
                  this.ngOnInit();
                 //this.router.navigate(['/mm',this.boardname,transform]);
              // window.open('#/mm/'+this.boardname+'/'+transform,'_blank');
            }
          });

        }
      })



    }

}
