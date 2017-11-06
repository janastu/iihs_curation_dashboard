import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-createboardcomponent',
  templateUrl: './createboardcomponent.component.html',
  styleUrls: ['./createboardcomponent.component.scss']
})
export class CreateboardcomponentComponent implements OnInit {
boards:any=[];
IsVisible:boolean;
  constructor() {
  this.boards.push({
    title:'tech'
  },
  {
    title:'science'
  }); 
  //This will hide the DIV by default.
  this.IsVisible = false;
}

  ngOnInit() {

  }
  ShowHide(){
              //If DIV is visible it will be hidden and vice versa.
              this.IsVisible =  true;
              console.log("my div",this.IsVisible);
            }
  Cancel(){
              this.IsVisible = false;
          }
}
