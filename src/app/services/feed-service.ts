import { Injectable,ViewChild } from '@angular/core';
import { Http,RequestOptions,Headers }       from '@angular/http';
import { JsonConvert } from './utilities';
import PouchDB from 'pouchdb';
import * as _ from 'lodash';
import { Settings } from './settings';
@Injectable()
export class FeedService {
	db:any;

	constructor(private http: Http,public jsonconvert:JsonConvert,public settings:Settings) { 
		//this.db = new PouchDB('categories');
	  }

	public getAllFeeds(url){ 

	   return new Promise(resolve => {

	    var newsrack = 'http://newsrack.in/stories/iihs_blore/iihs_feeds_v4/1.json';

	    this.http.get(url).subscribe((response)=> {
	    var res = response.text();
	   var jsonobject = this.jsonconvert.parseJSON(res);
	    
	//  this.addtopouch(jsonobject['_nr_stories'],jsonobject['_nr_metadata']);

	     resolve(jsonobject['_nr_metadata']);
	     }, (err) => {
	      console.log(err);
	      });
	  });
		
	}
	addFeed(metadata){
		console.log(metadata);
		var usersession = localStorage.getItem("superlogin.session")
		var jsonusersession = JSON.parse(usersession);

		let url = jsonusersession.userDBs.supertest;
		//console.log(url)
		let headers = new Headers();
		 headers.append( 'Content-Type', 'application/json')
		 headers.append('Authorization', 'Basic '+btoa(this.settings.couchdbusername+':'+this.settings.couchdbpassword)); // ... Set content type to JSON
		let options = new RequestOptions({ headers: headers });
			
		      this.http.post(url,metadata,options).map(res=>res.json()).subscribe((response)=> {
		        
		        console.log("user",response);
		       // resolve(response.rows);
		      }, (err) => {
		        console.log(err);
		      }); 

	}
	update(id,metadata){
		var usersession = localStorage.getItem("superlogin.session")
		var jsonusersession = JSON.parse(usersession);

		let url = jsonusersession.userDBs.supertest;

		let headers = new Headers();
		 headers.append( 'Content-Type', 'application/json')
		 headers.append('Authorization', 'Basic '+btoa(this.settings.couchdbusername+':'+this.settings.couchdbpassword)); // ... Set content type to JSON
		let options = new RequestOptions({ headers: headers });
			
		      this.http.post(url,metadata,options).map(res=>res.json()).subscribe((response)=> {
		        
		        console.log("user",response);
		       // resolve(response.rows);
		      }, (err) => {
		        console.log(err);
		      }); 

	}

}