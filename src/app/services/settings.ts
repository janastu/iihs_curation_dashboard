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
	

		console.log('env superloginurl', environment.authHost);
	console.log('env host', environment.dbhost);
console.log('env host', environment.dbprotocol);



	}
	protocol: any = environment.dbprotocol;

	//host:any='login.test.openrun.net';
	
	dbfeed:any=environment.dbhost+':'+environment.dbPort+'/feeds'; //feeds database
	dbannotations: any = environment.dbhost +':'+environment.dbPort+'/iihs_annotation'; //annotations database
	dbboards: any = environment.dbhost +':'+environment.dbPort+'/boards';	//boards database
	dbgroups: any = environment.dbhost +':'+environment.dbPort+'/groups';	//groups database
	dbusers: any = environment.dbhost +':'+environment.dbPort+'/sl-users';//users database
	couchdbusername: any =environment.dbuser; //couchdb username
	couchdbpassword:any=environment.dbpassword;	//couchdb password
	superloginserverUrl:any= environment.dbprotocol+environment.authHost+':'+environment.authPort; // super login server url
    //superloginserverUrl:any='http://192.168.99.100:3000'
	feedparserUrl: any = environment.dbprotocol+environment.feedParserHost+':'+environment.feedParserPort;  // super login  s erv er url

}