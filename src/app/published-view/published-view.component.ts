import { Component, OnInit } from '@angular/core';
import { Global} from '../shared';
import { HtmlParser } from '../shared/Utilities/html-parser';
import { ActivatedRoute } from '@angular/router';
import { ArchiveService} from '../services/archive-service';
@Component({
  selector: 'app-published-view',
  templateUrl: './published-view.component.html',
  styleUrls: ['./published-view.component.scss']
})
export class PublishedViewComponent implements OnInit {
displayPublishedfeeds:any=[];//Published feeds to display to copy to the mailer
url:any;//published url to link to from the email
  constructor(public variab:Global,public html:HtmlParser,public route:ActivatedRoute,public archiveService:ArchiveService) { }

  ngOnInit() {
  	
    this.displayPublishedfeeds = JSON.parse(localStorage.getItem('publishedfeeds'));
    //console.log(this.displayPublishedfeeds);
  	this.route.queryParams.subscribe(params=>{
  		this.url=params.url;
        //console.log(params)
        
          
  	})
  }

}
