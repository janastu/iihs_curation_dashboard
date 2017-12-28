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
		this.remote = 'http://192.168.1.30:5984/boards';
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

	getboards(){
		var url = 'http://192.168.1.30:5984/boards/_design/board/_view/boards';
	return new Promise(resolve => {
	  this.http.get(url).map(res=>res.json()).subscribe(result=> {
	    
	    resolve(result.rows);
	  }, (err) =>{
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