import { Injectable,ViewChild } from '@angular/core';
import { DataService } from '../../services/data-service';
import { FeedService } from '../../services/feed-service';//Import feed service to update feed when removed
import { BoardService } from '../../services/board-service';//Import feed service to update feed when removed
import { ArchiveService } from '../../services/archive-service';
import {Global} from '../../shared/global';
import * as _ from 'lodash'
@Injectable()

export class Utilities {
user:any;     //variable to store the username
resultFeeds:any=[];//variable to store the intermediate results
date:Date;//variable to store the current date
constructor(public dataservice : DataService,public archiveService:ArchiveService,public feedService:FeedService,
public variab:Global,public boardservice:BoardService) {
   this.date = new Date();
  this.user = localStorage.getItem('name');
}
//Function to check of any deleted feeds and pop the deleted feeds from the global buffer
// and display the rest of the feeds
checkForDeletedFeeds(feeds){
  //console.log(feeds, "deleted_feeds");
  //let hiddenfeeds:any=[];//local variable to store hidden feeds
  return new Promise(resolve=>{
    //Check if feeds is empty or not
    if(feeds.length==0){
      resolve(feeds);
    }
  //  if(this.variab.hiddenfeeds.length == 0){
      //Get the hidden feeds

      //console.log(this.dataservice.data$,"deleted");

    this.dataservice.data$.subscribe((hiddenFeedsWithType:any=[])=>{

        //console.log(hiddenFeedsWithType,feeds,"deletechanfe");
      //this.dataservice.getdeletedfeeds().then(res=>{
         //this.variab.hiddenfeeds=res;//Store the feeds in the local variable
         //console.log(this.variab.hiddenfeeds,"checkdeleted");
         if(hiddenFeedsWithType.rows.length == 0 || hiddenFeedsWithType.length == 0){
           resolve(feeds);
          }

         //To do: Manipulate feed data structure hidden true
         //Data structure to represent hidden by user
         //such that design document can filter below condition
         //Check for the hidden feeds in the annotated feeds and remove the hidden feeds
         else{

        //resolve(feeds.filter(e=> hiddenFeedsWithType.rows.indexOf(e)<0));
        //re
           hiddenFeedsWithType.rows.map(feed=>{
           //
           feeds.filter(globalfeed=>{
            //feeds= feeds.filter(item=> item.value._id == feed.value._id);
          //  console.log(feeds);
              if(globalfeed.title){
                  if(globalfeed.title == feed.value.title){
                    var i = _.indexOf(feeds,globalfeed);
                    //console.log(feeds,"beforestep1");
                    feeds.splice(i,1);

                  //  console.log(feeds,"after splice");
                    resolve(feeds);
                  }
                //
              }
            else{
              //feeds= feeds.filter(item=> item.value._id == feed.value._id);
              //resolve(feeds);
            //console.log(globalfeed.value._id,"feedvalue")
             if(globalfeed.value._id === feed.value._id){
               var i = _.indexOf(feeds,globalfeed);
              // console.log(globalfeed.value._id,"beforestep1");
               feeds.splice(i,1);

               //console.log(feeds,"after splice");
               resolve(feeds);

             }
            else{
               resolve(feeds);
               //console.log(feeds,"else");
             }
            }
           })

         })
        }
      });

  });
}
//function to check if the feeds in the board are already published
checkForPublished(boardfeeds,boardname){
  console.log(boardfeeds,boardname, "boardd_feeds");
  return new Promise(resolve=>{
   var alreadypublished:any=[];
   //this.dataservice.getannotations()
   console.log(boardfeeds,"boardfeeds")
  this.archiveService.getAlreadyPublishedfeeds(boardname).then((resWithType:any=[])=>{
      console.log(resWithType,"resWithType");

      resWithType.map(feed=>{

      boardfeeds.filter(globalfeed=>{
       //feeds= feeds.filter(item=> item.value._id == feed.value._id);
     // console.log(feeds);
//console.log(boardfeeds,"after splice");
             if(globalfeed.value._id == feed.value._id){
               var i = _.indexOf(boardfeeds,globalfeed);
               //console.log(feeds,"beforestep1");
               boardfeeds.splice(i,1);



               resolve(boardfeeds);
             }
             else{
               resolve(boardfeeds);
             }
           //
         })
       });
    /*  var datefeed = boardfeeds.map( (board, index) => {
           //console.log(alreadypublished,"published_feeds");
         return  _.filter(resWithType,function(o) {
           //console.log(o.value._id,board.value._id)
           if(o.value._id===board.value._id){
             //console.log(o)
           return o  ;
         }
         });

      });

      //Map Annos for Boards to return boolean array
      //Returns example:[true,false,true]
      //Index of output == Index of label which means label[0] and label[1]
      //is active for above output
      var publishedfeeds  =  datefeed.map(anno=>{
        //console.log(anno, "anno");
          if(anno[0]){
              return true;
           }
            else{
              return false;

          }
      });
    //  console.log(publishedfeeds);
       resolve(publishedfeeds);*/
  })
  });
}
getPublishedfeeds(boardfeeds,boardname){
  return new Promise(resolve=>{
    console.log(boardfeeds,"boardfeedspublish");
   //var alreadypublished:any=[];
    this.archiveService.getAlreadyPublishedfeeds(boardname).then((resWithType:any=[])=>{
          //alreadypublished=res;

      resWithType.map(pub=>{
        boardfeeds= boardfeeds.filter(item=> item.value._id === pub.value._id);

        resolve(boardfeeds);
      })




    })
  });

}
//Function to filter the feeds on date
filterDate(category,date){
  var date = date;
  //Parse the from and to dates to timestamp to filter

  //var fromdate = Date.parse(date.changefrom);
  //var todate = Date.parse(date.changeto);
  var fromdate = new Date(date.changefrom);
 var todate = new Date(date.changeto);
  console.log(date.changefrom,todate,"fromdate n todate");

  return new Promise(resolve=>{

      this.feedService.getFeedsOnDate(category,fromdate,todate).then(res=>{
        console.log(res);
        resolve(res);
      });
      //Filter the globalfeeds ondate and store in the local variable feeds
  /*this.resultFeeds =  feeds.filter((res)=>{


    //Check if from date less than to date
    if(fromdate<=todate){
      //Get the date from every feed in the database and check if it exists between
      //the given from and to date
      //console.log(res.value.date);
     if(fromdate<=Date.parse(res.value.date) && todate>=Date.parse(res.value.date)){

        return res;
      }
      //Alert if no feeds between the from and to dates
      else{

      }
    }
    //Alert if the from date is greater than to date
    else{

    }
  });*/

  //resolve(this.resultFeeds);
  })
}
//Function to sort the feeds on descending order from latest
sortdescending(feeds){
  //console.log(feeds, "sortdescending");
  return new Promise(resolve=>{
    this.resultFeeds = feeds.sort(function(a, b) {
     // console.log("datea",a,b)
      return new Date(b.value.date || b.value.value.date).getTime() - new Date(a.value.date || a.value.value.date).getTime()
    });
    //console.log("sorted util",this.resultFeeds)
    resolve(this.resultFeeds);
  });
}
//Function to sort the feeds on ascending order from oldest
sortascending(feeds){
  //console.log(feeds, "sortascending");
  return new Promise(resolve=>{
    this.resultFeeds = feeds.sort(function(a, b) {
      return new Date(a.value.date).getTime() - new Date(b.value.date).getTime()
    });
    resolve(this.resultFeeds);
  });
}
//Click hide to remove the feed and push to trashbox
 hide(feeditem,index){
   //console.log("hid",feeditem);
   let model = {
     "@context": "http://www.w3.org/ns/anno.jsonld",
     "type": "Annotation",
     "creator": this.user,
     "created": this.date.getTime(),
     "modified": this.date.getTime(),
     "generator": "mm_2017_v1",
     "generated": this.date.getTime(),
     "target": feeditem,
     "hidden":true
   }

   //check if the url is trashbox and alert cant remove from trashbox
   /*if(this.router.url === '/trashbox'){
     this.alertremove=true
   }
   //Add a object hide feed with properties hidefeed and hiddenby and update
 else{*/
  return new Promise(resolve=>{
    console.log(resolve, "promise_resolve");
  feeditem.hidefeed={'hidefeed':true,'hiddenby':this.user};
    //console.log(feeditem);

      // console.log("de",index);
        this.dataservice.addtodatabase(model).then(res=>{
        console.log(res);
         if(res['ok'] == true){
           this.feedService.updatefeed(feeditem).then(res=>{
             console.log(res);
             if(res['ok'] == true){
              resolve(res);
              }
       });

     }
   })
  });


  }
  //Function to get boards on groupS
  boardsOnGroup(groupname){
  return new Promise(resolve=>{
  this.boardservice.getboards().then((resWithType:any=[])=>{
    //console.log(res, "board_service");
  //  this.variab.boardupdated = res;
   // console.log("boards",this.variab.boardupdated)
   /* boardsOnGroup.push(res);
    this.variab.boardupdated = _.flatten(boardsOnGroup)*/

  var boards = resWithType.filter(board=>{
        //console.log(board.value);
     if(board.value.group){

       return board.value.group === groupname;
     }

    })
  // console.log("update",this.variab.boardupdated);
    resolve(boards);
   //console.log(boards, "boardupdated");
    //console.log("boars",this.variab.boardupdated)
  });
  })
}

 //}


}
