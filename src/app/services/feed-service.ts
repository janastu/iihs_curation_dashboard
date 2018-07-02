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
	remotefeeds:any;
	auth:any;//varable to store the auth object
	constructor(private http: Http,public jsonconvert:JsonConvert,public settings:Settings,public variab:Global) {
		 this.auth={
  			      username:this.settings.couchdbusername,
  			      password:this.settings.couchdbpassword
  	        }


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

		  this.remotefeeds = new PouchDB(this.settings.protocol+this.settings.dbfeed,{
		  	    auth:this.auth,
		  	    adapter:'http'
		  });
		  //var info=this.remotefeeds.info();
		//console.log("inf",info);
			//this.removeUnwanted();
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

		        			//PouchDB.replicate('feeds',this.settings.protocol+this.settings.dbfeed);
		        			this.remotefeeds.replicate.to(this.settings.protocol+this.settings.dbfeed).on('complete', function (res) {
		        			  // yay, we're done!
		        			  //console.log(res);
		        			  resolve(res);
		        			}).on('error', function (err) {
		        			  // boo, something went wrong!
		        			});
		        		}
		        	});
		        }
		       // resolve(response.rows);
		      }, (err) => {
		        console.log(err);
		      });
			});

	}
	 getPostsSince(when) {
	 	console.log(when);
	  return new Promise(resolve=>{
	  	this.remotefeeds.query('feeds_filter', {startkey: when}).then(res=>{
	  		console.log(res);
	  	});
	  	/*this.remotefeeds.replicate.to(this.remotefeeds, {
	  	  filter: 'feedsfilter/feedsfilter'


	  	}).then((change)=> {
	  	  // yo, something changed!
	  	  console.log("syncchnagefeeds",change);

	  	});*/
	  })

	}

	  //Function to get the feeds based on category by making a get request to the respective design view end point
	  getcategoryfeeds(category){

	   return new Promise(resolve => {
	   	this.remotefeeds.query('feeds/categoryfeeds', {
	   		stale: 'update_after',
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
	  		   //var check = this.settings.protocol+'/'+this.settings.dbfeed+'/_design/feeds/_view/metacategories?startkey=["'+category+'"]&endkey=["'+category+'",{}]'
	  		   //	console.log(category);
	  		   	this.remotefeeds.query('feeds/metacategories', {
	  		   		stale: 'update_after',
	  		   	    startkey: [category],
	  		   	    endkey: [category, {}]
	  		   	  }).then(function (result) {
	  		   	  //console.log("resmeta",result.rows);
	  		   	 resolve(result.rows);
	  		   	}).catch(function (err) {
	  		   	  console.log(err);
	  		   	});
	  });
	  }

	 //Function to get the latest feeds by making a get request to the design view end point
	getlatestfeeds(category){
		//console.log(encodeURIComponent(category))
		//var replicationstatus:boolean=false;
		return new Promise(resolve => {
			  //this.remotefeeds.query('feeds/latestoldestcategory', {
			  	this.remotefeeds.query('feeds/latestoldestcategory', {
			    startkey: [category],
			    endkey: [category, {}]
			  }).then(function (result) {
			  		//console.log("resfeeds",result);
			 		resolve(result.rows);
			   }).catch(function (err) {
			  		console.log(err);
			});










	});
}
	//Replicate db feeds
	replicatefeedsdb(category){
		console.log(category);
		 return new Promise(resolve=>{
		this.remotefeeds.replicate.to(this.remotefeeds, {
		  	  batch_size:5,
		  	  batches_limit:5,
		  	  filter: '_view',
		  	  view: 'feeds_filter/feeds_filter'
		  	  //filter: 'feedsfilter/latestoldestcategory',
		  	  //query_params: {category: category}


		}).then((change)=> {
		  // yo, something changed!
		  console.log("syncchnagefeeds",change);
		  if(change.ok == true){
		    this.remotefeeds.query('feeds/latestoldestcategory', {
		    	stale: 'update_after',
		        startkey: [category],
		        endkey: [category, {}]
		      }).then(function (result) {
		      console.log("res",result);
		      resolve(result.rows);
		    }).catch(function (err) {
		      console.log(err);
		    });
		  }
		});
	  });

	}
	//Replicate db feeds
	replicatemetafeedsdb(category){
		//console.log("thisis called",category);
	  return new Promise(resolve=>{
		this.remotefeeds.replicate.to(this.remotefeeds, {
			batch_size:5,batches_limit:5,
		  filter: 'feedsfilter/metacategories',
		  query_params: {category: category},


		}).then((change)=> {
		  // yo, something changed!
		 // console.log("syncchnagefeeds",change);
		  if(change.ok == true){
		    this.remotefeeds.query('feeds/metacategories', {
		      startkey: [category],
		      endkey: [category, {}]
		    }).then(function (result) {
		   		//console.log("res",result);
		    	resolve(result.rows);
		  	}).catch(function (err) {
		    //console.log(err);
		  	});
		  }
		});
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
	       //console.log(err);
	     });
	   });


	   }
	//Function adds the newsrack feeds to pouchdbdb
	 addtopouch(feed,feedname){
	 	return new Promise(resolve => {

	    feed.map(res=>{
	      res.feednme = feedname;


	      this.remotefeeds.post(res, function callback(err, result) {

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
	delete(feed){
		console.log(feed);
		return new Promise(resolve=>{
			this.remotefeeds.remove(feed.value._id, feed.value._rev, function(err) {
   			if (err) {
      		return console.log(err);
   		} else {
				resolve({ok:true})
      	console.log("Document deleted successfully");
   		}
		});
	})
}
removeUnwanted(){
	var scope = this;
	this.remotefeeds.query('feeds/deleteonview', {

			  }).then(function (result) {
			  		console.log("resfeeds",result.rows);
						var storeinter:any=[];
						storeinter = result.rows;
						storeinter.map(removefeed=>{
							scope.delete(removefeed);
							/*this.remotefeeds.remove(removefeed.value._id, removefeed.value._rev, function(err) {
				   			if (err) {
				      		return console.log(err);
				   		} else {
								resolve({ok:true})
				      	console.log("Document deleted successfully");
				   		}
						});*/
						})
			   }).catch(function (err) {
			  		console.log(err);
			});

}
	//update feed document
	updatefeed(model){
	  return new Promise(resolve=>{	;
		this.remotefeeds.put(model).then(function (response) {
		  resolve(response);
		}).catch(function (err) {
		  resolve(err);
		});
	   });
	}


}
