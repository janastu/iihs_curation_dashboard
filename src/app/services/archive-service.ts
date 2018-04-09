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
	  	console.log(date)
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
	  	  		console.log(data);
	  	  	 	resolve(data.rows[0].value);
	  	  	}, (err) => {
	  	  	   console.log(err);
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
	  	 	console.log(result);
	  	  	resolve(result.rows[0].value);
	  	  }).catch(function (err) {
	  	  console.log(err);
	  	  });
	  	});
	  }


	

}
