import { Injectable,ViewChild } from '@angular/core';
import { Http }       from '@angular/http';
import 'rxjs/add/operator/toPromise';
import * as _ from 'underscore';
import { JsonConvert } from './utilities';
 declare var require: any;
@Injectable()
export class Service {

constructor(private http: Http, private jsonconvert:JsonConvert) { 
  }

public getAll(){ 
    var msgurl = 'assets/example.json';
    
     //oundarray = this.extractjson(res);
     //parsedarray = this.parseJSON(foundarray);
     return new Promise(resolve => {
          this.http.get(msgurl).map(res => res.json()).subscribe(data => {
          
           console.log("Value is",data);
           resolve(data);
           }, (err) => {
            console.log(err);
            });
           });
     /*
    return new Promise(resolve => {
    var newsrack = 'http://newsrack.in/stories/servelots/iihs_feeds/16.json';
    this.http.get(newsrack).subscribe((response)=> {
    var res = response.text();
   var jsonobject = this.jsonconvert.parseJSON(res);

     resolve(jsonobject);
     }, (err) => {
      console.log(err);
      });
  }); */

  }
convertTojson(){

let parseJSON = (text) => {
  console.log("text",text);
  let quoteKeysAndParse = (text) => {
     //Quote keys in objects
     let quoted = text.replace(/([\{\[,]\s*)(['"])?([a-zA-Z0-9_]+)(['"])?\s*:/g, '$1"$3": ');
     //Remove the "last item" text
     quoted = quoted.replace(/,\s+'' \/\/ Last item[^\]^}]+([\]\}])/g, '$1');
     //Remove improperly escaping of apostrophes
     quoted = quoted.replace(/([^\\])\\'/g, '$1\'');
     //Parse the JSON
     return JSON.parse(quoted);
  }
  
  //Find var declarations
  let declarations = text.match(/var\s+_nr_[^\s]+\s+=\s+/ig), obj = {}, key = null, prevKey = null;
  text = ['',text];
  //For each variable...
  for(let declaration of declarations){
    key = declaration.match(/_nr_[^\s]+/)[0];
    let currentText = text[1].split(declaration);
    text = currentText;
    if(prevKey){
      //Parse the prior split section
      obj[prevKey] = quoteKeysAndParse(text[0]);
    }
    prevKey = key;
  }
  
  //Make sure we process the last section
  if(prevKey){
    obj[prevKey] = quoteKeysAndParse(text[1]);
  }
  return obj;
}

fetch('http://newsrack.in/stories/servelots/iihs_feeds/16.json')
.then(response => response.text())
.then(parseJSON)
.then(data => {
  console.log("data",data);
  console.log("datavalue",data["_nr_stories"][0].title);
});
}
 
}