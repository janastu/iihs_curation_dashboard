import { Injectable,ViewChild } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import superlogin from 'superlogin-client';
import PouchDB from 'pouchdb';
import {Settings} from './settings'
declare function emit(key: any,value:any): void;
@Injectable()
export class Userservice {
  db:any;
  remote:any;
  username:any;
  password:any;
  user:any;
//userservicedomain:any='http://192.168.1.15:3001';
//userserviceendpoints:any={register:'/auth/register',login:'/auth/login'}

constructor(private http: Http,private settings:Settings) {
  /*this.db = new PouchDB('sl-users');
  this.remote = 'http://localhost:5984/sl-users';
   this.username='admin';
   this.password='admin';
   
      let options = {
        live: true,
        retry: true,
        continuous: true,
        auth:{
          username:this.username,
          password:this.password
        }
      };
   
      this.db.sync(this.remote, options);*/
   

   var config:any = {
      serverUrl: this.settings.superloginserverUrl,
      // The base URL for the SuperLogin routes with leading and trailing slashes (defaults to '/auth/')
      baseUrl: '/auth/',
      // A list of API endpoints to automatically add the Authorization header to
      // By default the host the browser is pointed to will be added automatically
      endpoints: ['api.example.com'],
      // Set this to true if you do not want the URL bar host automatically added to the list
      noDefaultEndpoint: false,
      // Where to save your session token: localStorage ('local') or sessionStorage ('session'), default: 'local'
      storage: 'local',
      // The authentication providers that are supported by your SuperLogin host
      providers: ['facebook', 'twitter'],
      // Sets when to check if the session is expired. 'stateChange', 'startup' or nothing.
      // 'stateChange' checks every time $stateChangeStart or $routeChangeStart is fired
      // 'startup' checks just on app startup. If this is blank it will never check.
      checkExpired: 'stateChange',
      // A float that determines the percentage of a session duration, after which SuperLogin will automatically refresh the
      // token. For example if a token was issued at 1pm and expires at 2pm, and the threshold is 0.5, the token will
      // automatically refresh after 1:30pm. When authenticated, the token expiration is automatically checked on every
      // request. You can do this manually by calling superlogin.checkRefresh(). Default: 0.5
      refreshThreshold: 0.5
    };

    superlogin.configure(config);
    this.user = localStorage.getItem("name");
  
    /*PouchDB.plugin(Auth)
    this.db.useAsAuthenticationDB()
    .then(function () {
      

    });*/

  }


public adduser(user){
	console.log("usr",user);
  return new Promise(resolve => {
    superlogin.register(user).then(function (response) {
      console.log(response);
    resolve(response);
    },(err)=>{
      resolve(err);
    });
  });
  
   
   
}
public login(credentials){
    console.log("usr",credentials);
  /*return new Promise(resolve => {  
    this.db.logIn(credentials.username,'secret')
    .then(function (response) {
      resolve(response);
    });
  });*/
return new Promise(resolve => { 
  superlogin.login(credentials).then((response)=>{
    console.log(response);
    resolve(response);
  },(err)=>{
   resolve(err);
    console.log(err);
  });
});

}
getUserSubscriptions(){
  var usersession = localStorage.getItem("superlogin.session")
  var jsonusersession = JSON.parse(usersession);
  console.log(jsonusersession)
  let url = jsonusersession.userDBs.supertest+'/_all_docs?include_docs=true';

  let headers = new Headers({ 'Content-Type': 'application/json','Authorization':'Basic YWRtaW46YWRtaW4=' }); // ... Set content type to JSON
  let options = new RequestOptions({ headers: headers });
  return new Promise(resolve => {
        this.http.get(url,options).map(res=>res.json()).subscribe((response)=> {
          
          console.log("user",response);
          resolve(response.rows);
        }, (err) => {
          console.log(err);
        }); 

  });

}
 




}