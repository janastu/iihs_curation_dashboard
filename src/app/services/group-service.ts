import { Injectable,ViewChild } from '@angular/core';
import { Http,RequestOptions,Headers }       from '@angular/http';
import { JsonConvert } from './utilities';
import PouchDB from 'pouchdb';
import * as _ from 'lodash';
import { Settings } from './settings';
declare function emit(key: any,value:any): void;
@Injectable()
export class GroupService {
	localdb:any;
	remote:any;
	username:any;
	password:any;

	constructor(private http: Http,public jsonconvert:JsonConvert,public settings:Settings) { 
		//this.localdb = new PouchDB('groups');
		this.localdb = new PouchDB('groups'); //create a pouchdb 
		this.remote = new PouchDB(this.settings.protocol+this.settings.dbgroups);

		this.localdb.sync(this.remote, {
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
		})
		//function call to create design docs
		this.createDesignDocs();
		/*this.remote = this.settings.protocol+this.settings.dbgroups;
		
		  
		     let options = {
		       live: true,
		       retry: true,
		       continuous: true,
		       auth: {
		          username: this.settings.couchdbusername,
		          password: this.settings.couchdbpassword
		        }
		     };
		  
		 this.localdb.sync(this.remote, options);*/
		//this.localdb = new PouchDB('categories');
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
		this.localdb.put(ddoc).catch(function (err) {
		  if (err.name !== 'conflict') {
		    throw err;
		  }
		  // ignore if doc already exists
		})
		
		
	

	}

 
	addGroupDb(metadata){
		return new Promise(resolve => {
			this.localdb.post(metadata, function callback(err, result) {
				if (!err) {
					console.log('Successfully posted a todo!', result);
				}
				resolve(result.ok);
				console.log('as', result.ok);
			});

		});

	}
	update(metadata){
		this.localdb.put(metadata).then(function (response) {
		  // handle response
		  console.log(response)
		}).catch(function (err) {
		  console.log(err);
		});


	}
	getgroups(){
		//var url = this.settings.protocol+this.settings.host+this.settings.dbgroups+'/_design/groups/_view/allgroups';
		return new Promise(resolve => {
		  this.localdb.query('groups/groups', {
		      
		      
		    }).then(function (result) {
		   // console.log("res",result);
		    resolve(result.rows);
		  }).catch(function (err) {
		    console.log(err);
		  });
		});
	}


}