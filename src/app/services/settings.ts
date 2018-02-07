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
	
	console.log("ENv files",environment.couchdbusername,environment.superloginport);
	

	}
	protocol: any = environment.protocol;

	//host:any='login.test.openrun.net';
	host:any = environment.couchdbport;	//couchdb host
	dbfeed:any='/feeds'; //feeds database
	dbannotations: any = '/iihs_annotation'; //annotations database
	dbboards: any = '/boards';	//boards database
	dbgroups: any = '/groups';	//groups database
	dbusers: any = '/sl-users';//users database
	couchdbusername: any =environment.couchdbusername; //couchdb username
	couchdbpassword:any=environment.couchdbpassword;	//couchdb password
	superloginserverUrl: any = environment.superloginport; // super login server url
	feedparserUrl: any = environment.feedParserport; // super login server url

}