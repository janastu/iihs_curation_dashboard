import { Injectable,ViewChild } from '@angular/core';
import { Http }       from '@angular/http';
import { JsonConvert } from './utilities';
import PouchDB from 'pouchdb';

@Injectable()

export class Service {
  db:any;
constructor(private http: Http, private jsonconvert:JsonConvert) { 

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

    var db = new PouchDB('allfeeds');
   
    feed.map(res=>{
      res.category = metadata.category_name;
      console.log(res);
      db.post(res, function callback(err, result) {
          if (!err) {
            //console.log('Successfully posted a todo!',result);
          }
        });
    });

    
     //this.getfrompouch();
  }
  getfrompouch(){
    var db = new PouchDB('allfeeds');
   return new Promise(resolve => {
      db.allDocs({
        include_docs: true
      }).then(function (result) {
        // handle result
        console.log('Successfully posted a todo!',result);
        console.log(result);
          resolve(result.rows); 
      }).catch(function (err) {
        console.log(err);
      });
    });
    
  }
  /*addtodatabase(payload){
    this.db = new PouchDB('feeds');
    this.db.post(payload, function callback(err, result) {
          if (!err) {
            console.log('Successfully posted a todo!',result);
          }
        });

  }*/
 
}