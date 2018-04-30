import { Injectable,ViewChild } from '@angular/core';
import { Http } from '@angular/http';
import PouchDB from 'pouchdb';
import { Settings }from './settings';
import {Global} from '../shared/global';
declare function emit(key: any,value:any): void;

@Injectable()
export class BoardService {
	localdb:any;
	remote:any;
	username:any;
	password:any;

	constructor(private http: Http,private settings:Settings,public variab:Global) { 
		//Create pouchdb instance for boards
		/*this.localdb = new PouchDB('boards');
		//Create reomte couchdb instance for boards
		this.remote = new PouchDB(this.settings.protocol+this.settings.dbboards,{
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
	//Api service to get boards from pouchdb
	getboards(){

	return new Promise(resolve => {
	  this.variab.localboards.query('board/boards', {
	     
	      
	    }).then(function (result) {
	  // console.log("res",result.rows);
	    resolve(result.rows);
	  }).catch(function (err) {
	    console.log(err);
	  });
	});
	  
	}
	//Api service to add board to pouchdb and replicate to coudhdb
	addboard(res){
	return new Promise(resolve => {
		this.addtopouch(res).then(response=>{
			//console.log(response);
			if(response['ok'] === true){
				PouchDB.replicate('boards',this.settings.protocol+this.settings.dbboards );
				resolve(response);
			}
		});
	});
		
	}
	//Api service to add board to pouch db
	addtopouch(res){
			
		return new Promise(resolve => {
			this.variab.localboards.post(res, function callback(err, result) {
			    if (!err) {
			      //console.log('Successfully posted a todo!',result);

			        
			      resolve(result);
			    }
			  });
		});

	}
	//Update database for deleted and modidifed
	updateboard(doc){
	 return new Promise(resolve=>{
	 	this.variab.localboards.put(doc).then(function (response) {
	 	  resolve(response);
	 	}).catch(function (err) {
	 	  console.log(err);
	 	});

	 });	
	  

	}
}