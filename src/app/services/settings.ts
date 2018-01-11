import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { environment } from '../../environments/environment';

/*
  Generated class for the Varglobal provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class Settings{

	constructor(){
		
	}
	protocol:any='http://'; 

	//host:any='login.test.openrun.net'; 
	host:any = environment.host;	//couchdb host
	dbfeed:any='/feeds'; //feeds database
	dbannotations:any='/iihs_annotation'; //annotations database
	dbboards:any='/boards';	//boards database
	couchdbusername:any=environment.username; //couchdb username
	couchdbpassword:any=environment.password;	//couchdb password
	superloginserverUrl:any=environment.superLoginServerUrl // super login server url


}