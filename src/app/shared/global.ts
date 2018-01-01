import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

/*
  Generated class for the Varglobal provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class Global {

   
   globalfeeds:any=[];
   readlaterfeeds:any=[];
   recentlyread:any=[];
   boardupdated:any=[];
   categoryfeeds:any=[];
   categoryupdated:any=[];
   hiddenfeeds:any=[]; 
   boardfeeds:any=[];
   recentdocs:any=[];
   annotations:any=[];
   globalcatname:any;  
   globalboardname:any;
  constructor(public http: Http) {
  


  }

}