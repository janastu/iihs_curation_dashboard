import { Injectable,ViewChild } from '@angular/core';
import { Http,RequestOptions,Headers }       from '@angular/http';
import { JsonConvert } from './utilities';
import PouchDB from 'pouchdb';
import * as _ from 'lodash';
import { Settings } from './settings';


@Injectable()
export class FeedService {
	db:any;
	remote:any;
	username:any;
	password:any;
	feedNewsrack:any=[];
	constructor(private http: Http,public jsonconvert:JsonConvert,public settings:Settings) { 
		  this.db = new PouchDB('feeds'); //create a pouchdb 

		//remote couchdb url to sync with couchdb
		 this.remote = this.settings.protocol+this.settings.host+this.settings.dbfeed;


		  
		     let options = {
		       live: true,
		       retry: true,
		       continuous: true,
		       auth:{
		         username:this.settings.couchdbusername,
		         password:this.settings.couchdbpassword
		       }
		     };
		  
		     this.db.sync(this.remote, options);//sync pouchdb to couchdb with the options
		//this.db = new PouchDB('categories')
		
	}

	public getAllFeeds(url){ 

	return new Promise(resolve => {
	    var newsrack = 'http://localhost:3000/?id='+url;
	    //console.log(newsrack);
	    this.http.get(newsrack).subscribe((response)=> {
	  //  console.log(response.json())
		this.feedNewsrack = response.json();

		resolve(this.feedNewsrack[0].meta);	
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
		this.addtopouch(this.feedNewsrack,metadata.feedname);

	}
	//Function adds the newsrack feeds to couchdb
	 addtopouch(feed,feedname){

	   
	    feed.map(res=>{
	      res.feednme = feedname;
	      /*var chunks = res.date.split('.');

	      var formattedDate = chunks[2]+'.'+chunks[1]+'.'+chunks[0];
	      var checkdate = Date.parse(formattedDate);
	      res.date = checkdate*/
	      console.log("dateche",res,res.date);
	      this.db.post(res, function callback(err, result) {

	          if (!err) {
	            console.log('Successfully posted a todo!',result);
	          }
	        });
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
			
		      this.http.put(url+id,metadata,options).map(res=>res.json()).subscribe((response)=> {
		        
		        console.log("user",response);
		       // resolve(response.rows);
		      }, (err) => {
		        console.log(err);
		      }); 
		 this.addtopouch(this.feedNewsrack,metadata.feedname);

	}

}