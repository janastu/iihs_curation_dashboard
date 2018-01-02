import { Injectable,ViewChild } from '@angular/core';
import { Http,RequestOptions,Headers }       from '@angular/http';
import { JsonConvert } from './utilities';
import PouchDB from 'pouchdb';
import * as _ from 'lodash';
import { Settings } from './settings';
@Injectable()

export class Service {
  db:any;
  database:any;
  remote:any;
  username:any;
  password:any;
constructor(private http: Http, private jsonconvert:JsonConvert,private settings:Settings) {
  this.db = new PouchDB('feeds');
  console.log("setting",this.settings)
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

  //this.remote = 'http://localhost:5984/feeds';

 this.remote = this.settings.protocol+this.settings.host+':'+this.settings.port+this.settings.dbfeed;


  
     let options = {
       live: true,
       retry: true,
       continuous: true,
       auth:{
         username:this.settings.couchdbusername,
         password:this.settings.couchdbpassword
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

    var newsrack = 'http://newsrack.in/stories/iihs_blore/iihs_feeds_v4/1.json';

    this.http.get(newsrack).subscribe((response)=> {
    var res = response.text();
   var jsonobject = this.jsonconvert.parseJSON(res);
    
//  this.addtopouch(jsonobject['_nr_stories'],jsonobject['_nr_metadata']);

     resolve(jsonobject);
     }, (err) => {
      console.log(err);
      });
  });

   


  }
 addtopouch(feed,metadata){
console.log("result",feed[0]);


   
    feed.map(res=>{
      res.category = metadata.category_name;
      var chunks = res.date.split('.');

      var formattedDate = chunks[2]+'.'+chunks[1]+'.'+chunks[0];
      var checkdate = Date.parse(formattedDate);
      res.date = checkdate
      console.log("dateche",res,res.date);
      this.db.post(res, function callback(err, result) {

          if (!err) {
            console.log('Successfully posted a todo!',result);
          }
        });
    });

    
  }
  getcategoryfeeds(category){

  var url = this.settings.protocol+this.settings.host+':'+this.settings.port+this.settings.dbfeed+'/_design/feeds/_view/categoryfeeds?limit=20&key='+'"'+category+'"';
  console.log("url",url)
  //var url = 'http://localhost:5984/feeds/_design/feeds/_view/categoryfeeds?limit=20&key='+'"'+category+'"';
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
  getlatestfeeds(category){
   
    var d = new Date();
    var date = d.getTime();
    console.log(date)

   var url = this.settings.protocol+this.settings.host+':'+this.settings.port+this.settings.dbfeed+'/_design/feeds/_view/latestoldestcategory?&startkey=['+'"'+category+'"'+']&endkey=['+'"'+category+'"'+',{}]';
    //var url = 'http://localhost:5984/feeds/_design/feeds/_view/latestoldestcategory?&startkey=['+'"'+category+'"'+']&endkey=['+'"'+category+'"'+',{}]';

  return new Promise(resolve => {
    this.http.get(url).map(res=>res.json()).subscribe(result=> {
      console.log(result.rows)

     /* var changesdoc = result.results.map(res=>{
        if(res.doc.title){
          return res.doc;
        }
      })
      console.log(_.compact(changesdoc));
      var recentDocs = _.compact(changesdoc)*/

      resolve(result.rows);
    }, (err) =>{
      console.log(err);
    });
  });

    
  }
  getoldestfeeds(category){
   
    var d = new Date();
    var date = d.getTime();
    console.log(date)

    var url = this.settings.protocol+this.settings.host+':'+this.settings.port+this.settings.dbfeed+'/_design/feeds/_view/latestoldestcategory?&startkey=['+'"'+category+'"'+']&endkey=['+'"'+category+'"'+',{}]';
    //var url = 'http://localhost:5984/feeds/_design/feeds/_view/latestoldestcategory?&startkey=['+'"'+category+'"'+']&endkey=['+'"'+category+'"'+',{}]';

  return new Promise(resolve => {
    this.http.get(url).map(res=>res.json()).subscribe(result=> {
      console.log(result)

     /* var changesdoc = result.results.map(res=>{
        if(res.doc.title){
          return res.doc;
        }
      })
      console.log(_.compact(changesdoc));
      var recentDocs = _.compact(changesdoc)*/
      resolve(result.rows);
    }, (err) =>{
      console.log(err);
    });
  });

    
  }

 getrecentfeeds(){

     var check = this.settings.protocol+this.settings.host+':'+this.settings.port+this.settings.dbfeed+'/_changes?descending=true&limit=10&include_docs=true'
     //var check = 'http://localhost:5984/feeds/_changes?descending=true&limit=10&include_docs=true';

   return new Promise(resolve => {
     this.http.get(check).map(res=>res.json()).subscribe(result=> {
       //console.log(result.results)
       var changesdoc = result.results.map(res=>{
         if(res.doc.title){
           return res.doc;
         }
       })
       console.log(_.compact(changesdoc));
       var recentDocs = _.compact(changesdoc)
       resolve(recentDocs);
     }, (err) =>{
       console.log(err);
     });
   });

     
   }
 
 
}