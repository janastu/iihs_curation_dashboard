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
//Migrate to component service architecture
   groups:any=[];//global variable to store groups in global buffer
   //globalfeeds:any=[];//global variable to store feeds in global buffer
   //readlaterfeeds:any=[];//global variable to store readlater feeds in global buffer
   //recentlyread:any=[];//global variable to store recently read feeds in global buffer
   //boardupdated:any=[];//global variable to store boards in global buffer
   //categoryfeeds:any=[];//global variable to store categories in global buffer
   hiddenfeeds:any=[]; //global variable to store hidden feeds in global buffer
   //boardfeeds:any=[];//global variable to store board feeds in global buffer
   recentdocs:any=[];//global variable to store recent feeds in global buffer
  // annotations:any=[];//global variable to store board annotations in global buffer
   localfeeds:any;//global variable to store the pouchdb object for feeds
   localannotations:any;//global variable to store the pouchdb object for annotations
   localgroups:any;//global variable to store the pouchdb object for groups
   localboards:any;//global variable to store the pouchdb object for boards
   localarchives:any;//global variable to store the pouchdb object for archives
  constructor(public http: Http) {



  }

}
