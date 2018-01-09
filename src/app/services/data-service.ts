import { Injectable,ViewChild } from '@angular/core';
import { Http }       from '@angular/http';
import PouchDB from 'pouchdb';
import { Settings } from './settings'
declare function emit(key: any,value:any): void;

@Injectable()

export class DataService {
  db:any;
  remote:any;
  username:any;
  password:any;
constructor(private http: Http,private settings:Settings) { 

    this.db = new PouchDB('iihs_annotation');
   
  //this.remote = 'http://192.168.1.30:5984/iihs_annotation';
  this.remote = this.settings.protocol+this.settings.host+':'+this.settings.dbannotations;
    
    
       let options = {
         live: true,
         retry: true,
         continuous: true,
         auth: {
            username: this.settings.couchdbusername,
            password: this.settings.couchdbpassword
          }
       };
    
       this.db.sync(this.remote, options);

  }


  addtodatabase(payload){
    
        this.db.post(payload, function callback(err, result) {
          if (!err) {
            console.log('Successfully posted a todo!',result);
            
          }
        });

  }
  getannotations(){ 
    console.log("amn",this.settings.dbannotations)
    var url = this.settings.protocol+this.settings.host+':'+this.settings.dbannotations+'/_design/annotations/_view/boardannotation'
    //var url = 'http://192.168.1.30:5984/iihs_annotation/_design/annotations/_view/boardannotation';
   
    console.log(url);
   return new Promise(resolve => {
     this.http.get(url).map(res=>res.json()).subscribe(result=> {
       
       resolve(result.rows);
     }, (err) =>{
       console.log(err);
     });
   });

  }
 /* getboards(){
    function map(doc) {
      if(doc.label && doc.motivation === 'identifying')
      emit(doc.label,doc);
    }
    return new Promise(resolve => {
      this.db.query(map).then(function (result) {
         
        resolve(result.rows);
      }).catch(function (err) {
      console.log(err);
      });
    });
  }*/
  getboardfeeds(board){


    //var url = this.settings.protocol+this.settings.host+':'+this.settings.dbannotations+'/_design/annotatedfeeds/_view/boardfeeds?key='+'"'+board+'"'
    var url = 'http://192.168.1.30:5984/iihs_annotation/_design/annotatedfeeds/_view/boardfeeds?key='+'"'+board+'"';
    return new Promise(resolve => {
      this.http.get(url).map(res=>res.json()).subscribe(result=> {
        
        resolve(result.rows);
      }, (err) =>{
        console.log(err);
      });
    });

  


  }
  getreadlater(usr){
     var url = this.settings.protocol+this.settings.host+':'+this.settings.dbannotations+'/_design/annotations/_view/readlater?key='+'"'+usr+'"';
    //var url = 'http://192.168.1.30:5984/iihs_annotation/_design/annotations/_view/readlater?key='+'"'+usr+'"';
    console.log(url)
    return new Promise(resolve => {
      this.http.get(url).map(res=>res.json()).subscribe(result=> {
        
        resolve(result.rows);
      }, (err) =>{
        console.log(err);
      });
    });


  }
  getrecentlyread(usr){
   //var url = this.settings.protocol+this.settings.host+':'+this.settings.dbannotations+'/_design/annotations/_view/recentlyread?key='+'"'+usr+'"';
  var url ='http://192.168.1.30:5984/iihs_annotation/_design/annotations/_view/recentlyread?key='+'"'+usr+'"';

    return new Promise(resolve => {
      this.http.get(url).map(res=>res.json()).subscribe(result=> {
        //console.log(result.rows)
        resolve(result.rows);
      }, (err) =>{
        console.log(err);
      });
    });


  }
  /*updatedoc(doc){
   this.db.put(doc).then(function (response) {
     // handle response
     console.log(response)
   }).catch(function (err) {
     console.log(err);
   });
  }*/
 
  getalldeletedfeeds(){
    var url = this.settings.protocol+this.settings.host+':'+this.settings.dbannotations+'/_design/annotatedfeeds/_view/alldeletedfeeds'
   // var url = 'http://192.168.1.30:5984/iihs_annotation/_design/annotatedfeeds/_view/alldeletedfeeds';
   return new Promise(resolve => {
      this.http.get(url).map(res=>res.json()).subscribe(result=> {
        //console.log(result.rows)
        resolve(result.rows);
      }, (err) =>{
        console.log(err);
      });
    });

  }
  getdeletedfeeds(category){
    var url = this.settings.protocol+this.settings.host+':'+this.settings.dbannotations+'/_design/annotatedfeeds/_view/deletedfeeds?key[1]='+'"'+category+'"'
    console.log(url)
    //var url = 'http://192.168.1.30:5984/iihs_annotation/_design/annotatedfeeds/_view/deletedfeeds?key[1]='+'"'+category+'"';
    return new Promise(resolve => {
      this.http.get(url).map(res=>res.json()).subscribe(result=> {
        //console.log(result.rows)
        resolve(result.rows);
      }, (err) =>{
        console.log(err);
      });
    });

  }

 
}