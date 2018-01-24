import { Injectable,ViewChild } from '@angular/core';
import { Http,RequestOptions,Headers }       from '@angular/http';
import { JsonConvert } from './utilities';
import PouchDB from 'pouchdb';
import * as _ from 'lodash';
import { Settings } from './settings';
declare function emit(key: any,value:any): void;
@Injectable()
export class GroupService {
	db:any;
	remote:any;
	username:any;
	password:any;

	constructor(private http: Http,public jsonconvert:JsonConvert,public settings:Settings) { 
		this.db = new PouchDB('groups');
		//function call to create design docs
		this.createDesignDocs();
		this.remote = this.settings.protocol+this.settings.host+this.settings.dbgroups;
		
		  
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
		//this.db = new PouchDB('categories');
	  }

	createDesignDocs(){
	
	

		var ddoc = {
		  _id: '_design/groups',
		  views: {
		    groups: {
		      map: function (doc) {
		        if(doc.groupname){
		        	emit(doc.groupname,doc)
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


	addGroupDb(metadata){
		
		this.db.post(metadata, function callback(err, result) {
		    if (!err) {
		      console.log('Successfully posted a todo!',result);
		    }
		});


	}
	update(metadata){
		this.db.put(metadata).then(function (response) {
		  // handle response
		  console.log(response)
		}).catch(function (err) {
		  console.log(err);
		});


	}
	getgroups(){
		//var url = this.settings.protocol+this.settings.host+this.settings.dbgroups+'/_design/groups/_view/allgroups';
		return new Promise(resolve => {
		  this.db.query('groups/groups', {
		      
		      
		    }).then(function (result) {
		   // console.log("res",result);
		    resolve(result.rows);
		  }).catch(function (err) {
		    console.log(err);
		  });
		});
	}


}