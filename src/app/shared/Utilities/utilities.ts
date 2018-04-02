import { Injectable,ViewChild } from '@angular/core';
import { DataService } from '../../services/data-service';
import * as _ from 'lodash'
@Injectable()

export class Utilities {
user:any;     //variable to store the username
resultFeeds:any=[];//variable to store the intermediate results
constructor(public dataservice : DataService) { 
  this.user = localStorage.getItem('name');
}
//Function to check of any deleted feeds and pop the deleted feeds from the global buffer
// and display the rest of the feeds
checkForDeletedFeeds(feeds){
  
  let hiddenfeeds:any=[];//local variable to store hidden feeds
  return new Promise(resolve=>{
  this.dataservice.getdeletedfeeds(this.user).then(res=>{
   hiddenfeeds=res;
   console.log(hiddenfeeds)
   if(hiddenfeeds.length == 0){ 
     resolve(feeds);
    // document.getElementById('loading').style.display = 'none';
     }
    //To do: Manipulate feed data structure hidden true
    //Data structure to represent hidden by user
    //such that design document can filter below condition
   // console.log("feed",feeds);
    hiddenfeeds.map(feed=>{
       feeds.filter(globalfeed=>{
        //console.log(feed.value._id,globalfeed.value._id)
        if(globalfeed.value._id === feed.value._id){
          var i = _.indexOf(feeds,globalfeed);
          feeds.splice(i,1);
          resolve(feeds);
        }
        else{
          resolve(feeds);
        }
         
      })
        
    })
   })
  });
}
filterDate(date,feeds){
  var date = date;
  //Parse the from and to dates to timestamp to filter
  var fromdate = Date.parse(date.changefrom);
  var todate = Date.parse(date.changeto);
  
  return new Promise(resolve=>{
      //Filter the globalfeeds ondate and store in the local variable feeds
  this.resultFeeds =  feeds.filter((res)=>{


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
  });
  resolve(this.resultFeeds);
  })
}
sortdescending(feeds){
  return new Promise(resolve=>{
    this.resultFeeds = feeds.sort(function(a, b) {   
      return new Date(b.value.date).getTime() - new Date(a.value.date).getTime()
    });
    resolve(this.resultFeeds);
  });
}
sortascending(feeds){
  return new Promise(resolve=>{
    this.resultFeeds = feeds.sort(function(a, b) {
      return new Date(a.value.date).getTime() - new Date(b.value.date).getTime()
    });
    resolve(this.resultFeeds);
  });    
}
 

}