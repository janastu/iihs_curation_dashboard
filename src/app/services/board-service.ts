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

		//function call to create design docs
		this.createDesignDocs();

		this.remote = this.settings.protocol+this.settings.host+this.settings.dbboards;

		
		  
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
	createDesignDocs(){
	
	

		var ddoc = {
		  _id: '_design/board',
		  views: {
		    boards: {
		      map: function (doc) {
		        if(doc.label && doc.motivation === 'identifying'){
		           emit(doc.label,doc);  
		       }
		      }.toString()
		    }
		  }
		}

		// save the design doc
		this.db.put(ddoc).catch(function (err) {
		  if (err.name !== 'conflict') {
		    throw err;
		  }
		  // ignore if doc already exists
		})
		
		
	

	}

	getboards(board){

		var url = this.settings.protocol+this.settings.host+this.settings.dbboards+'/_design/board/_view/boards';

	return new Promise(resolve => {
	  this.db.query('board/boards', {
	      key:board
	      
	    }).then(function (result) {
	  // console.log("res",result.rows);
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