import { Injectable,ViewChild } from '@angular/core';
import { Http,RequestOptions,Headers  }       from '@angular/http';
import PouchDB from 'pouchdb';
import { Settings } from './settings';
import {Global} from '../shared/global';
declare function emit(key: any,value:any): void;

@Injectable()

export class DataService {
  localdb:any;
  remote:any;
  username:any;
  password:any;
constructor(private http: Http,private settings:Settings,public variab:Global) { 

  }
  //Api service to add annotatioins to pouchdb
  addtodatabase(payload){
    console.log("called");
    return new Promise(resolve=>{
     this.variab.localannotations.post(payload, function callback(err, result) {
       if (!err) {
         //console.log('Successfully posted a todo!',result);
          resolve(result);
       }
       
     });
    });


  }
 
  //Api service to get board annotations
  getannotations(){ 
    

   return new Promise(resolve => {
   
     this.variab.localannotations.query('annotations/boardannotation', {
           
         }).then(function (result) {
         // console.log("res",result);
         resolve(result.rows);
       }).catch(function (err) {
         console.log(err);
       });
   });

  }
  //Api service to get read later annotations
  getreadlaterannotations(){ 
    

   return new Promise(resolve => {
   
     this.variab.localannotations.query('annotations/readlater', {
           
         }).then(function (result) {
         //console.log("res",result);
         resolve(result.rows);
       }).catch(function (err) {
         console.log(err);
       });
   });

  }
  //Api service to get rece  ntly read annotations
  getrecentlyreadannotations(){ 
    

   return new Promise(resolve => {
   
     this.variab.localannotations.query('annotations/recentlyread', {
           
         }).then(function (result) {
         // console.log("res",result);
         resolve(result.rows);
       }).catch(function (err) {
         console.log(err);
       });
   });

  }
  //Api service to get board feeds
  getboardfeeds(board){




    //var url = 'http://192.168.1.30:5984/iihs_annotation/_design/annotatedfeeds/_view/boardfeeds?key='+'"'+board+'"';

    return new Promise(resolve => {
    /*this.remote.replicate.to(this.localdb, {
       filter: '_view',
       view: 'annotatedfeeds/boardfeeds'
     }).then(res=>{
    console.log(res);
    if(res['ok']==true){
      this.variab.localannotations.query('annotatedfeeds/boardfeeds', {
           key:board
         }).then(function (result) {
        //

        console.log("res",result);
         resolve(result.rows);
       }).catch(function (err) {
         console.log(err);
       });
      //}
    //});*/
    });

  


  }
  //Api service to get readlater annotations and feeds
  getreadlater(usr){


    return new Promise(resolve => {
      /*this.remote.replicate.to(this.localdb, {
         filter: '_view',
         view: 'annotations/readlater'
       }).then(res=>{
      console.log(res);
      if(res['ok']==true){
    
      this.variab.localannotations.query('annotatedfeeds/readlaterfeeds', {
          key:usr
        }).then(function (result) {
       //console.log("res readlater",result);
        resolve(result.rows);
      }).catch(function (err) {
        console.log(err);
      });
      //}
     //});*/
    });


  }
  //Api Service to get recently read annotations and feeds
  getrecentlyread(usr){

   // var url = this.settings.protocol+this.settings.host+this.settings.dbannotations+'/_design/annotations/_view/recentlyread?key='+'"'+usr+'"';
  //var url =this.settings.protocol+this.settings.host+this.settings.dbannotations+'/_design/annotations/_view/recentlyread?key='+'"'+usr+'"';


    return new Promise(resolve => {
   /* this.remote.replicate.to(this.localdb, {
       filter: '_view',
       view: 'annotations/recentlyread'
     }).then(res=>{
    console.log(res);
    if(res['ok']==true){
      this.variab.localannotations.query('annotatedfeeds/recentlyreadfeeds', {
          key:usr
        }).then(function (result) {
       // console.log("res",result);
        resolve(result.rows);
      }).catch(function (err) {
        console.log(err);
      });
     //}
    //});*/
    });


  }
 
  //Api service to get deleted feeds
  getdeletedfeeds(usr){


    //var url = 'http://192.168.1.30:5984/iihs_annotation/_design/annotatedfeeds/_view/deletedfeeds?key[1]='+'"'+category+'"';
    return new Promise(resolve => {
    /*this.remote.replicate.to(this.localdb, {
       filter: '_view',
       view: 'annotatedfeeds/deletedfeeds'
     }).then(res=>{
    console.log(res);
    if(res['ok']==true){ 
      this.variab.localannotations.query('annotatedfeeds/deletedfeeds', {
          key:[usr]
          
        }).then(function (result) {
       console.log("res",result);
        resolve(result.rows);
      }).catch(function (err) {
        console.log(err);
      });
     //}
    //});*/
    });

  }
  //Api Service to get today's board feeds
  gettodayBoardFeeds(){
    var starttime  = new Date();
    starttime.setHours(0,0,0);
    var endtime  = new Date();
    endtime.setHours(23,59,0);
      return new Promise(resolve => {
        /*this.variab.localannotations.query('annotatedfeeds/boardfeedsoftoday', {
            startkey:starttime,
            endkey:endtime
            
          }).then(function (result) {
         //console.log("res",result);
          resolve(result.rows);
        }).catch(function (err) {
          console.log(err);
        });
       //}
      //});*/
      });

  }
  //Update database for deleted and modidifed
  updatedatabase(doc){
    this.variab.localannotations.put(doc).then(function (response) {
      // handle response
     // console.log(response)
    }).catch(function (err) {
      console.log(err);
    });

  }
  //Function to add the board feeds to a local json
  addFeedstoJson(data) {
    
     let headers = new Headers();
      headers.append( 'Content-Type', 'application/json')
       headers.append('Authorization', 'Basic '+btoa(this.settings.couchdbusername+':'+this.settings.couchdbpassword)); // ... Set content type to JSON
     let options = new RequestOptions({ headers: headers });
     this.http.post(this.settings.feedparserUrl,data,options).map(res=>res.json()).subscribe((response)=> {
       console.log(response);
     },(err)=>{
      console.log(err); 
   });
   }
}
