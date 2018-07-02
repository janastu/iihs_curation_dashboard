import { Component,Input,OnInit,Output,EventEmitter } from '@angular/core';
import { Router,ActivatedRoute } from "@angular/router";
import { Global } from '../../global';
import {NgbDropdownConfig} from '@ng-bootstrap/ng-bootstrap';
import { ArchiveService } from '../../../services/archive-service';
import * as _ from 'lodash';
import { DatePipe,Location } from '@angular/common';
import { Utilities } from '../../Utilities/utilities';//Import utilities to perform sorting and filtering
@Component({
    selector: 'app-sidebar-mmpublish',
    templateUrl: './sidebar-mmpublish.component.html',
    providers: [NgbDropdownConfig],
    styleUrls: ['./sidebar-mmpublish.component.scss']
})

export class SidebarMmpublishComponent implements OnInit{

    user:any;
    groupname:any;
    isActive = false;
    showMenu = '';
    selected:any;
    groups:any=[];
    showGroups:any;
    publisheddates:any=[];//Variable to store the published dates to display in the side bar
    publishedboards:any=[];//Variable to store the published boards to display in the side bar
    publishedmonths:any=[];//Variable to store the published boards to display in the side bar
    pubdatesuntransformed:any=[];
    alertNoboard:boolean=false;
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
    selectboard(item){
      this.selected = (this.selected === item ? null : item);
      //console.log(this.selected);
      var parsedDate = Date.parse(item);//parse the date to timestamp
      let isodate = new Date(parsedDate);//get the date by passing the timestamp to get the iso conversion
      var boardsGroup:any=[];
      //Api call to fetch the board names on date
      //Refactor
    this.archiveService.getPublishedboardsOnDates(isodate.toISOString()).then(res=>{
      var boardsOnDate:any=[];
      boardsOnDate =res;
      console.log(this.groupname);
      this.util.boardsOnGroup(this.groupname).then(res=>{
        boardsGroup=res;
        var groupBoards = boardsOnDate.map(pubboard=>{
            return boardsGroup.filter(groupboard=>{

              if(groupboard.key == pubboard.value){
                return pubboard;
              }
            })

        })
        this.publishedboards = _.flatten(groupBoards);
           if(this.publishedboards.length == 0){
             this.alertNoboard=true;
             setTimeout(() => this.alertNoboard, 2000);
           }
           console.log("gre",this.publishedboards);

               this.publishedmonths.map(month=>{
                 return month.items.map(date=>{
                   date['boards']=[];
                   //console.log(this.publishedboards);
                     return this.publishedboards.map(board=>{
                       if(date.date == item){
                         console.log(board);
                       date['boards'].push(board);
                         return date;
                       }
                     })



                 })
               })
               console.log(this.publishedmonths);
      })

    })
    }
    select(item){
     this.selected = (this.selected === item ? null : item);

     }
     isactive(item){
       return this.selected === item;
     }
     isactiveboard(item){
       return this.selected === item;
     }



    constructor(public router:Router,public variab:Global,config: NgbDropdownConfig,public archiveService:ArchiveService,
      public route:ActivatedRoute,public datepipe:DatePipe,public location:Location,public util:Utilities){


    }
    ngOnInit(){

      this.route.queryParams.subscribe(params=>{
        //console.log("lo",params)
        if(params.memberof == undefined){
          this.groupname = localStorage.getItem('group');

        }
        else{
        this.groupname = params.memberof;

        }

      })
      this.archiveService.getPublishedBoards().then(res=>{
        var boardsOnDate:any=[];
        var boardsGroup:any=[];
        boardsOnDate=res;
        this.util.boardsOnGroup(this.groupname).then(res=>{
          boardsGroup=res;
          var groupBoards = boardsGroup.map(groupboard=>{
              return boardsOnDate.filter(pubboard=>{

                if(groupboard.key == pubboard.value){
                  return pubboard;
                }
              })

          })
          this.publishedboards = _.flatten(groupBoards);



      //Api call to fetch the published dates
      this.archiveService.getPublishedDates().then(res=>{

          this.pubdatesuntransformed=res;
            console.log("bef",this.pubdatesuntransformed);
            var datesOnGroup = this.publishedboards.map(date=>{
              return this.pubdatesuntransformed.filter(boarddate=>{

                if(boarddate.key == date.key){
                  //console.log(date.key,boarddate.key);
                    return boarddate;
                }
              })
            })
            //console.log(this.pubdatesuntransformed);
            var flattenDates = _.flatten(datesOnGroup);
            this.pubdatesuntransformed =flattenDates.filter((set => f => !set.has(f.key) && set.add(f.key))(new Set));
            console.log("tres",this.pubdatesuntransformed);
          this.publishedmonths = this.itemsGroupedByMonth(this.pubdatesuntransformed);
          //console.log(this.publishedmonths);



      });
    });
  });
    }
    //Function to group by month
    itemsGroupedByMonth(items){
        var monthNames = ["January", "February", "March", "April", "May", "June",
            "July", "August", "September", "October", "November", "December"
            ];
       var groups = [[], [], [], [], [], [], [], [], [], [], [], [],],
       itemGroupedByMonths = [];

        for (var i = 0; i < items.length; i++) {
      //console.log(items[i].key);
          var item_date = new Date(items[i].key);
          groups[item_date.getMonth()].push({'date':this.datepipe.transform(items[i].key, 'yyyy-MM-dd')});
        }
        for (var i = 0; i < groups.length; i++) {
          if (groups[i].length) {
            itemGroupedByMonths.push({
              month: monthNames[i],
              items: groups[i]
            });

          }
        }
        return itemGroupedByMonths;
    }


    //Function called from html to filter the feeds on date
    routetodateboard(date,board){
      console.log(board,date)
      this.router.navigate(['/mm',board,date,'archives']);

    }
    //On choosing a group
    onChoosegroup(groupname){
      localStorage.setItem('group',groupname);
      this.showGroups=false;
     this.router.navigate(['/dashboard'],{queryParams:{memberof:groupname}});
    }
    opentodaysarchives(n){
      this.router.navigate(['mm','*',n,'archives'])
    }

}
