import { Injectable,ViewChild } from '@angular/core';
import { Http,RequestOptions,Headers }       from '@angular/http';
import { JsonConvert } from './utilities';
import PouchDB from 'pouchdb';

@Injectable()

export class Service {
  db:any;
  database:any;
  remote:any;
  username:any;
  password:any;
constructor(private http: Http, private jsonconvert:JsonConvert) {
  this.db = new PouchDB('feeds');
  //this.database = new PouchDB('newfeeds');
  /*this.remote = 'http://couchdb.test.openrun.net/feeds';
    this.username='admin';
    this.password='admin';
    
       let options = {
         live: true,
         retry: true,
         continuous: true,
         "Authorisation":"Basic YWRtaW46Y291Y2hmb3JyZWxheDEyMw==",
         "Content-Type":"application/json"

       };
    
       this.database.sync(this.remote, options);
       */

  this.remote = 'http://localhost:5984/feeds';

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
  
     this.db.sync(this.remote, options);

  }

public getAll(){ 
    var msgurl = 'assets/example.json';
  /*  return new Promise(resolve => {
     this.http.get(msgurl).map(res => res.json()).subscribe(data => {
     
      console.log("Value is",data);
      resolve(data);
      }, (err) => {
       console.log(err);
       });
      });
*/
    
   return new Promise(resolve => {

    var newsrack = 'http://newsrack.in/stories/iihs_blore/iihs_feeds_v4/3.json';

    this.http.get(newsrack).subscribe((response)=> {
    var res = response.text();
   var jsonobject = this.jsonconvert.parseJSON(res);
    
  this.addtopouch(jsonobject['_nr_stories'],jsonobject['_nr_metadata']);
     resolve(jsonobject);
     }, (err) => {
      console.log(err);
      });
  });

   


  }
 addtopouch(feed,metadata){
console.log("result",feed[0]);
var f = feed[0];
this.database.post(f, function callback(err, result) {
  console.log(err);
    console.log("dbre",result,err);

          if (!err) {
            console.log('Successfully posted a todo!',result);
          }
        });
    
   
    /*feed.map(res=>{
      res.category = metadata.category_name;
      
      this.db.post(res, function callback(err, result) {

          if (!err) {
            console.log('Successfully posted a todo!',result);
          }
        });  
    });*/

    
  }
  getcategoryfeeds(category){
  var url = 'http://localhost:5984/feeds/_design/feeds/_view/categoryfeeds?key='+'"'+category+'"';
//console.log("cate in service",category)
   return new Promise(resolve => {
     this.http.get(url).map(res=>res.json()).subscribe(result=> {
       //console.log(result);
       resolve(result.rows);
     }, (err) =>{
       console.log(err);
     });
   });

    
  }
  getrecentfeeds(){

   return new Promise(resolve => {
     this.db.query(function(doc, emit) {
       if (doc.title) {
         emit(doc.date,doc);
       }
     }).then(function (result) {
       // handle result
      // console.log(result);
       resolve(result.rows);
     }).catch(function (err) {
       console.log(err);
     });
   });

    
  }
 
 
}