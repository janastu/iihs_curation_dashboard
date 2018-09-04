import { Component,Input,OnInit,Output,EventEmitter } from '@angular/core';
import { Router,ActivatedRoute } from "@angular/router";
import { Global } from '../../global';
import {NgbDropdownConfig} from '@ng-bootstrap/ng-bootstrap';
import { BoardService } from '../../../services/board-service';
import { Userservice } from '../../../services/userservice';
import { GroupService } from '../../../services/group-service';
import { DataService } from '../../../services/data-service';
import { FeedService } from '../../../services/feed-service';
import { ComponentsService } from '../../../services/components-service';
import { Utilities } from '../../Utilities/utilities';//Import utilities to perform sorting and filtering
import * as _ from 'lodash';
import { DatePipe,Location } from '@angular/common';
@Component({
    selector: 'app-sidebar',
    templateUrl: './sidebar.component.html',
    providers: [NgbDropdownConfig],
    styleUrls: ['./sidebar.component.scss']
})

export class SidebarComponent implements OnInit{

    user:any;
    groupname:any;
    isActive = false;
    showMenu = '';
    selected:any;
    selectedlevel:any;
    groups:any=[];
    boards:any=[];
    categories:any=[];
    showGroups:any;
    archivesurl:any;
    eventCalled() {
        this.isActive = !this.isActive;
    }
    addExpandClass(element: any) {
        if (element === this.showMenu) {
            this.showMenu = '0';
        } else {
            this.showMenu = element;
        }
    }
    addFeedClass(element: any) {

        if (element === this.showMenu) {

            this.showMenu = '0';
        } else {

            this.showMenu = element;

        }
    }

   select(item){
        this.selected = (this.selected === item ? null : item);
     }
     isactive(item){
       return this.selected === item;
     }
     selectlevel(item){
          this.selectedlevel = (this.selectedlevel === item ? null : item);
       }
       isactivelevel(item){
         return this.selectedlevel === item;
       }



    constructor(public router:Router,public datepipe:DatePipe,public variab:Global,config: NgbDropdownConfig,
      public boardservice:BoardService,public userservice:Userservice,public dataservice:DataService,
      public groupService:GroupService,public route:ActivatedRoute,public util:Utilities,public service:FeedService,public componentsService:ComponentsService){


    }
    ngOnInit(){



      this.user = localStorage.getItem('name');

      this.route.queryParams.subscribe(params=>{

        if(params.memberof == undefined){
          this.groupname = localStorage.getItem('group');
            //console.log("lo",this.groupname)
          this.getBoardsOngroups();
          this.getGroups();
        }
        else{
        this.groupname = params.memberof;
        localStorage.setItem('group',this.groupname)
        this.getBoardsOngroups();
        this.getGroups();
      }

      })
      //Get user subscribed feed names
       this.userservice.getUserSubscriptions().then((reswithtype:any=[])=>{
         //Store the user subscribed feed names in the Global variable
         //this.variab.categoryfeeds=res;
         this.componentsService.addCategories('add',reswithtype);

       });
       this.componentsService.getCategories().subscribe(val=>{
         this.categories = val;
       })
       //Get boardannotation and set to a service
       this.dataservice.getannotations()
       this.dataservice.annotation$.subscribe((reswithtype:any=[])=>{
         //console.log(reswithtype);
         this.componentsService.addAnnotations('add',reswithtype.rows);
       });
       //Get Readlater annotations and add to service
      /* this.dataservice.getreadlaterannotations(this.user).then((resWithType:any=[])=>{
        console.log(resWithType);
        this.componentsService.addReadLater('add',resWithType);
      });
      //Get recently read annotation and set a service
      this.dataservice.getrecentlyreadannotations(this.user).then((resWithType:any=[])=>{
        this.componentsService.addRecentlyRead('add',resWithType);
      });*/
      this.dataservice.getdeletedfeeds();


  }
  getDiffereceofFeeds(feedsarray,feedItems){



  //  if(feedsarray.length>0){
     /*  var databasefeeds = feedsarray.map(value=>{

           return value.value;

         });*/
          console.log(feedsarray.length,feedItems.length)
          var c = feedItems.filter(function(item) {
              //console.log(item);
            return !feedsarray.some(function(other) {
              //console.log(other)
              return item.title === other.value.title;
            });
          });
          console.log(c.length);
   //var res = _.difference(feedItems,databasefeeds);
     //console.log("result",res.length)

       return c;


  // }
}





    getBoardsOngroups(){
      this.util.boardsOnGroup(this.groupname).then((resWithType:any=[])=>{

        this.componentsService.addBoards('add',resWithType);


        //this.variab.boardupdated=res;
      })

      this.componentsService.getBoards().subscribe(val=>{
            this.boards = val;
          //console.log("valside",test);
      });
      /*this.boardservice.getboards().then(res=>{
        //console.log(res);
        this.variab.boardupdated = res;
       // console.log("boards",this.variab.boardupdated)
       /* boardsOnGroup.push(res);
        this.variab.boardupdated = _.flatten(boardsOnGroup)

        this.variab.boardupdated = this.variab.boardupdated.filter(board=>{
         if(board.value.group){

           return board.value.group === this.groupname;
         }

        })
        //console.log("boars",this.variab.boardupdated)
      });*/

    }
    getGroups(){
      //Get the groups the user is memberof
      this.userservice.getAuser(this.user).then(res=>{
        //console.log(res);
        this.variab.groups = res['memberof'];
      })
    }
    //Function called from html to navigate to feeds component with category name variable
    routeto(category){

        console.log("lc",category.toLowerCase())
        this.router.navigate(['/feeds'], { queryParams: { feedname: category } })
       // console.log(category);
          /*this.service.getcategoryfeeds(category).then(res=>{
                 this.variab.globalcatname = category;
                   this.variab.globalfeeds=res;
                     //console.log(this.variab.globalfeeds);
                 this.componentsService.alert(category,res);

        });*/

    }
    //Function called from html to navigate to feeds component with category name in the meta data
    routetometa(category,meta){

        this.router.navigate(['/feeds'], { queryParams: { feedname: category , subcategory:meta } });
        //this.router.navigate(['/feeds',category,{subcategory:meta}])
       // console.log(category);
          /*this.service.getcategoryfeeds(category).then(res=>{
                 this.variab.globalcatname = category;
                   this.variab.globalfeeds=res;
                     //console.log(this.variab.globalfeeds);
                 this.componentsService.alert(category,res);

        });*/

    }
    //Function called from html to navigate to boardfeeds component with boardname name variable
    routetoboard(board){

       /*this.dataservice.getboardfeeds(board).then(res=>{
           this.variab.boardfeeds = res;
           this.variab.globalboardname = board;
             this.componentsService.alertboards(board,res);

     });*/
    //  console.log(board);
        //this.router.navigate(['/boardfeeds', this.variab.groupname],{queryParams:{boardname:board}});
        this.router.navigate(['/boardfeeds', board.label],{queryParams:{id:board._id,memberof:this.groupname}})

    }
    //On choosing a group
  onChoosegroup(groupname){
    localStorage.setItem('group',groupname);
    this.showGroups=false;
   this.router.navigate(['/dashboard'],{queryParams:{memberof:groupname}});

  }
  openarchives(){
    window.open('#/mm/archives?memberof='+this.groupname);
  }
  opentodaysarchives(){
    var pub_date = new Date(); //get today's date
    var transform = this.datepipe.transform(pub_date, 'yyyy-MM-dd');//transform the date to the yyyy-mm-dd format
    window.open('#/mm/*/'+transform+'/archives?memberof='+this.groupname);
  }


}
