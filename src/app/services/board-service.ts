import { Injectable,ViewChild } from '@angular/core';
import { Http } from '@angular/http';
import PouchDB from 'pouchdb';
declare function emit(key: any,value:any): void;

@Injectable()
export class BoardService {
	db:any;
	remote:any;
	username:any;
	password:any;

	constructor(private http: Http) { 
		this.db = new PouchDB('boards');
		/*this.remote = 'http://localhost:5984/boards';
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
		  
		     this.db.sync(this.remote, options);*/

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
	addboard(res){

		console.log(res);
		this.db.post(res, function callback(err, result) {
		    if (!err) {
		      console.log('Successfully posted a todo!',result);
		    }
		  });
	}
}