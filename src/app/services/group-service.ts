import { Injectable,ViewChild } from '@angular/core';
import { Http,RequestOptions,Headers }       from '@angular/http';
import { JsonConvert } from './utilities';
import PouchDB from 'pouchdb';
import * as _ from 'lodash';
import { Settings } from './settings';
import {Global} from '../shared/global';
declare function emit(key: any,value:any): void;
@Injectable()
export class GroupService {
	localdb:any;
	remote:any;
	username:any;
	password:any;

	constructor(private http: Http,public jsonconvert:JsonConvert,public settings:Settings,public variab:Global) { 
		//Create pouchdb instance for groups
		/*this.localdb = new PouchDB('groups'); //create a pouchdb 
		//Create reomte couchdb instance for groups
		this.remote = new PouchDB(this.settings.protocol+this.settings.dbgroups);
		//Synch pouchdb with couchdb
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
		this.createDesignDocs();*/

	  }
	  //create designdocs


 	//Api service add group to the pouchdb
	addGroupDb(metadata){
		return new Promise(resolve => {
			this.variab.localgroups.post(metadata, function callback(err, result) {
				if (!err) {
					//console.log('Successfully posted a todo!', result);
				}
				resolve(result.ok);
				//console.log('as', result.ok);
			});

		});

	}
	//Api service update group to pouchdb
	update(metadata){
	  return new Promise(resolve=>{
		this.variab.localgroups.put(metadata).then(function (response) {
		  // handle response
		  resolve(response);
		  //console.log(response)
		}).catch(function (err) {
		  console.log(err);
		});
      });

	}
	//Api service to get groups from pouchdb
	getgroups(){
		//var url = this.settings.protocol+this.settings.host+this.settings.dbgroups+'/_design/groups/_view/allgroups';
		return new Promise(resolve => {
		  this.variab.localgroups.query('groups/groups', {
		      
		      
		    }).then(function (result) {
		   // console.log("res",result);
		    resolve(result.rows);
		  }).catch(function (err) {
		    console.log(err);
		  });
		});
	}


}