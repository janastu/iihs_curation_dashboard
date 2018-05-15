import { Injectable,ViewChild } from '@angular/core';
import { Http,RequestOptions,Headers }       from '@angular/http';
import { Settings } from './settings';
import { Global } from '../shared/global'
import PouchDB from 'pouchdb';
declare function emit(key: any,value:any): void;
@Injectable() 

export class DbConfig {
remotefeeds:any;//variable to store the remote url of the feeds database
remoteannos:any;//variable to store the remote url of the annotations database
remotegroups:any;//variable to store the remote url of the groups database
remoteboards:any;//variable to store the remote url of the boards database
remotearchives:any;//variable to store the remote url of the archives database
auth:any;//varable to store the auth object
//test:any;//chek if pouchdb instance changes
  constructor(private http: Http, private settings:Settings,public variab:Global) {
  	
  	    this.auth={
  			      username:this.settings.couchdbusername,
  			      password:this.settings.couchdbpassword
  	        }


  }
  //Database setup for feeds before the application loads
  dbsetupfeeds(){
  	//Create pouchdb instance for feeds
  	this.variab.localfeeds = new PouchDB('feeds',{auto_compaction: true}); //create a pouchdb
    //this.test = new PouchDB('feeds');
  	//Create reomte couchdb instance for feeds
  	this.remotefeeds = new PouchDB(this.settings.protocol+this.settings.dbfeed,{
  		    auth:this.auth
  	});
    // console.log(this.auth);
  	//create design docs
  	var ddoc = {
  	  _id: '_design/feeds',
  	  views: {
  	    metacategories: {
  	      map: function (doc) {
            //console.log("doc in con",doc);
  	        if (doc.meta && !doc.hidefeed) {
              if(doc.meta.categories[0]!= null){
  	          emit([doc.meta.categories[0],doc.pubDate],doc);
              }
  	        }
  	      }.toString()
  	    },
  	    latestoldestcategory: {
  	    	map: function (doc) {
  	    	  if (doc.meta && !doc.hidefeed) {
  	    	    emit([doc.feednme,doc.pubDate],doc);
  	    	  }
  	    	}.toString()
  	    }
  	  }
  	}
    var filterdoc = {
          _id: '_design/feedsfilter',
          _rev:'',
          filters:{
            latestoldestcategory: function (doc,req) {
                if (doc.feednme==req.query.category ) {
              
                  return doc;
              
                }
              }.toString(),
            metacategories: function (doc,req) {

                if (doc.meta.categories[0]==req.query.category) {

                  return doc;
                }
              }.toString()
            
          }
    }
    
    var testdoc = this.createDesignDoc('feeds_filter', function (doc) {
      emit(doc.pubdate, doc);
    });
    console.log(testdoc);
    this.variab.localfeeds.put(testdoc).catch(function (err) {
         //console.log(err);
         if (err.name !== 'conflict') {
           throw err;
         }
         // ignore if doc already exists
     })
    
    
   /* var linkdoc = {
          _id: '_design/links',
          views: {
            link: {
              map: function (doc) {
                emit(doc.meta.link, doc.title);
              }.toString(),
              reduce: function (doc) {
                return null;
              }.toString()
            }

          }

    }*/
   
    // save and update the design doc
    this.getFeedDesignDoc(ddoc).then(res=>{
      //console.log(res);
     if(res['status'] == 404){
         console.log("dd",ddoc);
       this.variab.localfeeds.put(ddoc).catch(function (err) {
            console.log("feedsst",err);
            if (err.name !== 'conflict') {
              throw err;
            }
            // ignore if doc already exists
        })
     }
     else{
      this.variab.localfeeds.put(res).catch(function (err) {
           // console.log(err);
            if (err.name !== 'conflict') {
              throw err;
            }
            // ignore if doc already exists
      })
     }
    })
   /* this.getFeedFilterDoc(filterdoc).then(res=>{
      console.log(res);
     if(res['status'] == 404){
       this.variab.localfeeds.put(filterdoc).catch(function (err) {
            //console.log(err);
            if (err.name !== 'conflict') {
              throw err;
            }
            // ignore if doc already exists
        })
     }
     else{
      this.variab.localfeeds.put(res).catch(function (err) {
           // console.log(err);
            if (err.name !== 'conflict') {
              throw err;
            }
            // ignore if doc already exists
      })
     }
    })*/
    /*this.variab.localfeeds.replicate.to(this.remotefeeds, {
      live: true,
      retry: true,
      back_off_function: function (delay) {
        if (delay === 0) {
          return 1000;
        }
        return delay * 3;
      }
    });*/
     
    /*this.remotefeeds.replicate.to(this.variab.localfeeds, {
      filter: 'feedsfilter/latestoldestcategory',
      query_params: {category:'Times'}
    }).then((change)=> {
      // yo, something changed!
      console.log("syncchnagefeeds",change);
    });*/
  	
    //Synch pouchdb with couchdb
  /*this.variab.localfeeds.sync(this.remotefeeds, {
  	  live: true,
  	  retry:true,
      filter: '_view',
      view: 'feeds_filter/feeds_filter'
  	}).on('change', function (change) {
  	  // yo, something changed!
  	  console.log("syncchnagefeeds",change);
  	}).on('error', function (err) {
  		console.log("syncerr",err);
  	  // yo, we got an error! (maybe the user went offline?)
  	})*/
  }
  createDesignDoc(name, mapFunction) {
    var ddoc = {
      _id: '_design/' + name,
      views: {
      }
    };
    ddoc.views[name] = { map: mapFunction.toString() };
    return ddoc;
  }
  

