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
	protocol: any = environment.dbprotocol;

	//host:any='login.test.openrun.net';

	dbfeed:any=environment.dbhost+'/feeds_test'; //feeds database
	dbannotations: any = environment.dbhost +'/iihs_annotation'; //annotations database
	dbboards: any = environment.dbhost +'/boards';	//boards database
	dbgroups: any = environment.dbhost +'/groups';	//groups database
	dbarchives: any = environment.dbhost +'/archives'; //archives database
	dbusers: any = environment.dbhost +'/sl-users';//users database
	couchdbusername: any =environment.dbuser; //couchdb username
	couchdbpassword:any=environment.dbpassword;	//couchdb password
	superloginserverUrl:any= environment.dbprotocol+environment.authHost; // super login server url
    //superloginserverUrl:any='http://192.168.99.100:3000'
	feedparserUrl: any = environment.dbprotocol+environment.feedParserHost;  // super login  s erv er url

}
