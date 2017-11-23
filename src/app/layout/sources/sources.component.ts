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
    this.variab.categoryupdated.push({category:value})
    console.log(this.variab.categoryupdated);
  	
  }
}
