import { Injectable,ViewChild } from '@angular/core';
import { Http }       from '@angular/http';
import PouchDB from 'pouchdb';

declare function emit(key: any,value:any): void;

@Injectable()

export class DataService {
  db:any;
constructor(private http: Http) { 

    this.db = new PouchDB('iihs_annoation');

  }


  addtodatabase(payload){
   
    
        this.db.post(payload, function callback(err, result) {
          if (!err) {
            console.log('Successfully posted a todo!',result);
            
          }
        });

  }
  getfromdatabase(){
    function map(doc) {
      if(doc.type === 'Annotation' && doc.label)
      emit(doc.label,doc);
    }
    return new Promise(resolve => {
      this.db.query(map).then(function (result) {
         console.log(result);
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
          emit(doc.label,doc);
        }
      }).then(function (result) {
        // handle result
        console.log(result);
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
        console.log(result);
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
        console.log(result);
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