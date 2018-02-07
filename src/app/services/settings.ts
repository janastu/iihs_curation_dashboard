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

	host:any = environment.host;	//couchdb host
	dbfeed:any=':'+environment.couchdbport+'/feeds'; //feeds database
	dbannotations: any = ':'+environment.couchdbport+'/iihs_annotation'; //annotations database
	dbboards: any = ':'+environment.couchdbport+'/boards';	//boards database
	dbgroups: any = ':'+environment.couchdbport+'/groups';	//groups database
	dbusers: any = ':'+environment.couchdbport+'/sl-users';//users database
	couchdbusername: any =environment.couchdbusername; //couchdb username
	couchdbpassword:any=environment.couchdbpassword;	//couchdb password
	superloginserverUrl: any = environment.protocol+environment.host+':'+environment.superloginport; // super login server url
	feedparserUrl: any = environment.protocol+environment.host+':'+environment.feedParserport; // super login server url


}