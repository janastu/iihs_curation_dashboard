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
	//port:any=;
	host: any = 'login.test.openrun.net';
	dbfeed: any = '/feeds';
	dbannotations:any='/iihs_annotation';
	dbboards:any='/boards';
	couchdbusername:any='admin';
	couchdbpassword:any='!!hs2018';
	superloginserverUrl: any = 'http://client.test.openrun.net:3001'



}