  //get feeds design doc to update the doc with rev
  getFeedDesignDoc(ddoc){
    return new Promise(resolve=>{
      this.variab.localfeeds.get('_design/feeds').then(function(doc) {
           ddoc._rev = doc._rev;
           resolve(ddoc);
       }).catch(err=>{
         resolve(err);
       });
    });
  }
  //get feeds filter doc to update the doc with rev
  getFeedFilterDoc(filterdoc){
    return new Promise(resolve=>{
      this.variab.localfeeds.get('_design/feedsfilter').then(function(doc) {
           filterdoc._rev = doc._rev;
           resolve(filterdoc);
       }).catch(err=>{
         resolve(err);
       });
    });
  }
  
  //Database setup for annotations before the application loads
  dbsetupannos(){

  	//Create pouchdb instance for annotations
  	 this.variab.localannotations = new PouchDB('iihs_annotation',{auto_compaction: true}); //create a pouchdb
  	   this.variab.localannotations.viewCleanup();
     //Create reomte couchdb instance for annotations 
  	 this.remoteannos = new PouchDB(this.settings.protocol+this.settings.dbannotations,{
  	           auth:this.auth,
               adapter:'http',
               auto_compaction: true
  	     });
  	 //create design docs

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
  	                   emit(doc.label[0],doc.target.value);
  	           }
  	        }.toString()
  	      },
          readlaterfeeds: {
            map: function (doc) {
              if (doc.motivation === 'bookmarking' && doc.creator && !doc.hidereadlateranno) {
                      emit(doc.creator,doc.target.value);
                           }
            }.toString()
          },
          recentlyreadfeeds: {
            map: function (doc) {
              if (doc.motivation === 'tagging' && !doc.label && !doc.hiderecenltyreadanno) {
                       emit(doc.creator,doc.target.value);
                         }
            }.toString()
          },
  	      deletedfeeds: {
  	        map: function (doc) {
  	          if (doc.hidden === true) {
  	                emit([doc.creator],doc.target);
  	                 }
  	        }.toString()
  	      },
          boardfeedsoftoday:{
            map: function (doc) {
             if (doc.label && doc.motivation === 'tagging' && !doc.hideboardanno) {
                         var i =  new Date(doc.created)
                           var m = i.toISOString();
                            emit(m, doc.target.value);
                        }
              }.toString()
          }

  	    }
  	  }
  	  


  	  // save the design doc
      this.getAnnotationsDesigndoc(ddoc).then(res=>{
  	    if(res['status'] == 404){
          //console.log("err");
          this.variab.localannotations.put(ddoc).catch(function (err) {
               //console.log(err);
               if (err.name !== 'conflict') {
                 throw err;
               }
               // ignore if doc already exists
           })
        }
        else{
         this.variab.localannotations.put(res).catch(function (err) {
               //console.log(err);
               if (err.name !== 'conflict') {
                 throw err;
               }
               // ignore if doc already exists
         })
        }
      });
  	  // save the design doc
  	  this.getAnnotatedFeedsDesigndoc(feedsdoc).then(res=>{
              console.log("anootations",res)
              if(res['status'] == 404){
                this.variab.localannotations.put(feedsdoc).catch(function (err) {
                     //console.log(err);
                     if (err.name !== 'conflict') {
                       throw err;
                     }
                     // ignore if doc already exists
                 })
              }
              else{
               this.variab.localannotations.put(res).catch(function (err) {
                     //console.log(err);
                     if (err.name !== 'conflict') {
                       throw err;
                     }
                     // ignore if doc already exists
               })
              }
      })
      //Replicate the design doc to the remote
      this.variab.localannotations.replicate.to(this.remoteannos, {
        live: true,
        retry: true,
        back_off_function: function (delay) {
          if (delay === 0) {
            return 1000;
          }
          return delay * 3;
        }
      });
     /* this.variab.localannotations.sync(this.remoteannos, {
        live: true,
        retry:true,
        auth:this.auth
      }).on('change', function (change) {
        // yo, something changed!
        console.log("syncchnage",change);
      }).on('error', function (err) {
        console.log("syncerr",err);
        // yo, we got an error! (maybe the user went offline?)
      })*/
      
      

  }
   //get annotations design doc to update the doc with rev
  getAnnotationsDesigndoc(ddoc){
    return new Promise(resolve=>{
      this.variab.localannotations.get('_design/annotations').then(function(doc) {
          ddoc._rev = doc._rev;
           resolve(ddoc);
       }).catch(err=>{
         resolve(err);
       });
    });

  }
  //get annotated feeds design doc update the doc with rev
  getAnnotatedFeedsDesigndoc(ddoc){
    return new Promise(resolve=>{
      this.variab.localannotations.get('_design/annotatedfeeds').then(function(doc) {

           ddoc._rev = doc._rev;
           resolve(ddoc);
       }).catch(err=>{
         resolve(err);
       });
    });
  }

  //Database setup for groups before app loads
  dbsetupgroups(){
  	//Create pouchdb instance for groups
  	this.variab.localgroups = new PouchDB('groups',{auto_compaction: true}); //create a pouchdb 
  	//Create reomt  e couchdb instance for groups
  	this.remotegroups = new PouchDB(this.settings.protocol+this.settings.dbgroups);
  	//Synch pouchdb with couchdb

    
      //create design docs

      var ddoc = {
        _id: '_design/groups',
        views: {
          groups: {
            map: function (doc) {
              if(doc.groupname){
                emit(doc.groupname,doc)
              }
            }.toString()
          }
        }
      }

      // save the design doc
      this.variab.localgroups.put(ddoc).catch(function (err) {
        if (err.name !== 'conflict') {
          throw err;
        }
        // ignore if doc already exists
      })
      
      
  	/*this.variab.localgroups.sync(this.remotegroups, {
  	  live: true,
  	  retry:true,
  	  auth:this.auth
  	}).on('change', function (change) {
  	  // yo, something changed!
  	  console.log("syncchnage",change);
  	}).on('error', function (err) {
  		console.log("syncerr",err);
  	  // yo, we got an error! (maybe the user went offline?)
  	})*/	

  }
  //Database setup for boards before app loads
  dbsetupboards(){
  	//Create pouchdb instance for boards
  	this.variab.localboards = new PouchDB('boards',{auto_compaction: true});
  	//Create reomte couchdb instance for boards
  	this.remoteboards = new PouchDB(this.settings.protocol+this.settings.dbboards,{
  	  	    auth:this.auth,
            adapter:'http'  
  	  });
    //create the design doc
    var ddoc = {
      _id: '_design/board',
      views: {
        boards: {
          map: function (doc) {
            if(doc.label && doc.motivation === 'identifying' && !doc.hidden){
               emit(doc.label,doc);  
           }
          }.toString()
        }
      }
    }
    this.getBoardsDesigndoc(ddoc).then(res=>{
      console.log("boards",res);
      //resolve(res);
       if(res['status']==404){
          // save the design doc
          console.log(ddoc);
          this.variab.localboards.put(ddoc).then(result=>{
            console.log("boa",result);
            //resolve(result);
          }).catch(function (err) {
            //console.log(err);
            if (err.name !== 'conflict') {
              throw err;
            }
            // ignore if doc already exists
          }); 
       }
       else{
        // save the design doc
        this.variab.localboards.put(res).catch(function (err) {
          if (err.name !== 'conflict') {
            throw err;
          }
          // ignore if doc already exists
        });
       }
    })
  	//Synch pouchdb with couchdb
  	/*this.variab.localboards.sync(this.remoteboards, {
  	  live: true,
  	  retry:true
  	}).on('change', function (change) {
  	  // yo, something changed!
  	  console.log("syncchnageboards",change);
  	}).on('error', function (err) {
  		console.log("syncerr",err);
  	  // yo, we got an error! (maybe the user went offline?)
  	})*/
  }
  //get annotated feeds design doc update the doc with rev
  getBoardsDesigndoc(ddoc){
    return new Promise(resolve=>{
      this.variab.localboards.get('_design/board').then(function(doc) {
           ddoc._rev = doc._rev;
           resolve(ddoc);
       }).catch(err=>{
         resolve(err);
       });
    });
  }


  dbsetuparchives(){
    //Create pouchdb instance for boards
    this.variab.localarchives = new PouchDB('archives',{auto_compaction: true});
    //Create reomte couchdb instance for boards
      this.remotearchives = new PouchDB(this.settings.protocol+this.settings.dbarchives,{
            auth:this.auth
      });
      
    
    //create the design doc
        var ddoc = {
          _id: '_design/archives',
          views: {
            archives: {
              map: function (doc) {
                if (doc.pub_date) {
                  emit([doc.pub_date,doc.boardname], doc);
                } 
              }.toString()
            },
            publishedfeeds:{
              map: function (doc) {
                if(doc.boardname){
                 emit(doc.boardname, doc);
                }
              }.toString()
            },
            published_date:{
              map: function (doc) {
                if(doc.pub_date){
                 emit(doc.pub_date, doc.boardname);
                }
              }.toString()
            },
            publishing_url_feed:{
              map: function (doc) {
                if(doc.publishing_url){
                  for(var i in doc.feeds){
                    emit(doc.feeds[i].id,doc.publishing_url)
                  }
                }
              }.toString()

            }

          }
        }
        var qdatedoc = {
          _id: '_design/date',
          views:{
            querydate:{
              map:function(doc){
               if(doc.pub_date){
                emit(doc.pub_date,null);
               }
              }.toString(),
              reduce: function (doc) {
                return null;
              }.toString()
            }
          }
        }
    
    //console.log("called");
   //return new Promise(resolve=>{
  
        //console.log(ddoc);
        this.getArchivesDesigndoc(ddoc).then(res=>{
          //console.log("archives",res);
          //resolve(res);
           if(res['status']==404){
              // save the design doc
              //console.log(ddoc);
              this.variab.localarchives.put(ddoc).then(result=>{
                console.log(result);
                //resolve(result);
              }).catch(function (err) {
                //console.log(err);
                if (err.name !== 'conflict') {
                  throw err;
                }
                // ignore if doc already exists
              }); 
           }
           else{
            // save the design doc
            this.variab.localarchives.put(res).catch(function (err) {
              if (err.name !== 'conflict') {
                throw err;
              }
              // ignore if doc already exists
            });
           }
        })
        this.getArchivesDateDesigndoc(qdatedoc).then(res=>{
          //console.log("archives",res);
          //resolve(res);
           if(res['status']==404){
              // save the design doc
              //console.log(ddoc);
              this.variab.localarchives.put(qdatedoc).then(result=>{
                console.log("add",result);
                //resolve(result);
              }).catch(function (err) {
                //console.log(err);
                if (err.name !== 'conflict') {
                  throw err;
                }
                // ignore if doc already exists
              }); 
           }
           else{
            // save the design doc
            this.variab.localarchives.put(res).catch(function (err) {
              
              if (err.name !== 'conflict') {
                throw err;
              }
              // ignore if doc already exists
            });
           }
        })
      //Synch pouchdb with couchdb
          /*this.variab.localarchives.sync(this.remotearchives, {
            live: true,
            retry:true
          }).on('change', function (change) {
            // yo, something changed!
            console.log("syncchnage",change);
          }).on('error', function (err) {
            console.log("syncerr",err);
            // yo, we got an error! (maybe the user went offline?)
          })*/
        
    //});   

  }
  //get annotated feeds design doc update the doc with rev
  getArchivesDesigndoc(ddoc){
    return new Promise(resolve=>{
      this.variab.localarchives.get('_design/archives').then(function(doc) {
           ddoc._rev = doc._rev;
           resolve(ddoc);
       }).catch(err=>{
         resolve(err);
       });
    });
  }
  getArchivesDateDesigndoc(ddoc){
    return new Promise(resolve=>{
      this.variab.localarchives.get('_design/date').then(function(doc) {
           ddoc._rev = doc._rev;
           resolve(ddoc);
       }).catch(err=>{
         resolve(err);
       });
    });
  }
 
}
