import { Injectable,ViewChild } from '@angular/core';
import { Http }       from '@angular/http';
import PouchDB from 'pouchdb';

declare function emit(key: any,value:any): void;

@Injectable()

export class DataService {
  db:any;
  remote:any;
  username:any;
  password:any;
constructor(private http: Http) { 

    this.db = new PouchDB('iihs_annotation');
  this.remote = 'http://localhost:5984/iihs_annotation';
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


  addtodatabase(payload){
    
        this.db.post(payload, function callback(err, result) {
          if (!err) {
            console.log('Successfully posted a todo!',result);
            
          }
        });

  }
  getannotations(){
    
    return new Promise(resolve => {
      this.db.query(function(doc, emit) {
        
        if (doc.label && doc.motivation ==='tagging') {
         
          emit(doc.label,doc);
        }
      }).then(function (result) {
        // handle result
        //console.log(result);
        resolve(result.rows);
      }).catch(function (err) {
        console.log(err);
      });
    });

  }
  getboards(){
    function map(doc) {
      if(doc.label && doc.motivation === 'identifying')
      emit(doc.label,doc);
    }
    return new Promise(resolve => {
      this.db.query(map).then(function (result) {
         
        resolve(result.rows);
      }).catch(function (err) {
      console.log(err);
      });
    });
  }
  getboardfeeds(board){

    return new Promise(resolve => {
      this.db.query(function(doc, emit) {
        if (doc.label === board) {
          emit(doc.label,doc.target);
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
  getreadlater(usr){

    return new Promise(resolve => {
      this.db.query(function(doc, emit) {
        if (doc.motivation === 'bookmarking' && doc.creator === usr) {
          emit(doc.creator,doc);
        }
      }).then(function (result) {
        // handle result
        //console.log(result);
        resolve(result.rows);
      }).catch(function (err) {
        console.log(err);
      });
    });


  }
  getrecentlyread(usr){



    return new Promise(resolve => {
      this.db.query(function(doc, emit) {
        if (doc.motivation === 'tagging' && doc.creator === usr) {
          emit(doc.creator,doc);
        }
      }).then(function (result) {
        // handle result
       
        resolve(result.rows);
      }).catch(function (err) {
        console.log(err);
      });
    });


  }
  updatedoc(doc){
   this.db.put(doc).then(function (response) {
     // handle response
     console.log(response)
   }).catch(function (err) {
     console.log(err);
   });
  }

 
}