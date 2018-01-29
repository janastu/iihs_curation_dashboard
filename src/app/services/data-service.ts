import { Injectable,ViewChild } from '@angular/core';
import { Http,RequestOptions,Headers  }       from '@angular/http';
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
   
  //function call to create design docs
  this.createDesignDocs();

 // this.remote = 'https://login.test.openrun.net/iihs_annotattion';
 this.remote  = this.settings.protocol+this.settings.host+this.settings.dbannotations;
    console.log("remote",this.remote)

    
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
  //Design Docs
  createDesignDocs(){
  
  

    var ddoc = {
      _id: '_design/annotations',
      views: {
        boardannotation: {
          map: function (doc) {
            if (doc.label && doc.motivation ==='tagging' && !doc.hideboardanno) {
                     
                      emit(doc.label[0],doc);
                    }
          }.toString()
        },
        readlater: {
          map: function (doc) {
            if (doc.motivation === 'bookmarking' && doc.creator && !doc.hidereadlateranno) {
                    emit(doc.creator,doc);
                         }
          }.toString()
        },
        recentlyread: {
          map: function (doc) {
            if (doc.motivation === 'tagging' && !doc.label && !doc.hiderecenltyreadanno) {
                     emit(doc.creator,doc);
                       }
          }.toString()
        },
        hidden: {
          map: function (doc) {
            if (doc.hidden === true && doc.target.key) {
                    emit(doc.creator,doc);
                           }
          }.toString()
        },
        boardhidden: {
          map: function (doc) {
            if(doc.hideboardanno == true){
              emit(doc.label,doc);
            }
          }.toString()
        }

      }


    }
    var feedsdoc = {
      _id: '_design/annotatedfeeds',
      views: {
        boardfeeds: {
          map: function (doc) {
            if (doc.label && !doc.hideboardanno) {
                     emit(doc.label,doc.target.value);
             }
          }.toString()
        },
        deletedfeeds: {
          map: function (doc) {
            if (doc.hidden === true) {
                  emit([doc.creator,doc.target.value.feednme],doc.target);
                   }
          }.toString()
        },
        alldeletedfeeds: {
          map: function (doc) {
            if(doc.hidden == true){
              emit(doc.creator,doc.target.value);
            }
          }.toString()
        }

      }
    }

    // save the design doc
    this.db.put(ddoc).catch(function (err) {
      if (err.name !== 'conflict') {
        throw err;
      }
      // ignore if doc already exists
    })
    // save the design doc
    this.db.put(feedsdoc).catch(function (err) {
      if (err.name !== 'conflict') {
        throw err;
      }
      // ignore if doc already exists
    })
    
    
  

  }
  getannotations(){ 
    

   return new Promise(resolve => {
     this.db.query('annotations/boardannotation', {
           
         }).then(function (result) {
          console.log("res",result);
         resolve(result.rows);
       }).catch(function (err) {
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



    var url = this.settings.protocol+this.settings.host+this.settings.dbannotations+'/_design/annotatedfeeds/_view/boardfeeds?key='+'"'+board+'"'
    //var url = 'http://192.168.1.30:5984/iihs_annotation/_design/annotatedfeeds/_view/boardfeeds?key='+'"'+board+'"';

    return new Promise(resolve => {
      this.db.query('annotatedfeeds/boardfeeds', {
           key:[board]
         }).then(function (result) {
         console.log("res",result);
         resolve(result.rows);
       }).catch(function (err) {
         console.log(err);
       });
    });

  


  }
  getreadlater(usr){

     var url = this.settings.protocol+this.settings.host+this.settings.dbannotations+'/_design/annotations/_view/readlater?key='+'"'+usr+'"';

    //var url = 'http://192.168.1.30:5984/iihs_annotation/_design/annotations/_view/readlater?key='+'"'+usr+'"';
    console.log(url)
    return new Promise(resolve => {
      this.db.query('annotations/readlater', {
          key:usr
        }).then(function (result) {
       // console.log("res",result);
        resolve(result.rows);
      }).catch(function (err) {
        console.log(err);
      });
    });


  }
  getrecentlyread(usr){

   // var url = this.settings.protocol+this.settings.host+this.settings.dbannotations+'/_design/annotations/_view/recentlyread?key='+'"'+usr+'"';
  var url =this.settings.protocol+this.settings.host+this.settings.dbannotations+'/_design/annotations/_view/recentlyread?key='+'"'+usr+'"';


    return new Promise(resolve => {
      this.db.query('annotations/recentlyread', {
          key:usr
        }).then(function (result) {
       // console.log("res",result);
        resolve(result.rows);
      }).catch(function (err) {
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

    var url = this.settings.protocol+this.settings.host+this.settings.dbannotations+'/_design/annotatedfeeds/_view/alldeletedfeeds'

   // var url = 'http://192.168.1.30:5984/iihs_annotation/_design/annotatedfeeds/_view/alldeletedfeeds';
   return new Promise(resolve => {
      this.db.query('annotatedfeeds/alldeletedfeeds', {
          
        }).then(function (result) {
       // console.log("res",result);
        resolve(result.rows);
      }).catch(function (err) {
        console.log(err);
      });
    });

  }
  getdeletedfeeds(usr,category){

    var url = this.settings.protocol+this.settings.host+this.settings.dbannotations+'/_design/annotatedfeeds/_view/deletedfeeds?key[1]='+'"'+category+'"'

    console.log(url)
    //var url = 'http://192.168.1.30:5984/iihs_annotation/_design/annotatedfeeds/_view/deletedfeeds?key[1]='+'"'+category+'"';
    return new Promise(resolve => {
      this.db.query('annotatedfeeds/deletedfeeds', {
          key:[usr,category]
          
        }).then(function (result) {
       console.log("res",result);
        resolve(result.rows);
      }).catch(function (err) {
        console.log(err);
      });
    });

  }
  //Update database for deleted and modidifed
  updatedatabase(doc){
    this.db.put(doc).then(function (response) {
      // handle response
      console.log(response)
    }).catch(function (err) {
      console.log(err);
    });

  }

 
}