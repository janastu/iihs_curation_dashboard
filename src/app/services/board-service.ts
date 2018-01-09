import { Injectable,ViewChild } from '@angular/core';
import { Http } from '@angular/http';
import PouchDB from 'pouchdb';
import { Settings }from './settings';
declare function emit(key: any,value:any): void;

@Injectable()
export class BoardService {
	db:any;
	remote:any;
	username:any;
	password:any;

	constructor(private http: Http,private settings:Settings) { 
		this.db = new PouchDB('boards');
		this.remote = this.settings.protocol+this.settings.host+':'+this.settings.dbboards;
		
		  
		     let options = {
		       live: true,
		       retry: true,
		       continuous: true,
		       auth: {
		          username: this.settings.couchdbusername,
		          password: this.settings.couchdbpassword
		        }
		     };
		  
		     this.db.sync(this.remote, options);

	  }

	getboards(){
		var url = this.settings.protocol+this.settings.host+':'+this.settings.dbboards+'/_design/board/_view/boards';
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