import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-article-toolbar',
  templateUrl: './article-toolbar.component.html',
  styleUrls: ['./article-toolbar.component.scss']
})
export class ArticleToolbarComponent implements OnInit {
bookmarkicon:boolean=false;
staricon:boolean=false;
boards:any=[];
visible:boolean;

  constructor() { 
    this.boards.push({
      title:'tech',
      status:'false'
    },
    {
      title:'science',
      status:'false'
    }); 
    //s will hide the DIV by default.

   
  }

  ngOnInit() {

  }
  cancelboard(){
    this.visible=false;
  }
  savetoboard(i){
    
    this.boards[i].status = 'true';
    console.log(i,this.boards[i].status);
    
  }
  removefromboard(i){
    
  this.boards[i].status = 'false';
  }

}
