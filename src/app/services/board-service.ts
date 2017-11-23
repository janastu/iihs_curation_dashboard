import { Injectable,ViewChild } from '@angular/core';
import { Http } from '@angular/http';
@Injectable()
export class BoardService {

	constructor(private http: Http) { 
	  }

	public getAll(){ 
	var msgurl = 'assets/boards.json';
		return new Promise(resolve => {
		    this.http.get(msgurl).map(res => res.json()).subscribe(data => {
		     
		      console.log("Value is",data);
		      resolve(data);
		      }, (err) => {
		       console.log(err);
		       });
		     });
		
	}
}