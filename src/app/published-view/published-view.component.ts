import { Component, OnInit } from '@angular/core';
import { Global} from '../shared';
import { HtmlParser } from '../shared/Utilities/html-parser';
import { ActivatedRoute,Router } from '@angular/router';
import { ArchiveService} from '../services/archive-service';
import { Utilities } from '../shared';//Import utilities to perform sorting and filtering
import * as _ from 'lodash';
@Component({
  selector: 'app-published-view',
  templateUrl: './published-view.component.html',
  styleUrls: ['./published-view.component.scss']
})
export class PublishedViewComponent implements OnInit {
displayPublishedfeeds:any=[];//Published feeds to display to copy to the mailer
statefeeds:any=[]; //variable to store the feeds state
mmurl:any;//published url to link to from the email
archivesurl:any;//variable to store archives url to navigate to the archives
alertnote:boolean=false;
  boards:any=[];
  groupname:any;
  constructor(public variab:Global,public util:Utilities,public html:HtmlParser,public route:ActivatedRoute,public archiveService:ArchiveService,public router:Router) { }

  ngOnInit() {
    this.groupname = localStorage.getItem('group');
     // this.displayPublishedfeeds = JSON.parse(localStorage.getItem('publishedfeeds'));
      //this.alertnote = true;
        //console.log(this.alertnote);
      //setTimeout(() => this.alertnote = false, 5000);
       //if(this.displayPublishedfeeds == null){
         this.route.params
                      .subscribe(params => {
                        var parsedDate = Date.parse(params.date);//parse the date to timestamp
                         let isodate = new Date(parsedDate);//get the date by passing the timestamp to get the iso conversion
                            //this.spinnerState=true;
                         if(params.date && params.boardname != '*'){
                           console.log(params.date,params.boardname)
                          this.archiveService.getPublishedFeeds(isodate.toISOString(),params.boardname).then(res=>{
                              console.log(res['value']);
                            //this.statefeeds = res['value'].feeds;
                             this.statefeeds.push({board: params.boardname, data:res['value'].feeds});

                              this.alertnote = true;
                              //console.log(this.alertnote);
                            setTimeout(() => this.alertnote = false, 2000);
                          })
                          /*this.archiveService.getJsonData(params.date,params.boardname).then(res=>{
                            console.log(res);
                            this.statefeeds = res['value'].feeds;
                             this.displayPublishedfeeds=this.statefeeds;
                          });*/
                        }
                      if(params.boardname == '*'){
                        this.archiveService.getPublishedboardsOnDates(isodate.toISOString()).then(res=>{
                          var boards:any=[];
                          var boardsGroup:any=[];
                          boards = res;
                          this.util.boardsOnGroup(this.groupname).then(res=>{
                            boardsGroup=res;
                            var groupBoards = boards.map(pubboard=>{
                                return boardsGroup.filter(groupboard=>{

                                  if(groupboard.key == pubboard.value){
                                    return pubboard;
                                  }
                                })

                            })
                            var boardNameGroup:any=[];
                            boardNameGroup = _.flatten(groupBoards);
                          //this.boards = res;
                          boardNameGroup.map(board=>{
                            this.statefeeds.length=0;
                            console.log(board.value);
                            this.archiveService.getPublishedFeeds(isodate.toISOString(),board.key).then(res=>{
                              console.log("board name feeds",res['value'].feeds,board.value);
                              //this.statefeeds = res['value'].feeds;
                              //this.statefeeds.push(res['value'].feeds);
                              console.log("stae",this.statefeeds);
                              this.util.sortdescending(_.flatten(res['value'].feeds)).then(res=>{
                                /*this.displayPublishedfeeds = */
                                this.statefeeds.push({board: board.key, data:res});
                                 console.log("alert",this.statefeeds);
                                  this.statefeeds.sort(function(a,b) {return (a.board > b.board) ? 1 : ((b.board > a.board) ? -1 : 0);} );

                                setTimeout(() => this.alertnote = false, 2000);
                              });

                            })
                          })
                        })
                      });
                      }


               });


      // }

  	  /* this.route.params
             .subscribe(params => {
               var parsedDate = Date.parse(params.date);//parse the date to timestamp
                let isodate = new Date(parsedDate);//get the date by passing the timestamp to get the iso conversion
                   //this.spinnerState=true;
                 /*this.archiveService.getPublishedFeeds(isodate.toISOString(),params.boardname).then(res=>{
                     //console.log(res['value']);
                   this.statefeeds = res['value'].feeds;
                    this.displayPublishedfeeds=this.statefeeds;

                 })*/
                 /*this.archiveService.getJsonData(params.date,params.boardname).then(res=>{
                   console.log(res);
                   this.statefeeds = res['value'].feeds;
                    this.displayPublishedfeeds=this.statefeeds;
                 });

      });*/

      this.mmurl=window.location.href;
      this.archivesurl=window.location.href+'/archives';
  }
  /*feedsFromBoards(boardname){
    console.log(boardname)
    this.route.params
                 .subscribe(params => {
                   var parsedDate = Date.parse(params.date);//parse the date to timestamp
                    let isodate = new Date(parsedDate);//get the date by passing the timestamp to get the iso conversion
    this.archiveService.getPublishedFeeds(isodate.toISOString(),boardname).then(res=>{
      console.log(res['value'].feeds);
      this.statefeeds = res['value'].feeds;
      //this.statefeeds.push(res['value'].feeds);
      this.util.sortdescending(_.flatten(this.statefeeds)).then(res=>{
        //this.displayPublishedfeeds = res;
         console.log("alert",this.displayPublishedfeeds);
        setTimeout(() => this.alertnote = false, 2000);
      });

    })
   });
  }*/

  //Function to close alerts
  public closeAlert() {
      this.alertnote=false;
  }

}
