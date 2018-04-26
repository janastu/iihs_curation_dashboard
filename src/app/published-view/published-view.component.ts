import { Component, OnInit } from '@angular/core';
import { Global} from '../shared';
import { HtmlParser } from '../shared/Utilities/html-parser';
import { ActivatedRoute,Router } from '@angular/router';
import { ArchiveService} from '../services/archive-service';
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

  constructor(public variab:Global,public html:HtmlParser,public route:ActivatedRoute,public archiveService:ArchiveService,public router:Router) { }

  ngOnInit() {
      
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
    this.displayPublishedfeeds = JSON.parse(localStorage.getItem('publishedfeeds'));
      this.mmurl=window.location.href;
      this.archivesurl=window.location.href+'/archives';
  }

}
