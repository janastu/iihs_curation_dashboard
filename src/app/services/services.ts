import { Injectable,ViewChild } from '@angular/core';
import { Http }       from '@angular/http';
import { JsonConvert } from './utilities';
import PouchDB from 'pouchdb';

@Injectable()

export class Service {
  db:any;
  remote:any;
  username:any;
  password:any;
constructor(private http: Http, private jsonconvert:JsonConvert) {
  this.db = new PouchDB('feeds');

  this.remote = 'http://localhost:5984/feeds';
  this.username='admin';
  this.password='admin';
  
     let options = {
       live: true,
       retry: true,
       continuous: true,
       auth: {
          username: this.username,
          password: this.password
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

    
   
    feed.map(res=>{
      res.category = metadata.category_name;
      //console.log(res);
      this.db.post(res, function callback(err, result) {
          if (!err) {
            //console.log('Successfully posted a todo!',result);
          }
        });
    });

    
  }
  getfrompouch(){

   return new Promise(resolve => {
      this.db.allDocs({
        include_docs: true
      }).then(function (result) {
        // handle result
      // console.log('Successfully posted a todo!',result);
       
          resolve(result.rows); 
      }).catch(function (err) {
        console.log(err);
      });
    });
    
  }
 
}