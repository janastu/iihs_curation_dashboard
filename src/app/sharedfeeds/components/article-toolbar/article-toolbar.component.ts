import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-article-toolbar',
  templateUrl: './article-toolbar.component.html',
  styleUrls: ['./article-toolbar.component.scss']
})
export class ArticleToolbarComponent implements OnInit {
icon:boolean=false;
  constructor() { }

  ngOnInit() {
  	console.log("article");
  }
  change(){
     this.icon=true;       
  }

}
