import { Injectable,ViewChild } from '@angular/core';
import { Http,RequestOptions,Headers }       from '@angular/http';
import { JsonConvert } from './utilities';
import PouchDB from 'pouchdb';
import * as _ from 'lodash';
import { Settings } from './settings';
import {Global} from '../shared/global';
declare function emit(key: any,value:any): void;

@Injectable()
export class FeedService {
	localdb:any;
	remote:any;
	username:any;
	password:any;
	feedNewsrack:any=[];
	constructor(private http: Http,public jsonconvert:JsonConvert,public settings:Settings,public variab:Global) { 
		  //Create pouchdb instance for feeds
		/*  this.localdb = new PouchDB('feeds'); //create a pouchdb 
		  //Create reomte couchdb instance for feeds
		  this.remote = new PouchDB(this.settings.protocol+this.settings.dbfeed,{
		  	    auth:{
		  			      username:this.settings.couchdbusername,
		  			      password:this.settings.couchdbpassword
		  	        }
		  });
		  //Synch pouchdb with couchdb
		  this.localdb.sync(this.remote, {
		    live: true,
		    retry:true
		    
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

//Function to get the json feeds when an xml url is given
	public getNewsrackfeedsFirstTime(url){ 	

	return new Promise(resolve => {
	    var newsrack = this.settings.feedparserUrl+'/first?id='+url;
	    //console.log(newsrack);
	    this.http.get(newsrack).subscribe((response)=> {
	  	console.log(response.json())
	  	if(response.json().length!=0){
		this.feedNewsrack = response.json();
    
		resolve(this.feedNewsrack[0].meta);	
		}
		else{
			resolve(response.json());
		}
	   	});
	 });
		
	}
	//Api service to add feed name to user's database and also add the feeds to the database
	addFeed(metadata){

		let url = localStorage.getItem('url');
		//console.log(url)
		let headers = new Headers();
		 headers.append( 'Content-Type', 'application/json')
		 headers.append('Authorization', 'Basic '+btoa(this.settings.couchdbusername+':'+this.settings.couchdbpassword)); // ... Set content type to JSON
		let options = new RequestOptions({ headers: headers });
			return new Promise(resolve => {
		      this.http.post(url,metadata,options).map(res=>res.json()).subscribe((response)=> {
		        
		       // console.log("user",response);
		        if(response.ok === true){
		        	
		        	this.addtopouch(this.feedNewsrack,metadata.feedname).then(res=>{
		        		if(res['ok'] == true){
		        			resolve(res);
		        			PouchDB.replicate('feeds',this.settings.protocol+this.settings.dbfeed );
		        		}
		        	});
		        }
		       // resolve(response.rows);
		      }, (err) => {
		        console.log(err);
		      });
			});

	}
	  //Function to get the feeds based on category by making a get request to the respective design view end point
	  getcategoryfeeds(category){

	   return new Promise(resolve => {
	   	this.variab.localfeeds.query('feeds/categoryfeeds', {
	   		limit:20,
	   	    key:category,
	   	    descending:true
	   	  }).then(function (result) {
	   	 // console.log("res",result);
	   	  resolve(result.rows);
	   	}).catch(function (err) {
	   	  console.log(err);
	   	});

	   });

	    
	  }
	  //Function to get the feeds based on category by making a get request to the respective design view end point
	  getmetacategories(category){
	  	 

	   return new Promise(resolve => {
	   	/*this.remote.replicate.to(this.localdb, {
	   	   filter: '_view',
	   	   view: 'feeds/metacategories'
	   	 }).then(res=>{
	   	console.log(res);
	   	if(res['ok']==true){*/
	   	this.variab.localfeeds.query('feeds/metacategories', {
	   	    startkey: [category],
	   	    endkey: [category, {}]
	   	  }).then(function (result) {
	   	  //console.log("res",result);
	   	  resolve(result.rows);
	   	}).catch(function (err) {
	   	  console.log(err);
	   	});
	   	//}
		//});
	  });

	    
	  }

	 //Function to get the latest feeds by making a get request to the design view end point
	getlatestfeeds(category){
	
	 
	  var d = new Date();
	  var date = d.getTime();
	 

	return new Promise(resolve => { 
	/*this.remote.replicate.to(this.localdb, {
	 filter: '_view',
	 view: 'feeds/latestoldestcategory'
	 }).then(res=>{
	console.log(res)
	if(res['ok']==true){*/
		
		    this.variab.localfeeds.query('feeds/latestoldestcategory', {
		      startkey: [category],
		      endkey: [category, {}]
		    }).then(function (result) {
		   		//console.log("res",result);
		    	resolve(result.rows);
		  	}).catch(function (err) {
		    console.log(err);
		  	});
	
	//}
	//});
	  
	});


	  
	}
	//Api service to get recent feeds
	 getrecentfeeds(){


	   
	     var check = this.settings.protocol+this.settings.dbfeed+'/_changes?descending=true&limit=10&include_docs=true'


	   return new Promise(resolve => {
	     this.http.get(check).map(res=>res.json()).subscribe(result=> {
	       //console.log(result.results)
	       var changesdoc = result.results.map(res=>{
	         if(res.doc.title){
	           return res.doc;
	         }
	       })
	       //console.log(_.compact(changesdoc));
	       var recentDocs = _.compact(changesdoc)
	       resolve(recentDocs);
	     }, (err) =>{
	       console.log(err);
	     });
	   });

	     
	   }
	//Function adds the newsrack feeds to pouchdbdb
	 addtopouch(feed,feedname){
	 	return new Promise(resolve => {
	   
	    feed.map(res=>{
	      res.feednme = feedname;

	      
	      this.variab.localfeeds.post(res, function callback(err, result) {
		
			  if (!err) {
	            //console.log('Successfully posted a todo!',result);
	            resolve(result);
	          }

	        	});
	  	 });
	    });

	    
	  }
	  //Update user's database and add feeds
	update(id,metadata){
		/*var usersession = localStorage.getItem("superlogin.session")
		var jsonusersession = JSON.parse(usersession);

		let url = jsonusersession.userDBs.supertest;
		console.log(id,metadata)*/
		let url = localStorage.getItem('url');
		let headers = new Headers();
		 headers.append( 'Content-Type', 'application/json')
		 headers.append('Authorization', 'Basic '+btoa(this.settings.couchdbusername+':'+this.settings.couchdbpassword)); // ... Set content type to JSON
		let options = new RequestOptions({ headers: headers });
			
		      this.http.put(url+'/'+id,metadata,options).map(res=>res.json()).subscribe((response)=> {
		        
		        //console.log("user",response);
		        if(response.ok == true){
		        	 this.addtopouch(this.feedNewsrack,metadata.feedname).then(res=>{
		        	 	if(res['ok'] == true){
		        	 		PouchDB.replicate('feeds',this.settings.protocol+this.settings.dbfeed );
		        	 	}
		        	 });
		        }
		      }, (err) => {
		        console.log(err);
		      }); 
		

	}
	//update feed document 
	updatefeed(model){
	  return new Promise(resolve=>{	;
		this.variab.localfeeds.put(model).then(function (response) {
		  resolve(response);
		}).catch(function (err) {
		  resolve(err);
		});
	   });
	}
	

}
