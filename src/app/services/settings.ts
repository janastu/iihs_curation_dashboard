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
	port:any=5984;//couchdb port

	//host:any='login.test.openrun.net'; 
	host:any = 'localhost:5984';	//couchdb host
	dbfeed:any='/feeds'; //feeds database
	dbannotations:any='/iihs_annotation'; //annotations database
	dbboards:any='/boards';	//boards database
	couchdbusername:any='admin'; //couchdb username
	couchdbpassword:any='admin';	//couchdb password
	superloginserverUrl:any='http://192.168.1.30:3001' // super login server url


	
}