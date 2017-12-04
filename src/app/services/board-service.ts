import { Injectable,ViewChild } from '@angular/core';
import { Http } from '@angular/http';
import PouchDB from 'pouchdb';
@Injectable()
export class BoardService {
	db:any;

	constructor(private http: Http) { 
		this.db = new PouchDB('boards');
	  }

	public getAll(){
	var msgurl = 'assets/boards.json';
	
	return new Promise(resolve => {
		    /*this.http.get(msgurl).map(res => res.json()).subscribe(data => {
		     
		      console.log("Value is",data);
		      resolve(data);
		      }, (err) => {
		       console.log(err);
		       });*/
		this.db.allDocs({
        include_docs: true
      }).then(function (result) {
            resolve(result.rows);
      });
	});


		
	}
	addtoboard(res){
		this.db.post(res, function callback(err, result) {
		    if (!err) {
		      //console.log('Successfully posted a todo!',result);
		    }
		  });
	}
}