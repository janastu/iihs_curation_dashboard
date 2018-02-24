import { Injectable,ViewChild } from '@angular/core';
import { Http } from '@angular/http';
import PouchDB from 'pouchdb';
import { Settings }from './settings';
declare function emit(key: any,value:any): void;

@Injectable()
export class BoardService {
	localdb:any;
	remote:any;
	username:any;
	password:any;

	constructor(private http: Http,private settings:Settings) { 
		this.localdb = new PouchDB('boards');
		
		this.remote = new PouchDB(this.settings.protocol+this.settings.dbboards);

		/*this.localdb.sync(this.remote, {
		  live: true,
		  retry:true,
		  auth:{
				      username:this.settings.couchdbusername,
				      password:this.settings.couchdbpassword
		        }
		}).on('change', function (change) {
		  // yo, something changed!
		  console.log("syncchnage",change);
		}).on('error', function (err) {
			console.log("syncerr",err);
		  // yo, we got an error! (maybe the user went offline?)
		})*/
		//function call to create design docs
		this.createDesignDocs();

		/*this.remote = this.settings.protocol+this.settings.dbboards;

		
		  
		     let options = {
		       live: true,
		       retry: true,
		       continuous: true,
		       auth: {
		          username: this.settings.couchdbusername,
		          password: this.settings.couchdbpassword
		        }
		     };
		  
		     this.db.sync(this.remote, options);*/

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
		this.localdb.put(ddoc).catch(function (err) {
		  if (err.name !== 'conflict') {
		    throw err;
		  }
		  // ignore if doc already exists
		})
		
		
	

	}

	getboards(){

			//var url = this.settings.protocol+this.settings.host+this.settings.dbboards+'/_design/board/_view/boards';
			this.remote.replicate.to(this.localdb, {
			   filter: '_view',
			   view: 'board/boards'
			 }).then(res=>{
			console.log(res);
			});

	return new Promise(resolve => {
	  this.localdb.query('board/boards', {
	     
	      
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
	return new Promise(resolve => {
		this.localdb.post(res, function callback(err, result) {
		    if (!err) {
		      console.log('Successfully posted a todo!',result);
		      resolve(result);
		    }
		  });
	});
	}
}