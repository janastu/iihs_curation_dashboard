import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sources',
  templateUrl: './sources.component.html',
  styleUrls: ['./sources.component.scss']
})
export class SourcesComponent implements OnInit {
catvalue;
categories:any=[
	{category:'Urban Water'},
	{category:'Urban Environment'},
	{category:'Urban Waste'},
	{category:'Urban Transport and Mobility'},
	{category:'UrbanInfrastructure'},
	{category:'Urban Economic Growth and Development'},
	{category:'Urban Power'},
	{category:'Urban Housing and Land'},
	{category:'Urban Heritage'},
	{category:'Urban Health'},
	{category:'AMRUT Smart Cities Mission'},
	{category:'Agriculture '},

];
  constructor() { }

  ngOnInit() {
  }
  onselectingcategory(category){
  	console.log(category);
  	this.catvalue=category;
  }
}
