import { Injectable,ViewChild } from '@angular/core';
import { Http,RequestOptions,Headers }       from '@angular/http';
import { JsonConvert } from './utilities';
import PouchDB from 'pouchdb';
import * as _ from 'lodash';
import { Settings } from './settings';
import {Global} from '../shared'
declare function emit(key: any,value:any): void;

@Injectable()
export class FeedService {
	localdb:any;
	remote:any;
	username:any;
	password:any;
	feedNewsrack:any=[];
	constructor(private http: Http,public jsonconvert:JsonConvert,public settings:Settings,public variab:Global) { 
		  
		  this.localdb = new PouchDB('feeds'); //create a pouchdb 
		  this.remote = new PouchDB(this.settings.protocol+this.settings.dbfeed,{
		  	    auth:{
		  			      username:this.settings.couchdbusername,
		  			      password:this.settings.couchdbpassword
		  	        }
		  });

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
		  this.createDesignDocs();


		//remote couchdb url to sync with couchdb
		

	
 /*let options = {
		        live: true,
			      retry: true,
			      continuous: true,
				    auth:{
				      username:this.settings.couchdbusername,
				      password:this.settings.couchdbpassword
		        }
		     };*/


		 /*var sync = PouchDB.sync('feeds', this.settings.protocol+this.settings.dbfeed, {
			  live: true,
		  	retry: true,
			auth:{
		 		    username:this.settings.couchdbusername,
			       password:this.settings.couchdbpassword
			       }

		}).on('change', function (info) {
		  // handle change
		  console.log("change",info)
	
		}).on('paused', function (err) {
		  // replication paused (e.g. replication up to date, user went offline)
		  console.log("paused",err);
		}).on('active', function () {
		  // replicate resumed (e.g. new changes replicating, user went back online)
		  console.log("active");
		}).on('denied', function (err) {
		  // a document failed to replicate (e.g. due to permissions)
		  console.log("denied",err)
		}).on('complete', function (info) {
		  // handle complete

		  console.log("complete",info)
		}).on('error', function (err) {
		  // handle error
		  console.log("error",err)
		});*/
		
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
	addFeed(metadata){
		console.log(metadata);
		//var usersession = localStorage.getItem("superlogin.session")
		//var jsonusersession = JSON.parse(usersession);

		//let url = jsonusersession.userDBs.supertest;
		//

		let url = localStorage.getItem('url');
		console.log(url)
		let headers = new Headers();
		 headers.append( 'Content-Type', 'application/json')
		 headers.append('Authorization', 'Basic '+btoa(this.settings.couchdbusername+':'+this.settings.couchdbpassword)); // ... Set content type to JSON
		let options = new RequestOptions({ headers: headers });
			return new Promise(resolve => {
		      this.http.post(url,metadata,options).map(res=>res.json()).subscribe((response)=> {
		        
		        console.log("user",response);
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
	createDesignDocs(){
	
	

		var ddoc = {
		  _id: '_design/feeds',
		  views: {
		    categoryfeeds: {
		      map: function (doc) {
		        if (doc.feednme) {
		          emit(doc.feednme,doc);
		        }
		      }.toString()
		    },
		    metacategories: {
		      map: function (doc) {
		        if (doc.meta) {
		          emit([doc.meta.categories[0],doc.pubDate],doc);
		        }
		      }.toString()
		    },
		    latestoldestcategory: {
		    	map: function (doc) {
		    	  if (doc.meta) {
		    	    emit([doc.feednme,doc.pubDate],doc);
		    	  }
		    	}.toString()
		    }
		  }
		}
		var linkdoc = {
			_id: '_design/links',
			views: {
				link: {
				  map: function (doc) {
				    emit(doc.meta.link, doc.title);
				  }.toString(),
				  reduce: function (doc) {
				    return null;
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
		// save the design doc
		this.localdb.put(linkdoc).catch(function (err) {
		  if (err.name !== 'conflict') {
		    throw err;
		  }
		  // ignore if doc already exists
		})

		//Pull from couch
		/*this.remote.replicate.to(this.localdb, {
		   filter: '_view',
		   view: 'feeds/categoryfeeds'
		 }).then(res=>{
		console.log(res);
		});
		 
		this.remote.replicate.to(this.localdb, {
		   filter: '_view',
		   view: 'feeds/metacategories'
		 }).then(res=>{
		console.log(res);
		});*/
		
	

	}
	  //Function to get the feeds based on category by making a get request to the respective design view end point
	  getcategoryfeeds(category){

	   return new Promise(resolve => {
	   	this.localdb.query('feeds/categoryfeeds', {
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
	   	this.localdb.query('feeds/metacategories', {
	   	    startkey: [category],
	   	    endkey: [category, {}]
	   	  }).then(function (result) {
	   	 // console.log("res",result);
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
		
		    this.localdb.query('feeds/latestoldestcategory', {
		      startkey: [category],
		      endkey: [category, {}]
		    }).then(function (result) {
		   		console.log("res",result);
		    	resolve(result.rows);
		  	}).catch(function (err) {
		    console.log(err);
		  	});
	
	//}
	//});
	  
	});


	  
	}
	 //Function to get the oldest feeds by making a get request to the design view end point
	/*getoldestfeeds(category){
	 
	 
	  var d = new Date();
	  var date = d.getTime();
	  console.log(date)


	  var url = this.settings.protocol+this.settings.host+this.settings.dbfeed+'/_design/feeds/_view/latestoldestcategory?&startkey=['+'"'+category+'"'+']&endkey=['+'"'+category+'"'+',{}]';

	  //var url = 'http://localhost:5984/feeds/_design/feeds/_view/latestoldestcategory?&startkey=['+'"'+category+'"'+']&endkey=['+'"'+category+'"'+',{}]';

	return new Promise(resolve => {
	  this.http.get(url).map(res=>res.json()).subscribe(result=> {
	    console.log(result)

	   /* var changesdoc = result.results.map(res=>{
	      if(res.doc.title){
	        return res.doc;
	      }
	    })
	    console.log(_.compact(changesdoc));
	    var recentDocs = _.compact(changesdoc)
	    resolve(result.rows);
	  }, (err) =>{
	    console.log(err);
	  });
	});

	  
	}*/
	//Function adds the newsrack feeds to couchdb
	 addtopouch(feed,feedname){
	 	return new Promise(resolve => {
	   
	    feed.map(res=>{
	      res.feednme = feedname;
	      /*var chunks = res.date.split('.');

	      var formattedDate = chunks[2]+'.'+chunks[1]+'.'+chunks[0];
	      var checkdate = Date.parse(formattedDate);
	      res.date = checkdate*/
	     // console.log("dateche",res,res.date);
	      //this.variab.globalfeeds.push({value:res});
	      
	      this.localdb.post(res, function callback(err, result) {
			console.log("pouchdb",this);
			  if (!err) {
	            console.log('Successfully posted a todo!',result);
	            resolve(result);
	          }

	        	});
	  	 });
	    });

	    
	  }
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
		        
		        console.log("user",response);
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
	//function  to get feeds in a range
	getRangeFeeds(from,to,feedname){
		console.log(from,to);
		return new Promise(resolve => {
			var newsrackrange = this.settings.feedparserUrl+'/range?from='+from+'&to='+to+'&link='+feedname;
			console.log(newsrackrange)
			this.http.get(newsrackrange).map(res=>res.json()).subscribe((response)=>{
				
			})
			resolve('err');
		});

	}
	

}
