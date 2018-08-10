import { Injectable,ViewChild } from '@angular/core';
import { Http,RequestOptions,Headers  } from '@angular/http';
import PouchDB from 'pouchdb';
import { Settings } from './settings';
import {Global} from '../shared/global';
declare function emit(key: any,value:any): void;

@Injectable()

export class DataService {
  localdb:any;
  remoteannos:any;
  user:any;
  password:any;
  auth:any;
constructor(private http: Http,private settings:Settings,public variab:Global) {
    this.user = localStorage.getItem('name');
        this.auth={
              username:this.settings.couchdbusername,
              password:this.settings.couchdbpassword
            }
    this.remoteannos = new PouchDB(this.settings.protocol+this.settings.dbannotations,{
              auth:this.auth,
              adapter:'http'
    });
  }
  //Api service to add annotatioins to pouchdb
  addtodatabase(payload){
    var self = this;
    //console.log("called",payload);
    return new Promise(resolve=>{
     this.remoteannos.post(payload, function callback(err, result) {
       if (!err) {
         //console.log('Successfully posted a todo!',result);
           if(result['ok'] == true){
             self.getannotations();
             self.getreadlaterannotations();
             self.getrecentlyreadannotations();
             //console.log(this.user);
             self.getreadlater(self.user);
             self.getrecentlyread(self.user);
             self.getdeletedfeeds(self.user);
              if (payload.label) {
                // code...
                self.getboardfeeds(payload.label[0]);
              }

           }

          resolve(result);
       }

     });
    });


  }

  //Api service to get board annotations
  getannotations(){


   return new Promise(resolve => {

     this.remoteannos.query('annotations/boardannotation', {
           //stale: 'update_after'
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

     this.remoteannos.query('annotations/readlater', {
          // stale: 'update_after'
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

     this.remoteannos.query('annotations/recentlyread', {
           //stale: 'update_after'
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
    if(res['ok']==true){*/
      this.remoteannos.query('annotatedfeeds/boardfeeds', {
           key:board,
           //stale: 'update_after'
         }).then(function (result) {
        //

        console.log("res",result);
         resolve(result.rows);
       }).catch(function (err) {
         console.log(err);
       });
      //}
    //});
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
      if(res['ok']==true){*/

      this.remoteannos.query('annotatedfeeds/readlaterfeeds', {
          key:usr,
        //  stale: 'update_after'
        }).then(function (result) {
       //console.log("res readlater",result);
        resolve(result.rows);
      }).catch(function (err) {
        console.log(err);
      });
      //}
     //});
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
    if(res['ok']==true){*/
      this.remoteannos.query('annotatedfeeds/recentlyreadfeeds', {
          key:usr,
        //  stale: 'update_after'
        }).then(function (result) {
       // console.log("res",result);
        resolve(result.rows);
      }).catch(function (err) {
        console.log(err);
      });
     //}
    //});
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
    if(res['ok']==true){ */
      this.remoteannos.query('annotatedfeeds/deletedfeeds', {

        }).then(function (result) {
       console.log("res",result);
        resolve(result.rows);
      }).catch(function (err) {
        console.log(err);
      });
     //}
    //});
    });

  }

  //Api Service to get today's board feeds
  gettodayBoardFeeds(){
    var starttime  = new Date();
    starttime.setHours(0,0,0);
    var endtime  = new Date();
    endtime.setHours(23,59,0);
      return new Promise(resolve => {
        this.remoteannos.query('annotatedfeeds/boardfeedsoftoday', {
            startkey:starttime,
            endkey:endtime,
            //stale: 'update_after'

          }).then(function (result) {
         //console.log("res",result);
          resolve(result.rows);
        }).catch(function (err) {
          console.log(err);
        });
       //}
      //});
      });

  }
  //Update database for deleted and modidifed
  updatedatabase(doc){
    var self = this;
    this.remoteannos.put(doc).then(function (response) {
      // handle response
     // console.log(response)
     if(response['ok']==true){
       self.getdeletedfeeds(self.user);
     }
    }).catch(function (err) {
      console.log(err);
    });

  }
/*  delete(feed){
		console.log(feed);
		return new Promise(resolve=>{
			this.remoteannos.remove(feed.value._id, feed.value._rev, function(err) {
   			if (err) {
      		return console.log(err);
   		} else {
				resolve({ok:true})
      	console.log("Document deleted successfully");
   		}
		});
	})
}
  //Function to remove docs from db based on views
  removeUnwanted(){
  	var scope = this;
  	this.remoteannos.query('annotations/deleteonview', {

  			  }).then(function (result) {
  			  		console.log("resfeeds",result.rows);
  						var storeinter:any=[];
  						storeinter = result.rows;
  						storeinter.map(removefeed=>{
  							scope.delete(removefeed);
  							/*this.remotefeeds.remove(removefeed.value._id, removefeed.value._rev, function(err) {
  				   			if (err) {
  				      		return console.log(err);
  				   		} else {
  								resolve({ok:true})
  				      	console.log("Document deleted successfully");
  				   		}
  						});
  						})
  			   }).catch(function (err) {
  			  		console.log(err);
  			});

  }*/
  //Function to add the board feeds to a local json
 /* addFeedstoJson(data) {

     let headers = new Headers();
      headers.append( 'Content-Type', 'application/json')
       headers.append('Authorization', 'Basic '+btoa(this.settings.couchdbusername+':'+this.settings.couchdbpassword)); // ... Set content type to JSON
     let options = new RequestOptions({ headers: headers });
     this.http.post(this.settings.feedparserUrl,data,options).map(res=>res.json()).subscribe((response)=> {
       console.log(response);
     },(err)=>{
      console.log(err);
   });
   }*/
}
