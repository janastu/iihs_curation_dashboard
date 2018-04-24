import { Injectable,ViewChild } from '@angular/core';
import { Http,RequestOptions,Headers }       from '@angular/http';
import { JsonConvert } from './utilities';
import PouchDB from 'pouchdb';
import * as _ from 'lodash';
import { Settings } from './settings';
import {Global} from '../shared/global';
declare function emit(key: any,value:any): void;

@Injectable()
export class ArchiveService {
	localdb:any;
	remote:any;
	username:any;
	password:any;
	feedNewsrack:any=[];
	constructor(private http: Http,public jsonconvert:JsonConvert,public settings:Settings,public variab:Global) { 


	}

	//Api service to add feed name to user's database and also add the feeds to the database
	addFeed(metadata){
		return new Promise(resolve=>{
		    this.addtopouch(metadata).then(res=>{
		        if(res['ok'] == true){
		        	resolve(res);
		        	PouchDB.replicate('archives',this.settings.protocol+this.settings.dbarchives);
		        }
		    });
		});

	}

	

	
	//Function adds the published feeds to pouchdbdb
	 addtopouch(feed){
	 	return new Promise(resolve => {
	   		this.variab.localarchives.post(feed, function callback(err, result) {
		
			  if (!err) {
	            //console.log('Successfully posted a todo!',result);
	            resolve(result);
	          }

	        });
	    });

	    
	  }
	  //Function to get the published feeds 
	  getPublishedFeeds(date,board){
	  	//var queryDate = new Date(date);
	  	//console.log(date)
	  	return new Promise(resolve=>{
	  	/* this.variab.localarchives.query('archives/archives', {
	  		  key:[date,board]
	  	  }).then(function (result) {
	  	    console.log("res",result.rows[0].value);
	  	  	resolve(result.rows[0].value.feeds);
	  	  }).catch(function (err) {
	  	  console.log(err);
	  	  });*/
	  	  var url = this.settings.protocol+this.settings.dbarchives+'/_design/archives/_view/archives?key=["'+date+'","'+board+'"]';
	  	  	this.http.get(url).map(res => res.json()).subscribe(data => {
	  	  		//console.log("da",data);
	  	  		if(data.rows.length !=0){
	  	  	 		resolve(data.rows[0]);
	  	  	 	}
	  	  	 	else{
	  	  	 		resolve(data.rows);
	  	  	 	}
	  	  	}, (err) => {
	  	  	   console.log(err);
	  	  	   //resolve(err);
	  	  	});
	  	});

	  }
	  //Function to get already published feeds on board name and highlight in the board feeds
	  getAlreadyPublishedfeeds(board){
	  	var allpublishedboard:any=[];
	  	return new Promise(resolve=>{
	  	  this.variab.localarchives.query('archives/publishedfeeds', {
	  		  key:board
	  	  }).then(function (result) {
	  	  		
	  	  		var feedsofeverypublish = result.rows.map(feeds=>{
	  	  			return feeds.value.feeds;
	  	  		})
	  	  		//console.log(_.flatten(feedsofeverypublish));	
	  	 	if(result.rows.length!=0){
	  	  		resolve(_.flatten(feedsofeverypublish));
	  	  	}
	  	  	else{
	  	  		resolve(result.rows);
	  	  	}
	  	  }).catch(function (err) {
	  	 	//resolve(err);
	  	  });
	  	});
	  }
	  //Api call to get the published dates
	  getPublishedDates(){
	  	return new Promise(resolve=>{
	  		//console.log("val");
	  	  this.variab.localarchives.query('date/querydate', {
	  		  reduce:true,
	  		  group_level:1
	  	  }).then(function (result) {
	  	 	//console.log(result);
	  	  	resolve(result.rows);
	  	  }).catch(function (err) {
	  	  console.log(err);
	  	  });
	  	});
	  }
	  //Api call to get the feeds on dates
	  getPublishedboardsOnDates(date){
	  	return new Promise(resolve=>{
	  		console.log("val");
	  	  this.variab.localarchives.query('archives/published_date', {
	  		  key:date
	  	  }).then(function (result) {
	  	 	//console.log(result);
	  	  	resolve(result.rows);
	  	  }).catch(function (err) {
	  	  console.log(err);
	  	  });
	  	});

	  }
	  //Api call to get publishing url of feed
	  getPublishingUrlofFeed(feedid){
	  	return new Promise(resolve=>{
	  		//console.log("val");
	  	  this.variab.localarchives.query('archives/publishing_url_feed', {
	  		  key:feedid
	  	  }).then(function (result) {
	  	 	//console.log(result);
	  	  	resolve(result.rows);
	  	  }).catch(function (err) {
	  	  console.log(err);
	  	  });
	  	});
	  }
	  //Update database for deleted and modidifed
	  updatedatabase(doc){
	  	return new Promise(resolve=>{
	     this.variab.localarchives.put(doc).then(function (response) {
	       // handle response
	       resolve(response);
	      // console.log(response)
	     }).catch(function (err) {
	      console.log(err);
	     });
 	    });
	  }
	  //post to a json
	  /*postjsonfile(metadata,boardname,date){
	  	var postdata={
	  		'data':metadata,
	  		'boardname':boardname,
	  		'date':date
	  	};
	  var url='http://localhost:3002';
	  	this.http.post(url,postdata).subscribe((response)=> {
	  		console.log(response);
	  	})
	  }
	  //Get local json file
	  getJsonData(date,boardname){
	  	var check='http://localhost:3002?date='+date+'&boardname='+boardname;
	  	return new Promise(resolve=>{
	  		this.http.get(check).map(res=>res.json()).subscribe(result=> {
	  			resolve(result);
	  		});
	  	});
	  		
	  }*/

}
