
import { Injectable,ViewChild } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import superlogin from 'superlogin-client';
import PouchDB from 'pouchdb';
import {Settings} from './settings'
declare function emit(key: any,value:any): void;
@Injectable()
export class Userservice {
user:any;

constructor(private http: Http,private settings:Settings) {

  //this.db = new PouchDB('userdb');





//Configurations for user registration and login
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
      checkExpired: 'startup',
      // A float that determines the percentage of a session duration, after which SuperLogin will automatically refresh the
      // token. For example if a token was issued at 1pm and expires at 2pm, and the threshold is 0.5, the token will
      // automatically refresh after 1:30pm. When authenticated, the token expiration is automatically checked on every
      // request. You can do this manually by calling superlogin.checkRefresh(). Default: 0.5
      refreshThreshold: 0.5
    };

    superlogin.configure(config);

    this.user = localStorage.getItem("name");



  }
  //Superlogin Api service to reset pasword
public resetPassword(token,pwd){


  let doc = {
    token: token,
   password:pwd,
    confirmPassword:pwd
  };

  return new Promise(resolve => {
    superlogin.resetPassword(doc).then(function(response) {
      //console.log("asd", response);
      resolve(response );
      },(err)=>{
         console.log(err);
        resolve(err);
      });
    });

}
//Superlogin Api service to send reset link on forget password
public onforget(email)
{

return new Promise(resolve => {
    superlogin.forgotPassword(email).then(function (response) {
    //console.log("asd", response);
    resolve(response );
    },(err)=>{
       console.log(err);
      resolve(err);
    });
  });
}
//Superlogin Api service to add a user
public adduser(user){
	//console.log("usr",user);
  return new Promise(resolve => {
    superlogin.register(user).then(function (response) {

    resolve(response);
    },(err)=>{
      console.log(err);
      resolve(err);
    });
  });



}
//Superlogin Api service to send group invitation mail
public sendConfirmEmail(email,groupname,type,regOrlogin)
{
  var status;
  //console.log("Called to msg");
   return new Promise(resolve => {
     var emailurl = this.settings.superloginserverUrl+'/sendemail?email='+email+'&groupname='+groupname+'&type='+type+'&regOrlogin='+regOrlogin;
       //console.log(newsrack);
   this.http.get(emailurl).subscribe((response) => {
     //console.log("sd",response.ok);
     status = response.ok;

     resolve(status);
        });
    });



}
//Superlogin Api service to validate the email
public validateEmail(email){
  return new Promise(resolve => {
    superlogin.validateEmail(email).then(res=>{
      //console.log(res);
      resolve(res);
    },(err)=>{
      resolve(err);
      //console.log(err);
    })
  });
}
//Superlogin Api service to login
public login(credentials){

return new Promise(resolve => {
  superlogin.login(credentials).then((response)=>{
    //console.log(response);
    resolve(response);
  },(err)=>{
   resolve(err);
    //console.log(err);
  });
});

}
 //Superlogin Api service to logout
logout(){
  superlogin.logout('message').then(res=>{
    console.log(res);
  })
}
//Api service to get the user subscriptions
getUserSubscriptions(){
  let url = localStorage.getItem('url');
 // console.log("url",url);

// let url = 'http://localhost:5984/supertest$vinutha/_all_docs?include_docs=true'

  let headers = new Headers();
  headers.append( 'Content-Type', 'application/json')
  headers.append('Authorization', 'Basic '+btoa(this.settings.couchdbusername+':'+this.settings.couchdbpassword)); // ... Set content type to JSON
  let options = new RequestOptions({ headers: headers});
 // options.cache=true;
  //console.log("auth",options);
  return new Promise(resolve => {
      if(url){
        this.http.get(url+'/_all_docs?include_docs=true',options).map(res=>res.json()).subscribe((response)=> {
          //console.log(response)
          resolve(response.rows);
        }, (err) => {
          console.log("er",err);
        });
      }
      else{
        console.log("usernot loggedif");

      }
  });

}
//Api service to get email of all users
getemail(){
  var url = this.settings.protocol+this.settings.dbusers+'/_design/auth/_view/email';
   //console.log(url);
  return new Promise(resolve => {
        this.http.get(url).map(res=>res.json()).subscribe((response)=> {

          //console.log("users",response);
          resolve(response.rows);
        }, (err) => {
          console.log(err);
        });

  });
}
//Api service to get all users documents
getusers(){
  var url = this.settings.protocol+this.settings.dbusers+'/_all_docs';
   //console.log(url);
  return new Promise(resolve => {
        this.http.get(url).map(res=>res.json()).subscribe((response)=> {

          //console.log("users",response);
          resolve(response.rows);
        }, (err) => {
          console.log(err);
        });

  });


}
//Api service to get document of a particular user by passing his id
getAuser(user){
  var url = this.settings.protocol+this.settings.dbusers+'/'+user;
   //console.log(url);
  return new Promise(resolve => {
        this.http.get(url).map(res=>res.json()).subscribe((response)=> {

          //console.log("users",response);
          resolve(response);
        }, (err) => {
          console.log(err);
        });

  });


}
//Api service to update a user's document
updateAuser(user){
  //console.log(user)
  var url = this.settings.protocol+this.settings.dbusers+'/'+user._id;
 // console.log(url)
  let headers = new Headers();
   headers.append( 'Content-Type', 'application/json')
   headers.append('Authorization', 'Basic '+btoa(this.settings.couchdbusername+':'+this.settings.couchdbpassword)); // ... Set content type to JSON
  let options = new RequestOptions({ headers: headers});

        this.http.put(url,user,options).map(res=>res.json()).subscribe((response)=> {

          console.log("user",response);
         // resolve(response.rows);
        }, (err) => {
          console.log(err);
        });

}
//Api service to call newsrack and pull the recent feeds of the user's subcscriptions
pullnewFeeds(catName,last){
  console.log(last)
var date = new Date();
//var last = new Date(date.getTime() - (3 * 24 * 60 * 60 * 1000));
  let url = localStorage.getItem('url');
  return new Promise(resolve=>{
    if(url){
      var feedparserurl = this.settings.feedparserUrl+'/updatedfeeds?channel='+catName+'&date='+last.toISOString();
      console.log(feedparserurl);
      this.http.get(feedparserurl).map(res=>res.json()).subscribe((response)=> {
           console.log("response",response);
         resolve(response);
      },(err)=>{
        console.log(err);
      resolve(err);

      });
    }
    else{

    }

  });


}





}
