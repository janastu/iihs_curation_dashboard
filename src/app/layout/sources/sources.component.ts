import { Component, OnInit} from '@angular/core';
import { Global } from '../../shared/global';
import { CategoryService } from '../../services/category-service';
import { FeedService } from '../../services/feed-service';
import { Userservice } from '../../services/userservice';
import { routerTransition } from '../../router.animations';
@Component({
  selector: 'app-sources',
  templateUrl: './sources.component.html',
  styleUrls: ['./sources.component.scss'],
  animations: [routerTransition()]
})
export class SourcesComponent implements OnInit {
  catvalue;
  metadata:any=[];
  category:any;
  feedlink:any;
  createfeed:boolean=false;
  alertInvalid:boolean=false;
  constructor(public categoryService:CategoryService,public variab:Global,public feedService:FeedService,public userService:Userservice) { 
    
  }

  ngOnInit() {
    //this.feedService.getfrompouchdb();
    this.categoryService.getAll().then((result)=>{
      this.variab.categoryfeeds=result;
    })
  }
  onselectingcategory(category){
  	
  	this.catvalue=category;
  }
  addcontent(){
   /* let doc={
      category:value
    }
    this.categoryService.addcategory(doc);
    this.variab.categoryupdated.push({doc:doc})*/

      this.feedService.getNewsrackfeedsFirstTime(this.feedlink).then(res=>{
        console.log(res);
      if(res['length']!=0){
      this.metadata = res;
      this.category = this.metadata.categories[0];
      this.createfeed = true;
      console.log("value",this.metadata,this.createfeed);
      }
      else{
        this.alertInvalid=true;
        setTimeout(() => this.alertInvalid = false, 2000);
      }
    });
  	
  }
}
