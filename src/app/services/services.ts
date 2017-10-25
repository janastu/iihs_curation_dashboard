import { Injectable } from '@angular/core';
import { Http }       from '@angular/http';
import 'rxjs/add/operator/toPromise';
import * as _ from 'underscore';

 declare var require: any;
@Injectable()
export class Service {

  constructor(private http: Http) { 



  }

public getAll(){ 
    var msgurl = 'assets/example.json';
    var newsrack = 'http://newsrack.in/stories/iihs_blore/iihs_feeds_v4/4.json';
    this.http.get(newsrack).subscribe((response)=> {
     var foundarray,parsedarray=[];
     var res = response.text();
     console.log("response",response);
     //oundarray = this.extractjson(res);
     //parsedarray = this.parseJSON(foundarray);
      


});
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