import { Component, OnInit} from '@angular/core';
import { Global } from '../../shared/global';
import { CategoryService } from '../../services/category-service';
@Component({
  selector: 'app-sources',
  templateUrl: './sources.component.html',
  styleUrls: ['./sources.component.scss']
})
export class SourcesComponent implements OnInit {
  catvalue;


  constructor(public categoryService:CategoryService,public variab:Global) { 
    
  }

  ngOnInit() {
    this.categoryService.getAll().then((result)=>{
      this.variab.categoryfeeds=result;
    })
  }
  onselectingcategory(category){
  	
  	this.catvalue=category;
  }
  addcontent(value){
    let doc={
      category:value
    }
    this.categoryService.addcategory(doc);
    this.variab.categoryupdated.push({doc:doc})
    console.log(this.variab.categoryupdated);
  	
  }
}
