import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

/*
  Generated class for the Varglobal provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class Settings{
	protocol:any='http://';
	port:any=5984;
	host:any='localhost';
	dbfeed:any='/feeds';
	dbannotations:any='/iihs_annotation';
	dbboards:any='/boards';
	couchdbusername:any='admin';
	couchdbpassword:any='admin';
	superloginserverUrl:any='http://localhost:3001'


	
}