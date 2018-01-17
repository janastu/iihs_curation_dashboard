import { Injectable,ViewChild } from '@angular/core';
import { Http,RequestOptions,Headers }       from '@angular/http';
import { JsonConvert } from './utilities';
import PouchDB from 'pouchdb';
import * as _ from 'lodash';
import { Settings } from './settings';
@Injectable()
export class GroupService {
	db:any;
	remote:any;
	username:any;
	password:any;

	constructor(private http: Http,public jsonconvert:JsonConvert,public settings:Settings) { 
		this.db = new PouchDB('groups');
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
		var url = this.settings.protocol+this.settings.host+this.settings.dbgroups+'/_design/groups/_view/allgroups';
		return new Promise(resolve => {
		  this.http.get(url).map(res=>res.json()).subscribe(result=> {
		   // console.log(result);
		    resolve(result.rows);
		  }, (err) =>{
		    console.log(err);
		  });
		});
	}

}