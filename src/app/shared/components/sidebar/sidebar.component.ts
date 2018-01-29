import { Component,Input,OnInit,Output,EventEmitter } from '@angular/core';
import { Router } from "@angular/router";
import { Global } from '../../global';
import {NgbDropdownConfig} from '@ng-bootstrap/ng-bootstrap';
import { BoardService } from '../../../services/board-service';
import { Userservice } from '../../../services/userservice';
import { GroupService } from '../../../services/group-service';
import { DataService } from '../../../services/data-service';
import { Service } from '../../../services/services';
import * as _ from 'lodash';
@Component({
    selector: 'app-sidebar',
    templateUrl: './sidebar.component.html',
    providers: [NgbDropdownConfig],
    styleUrls: ['./sidebar.component.scss']
})

export class SidebarComponent implements OnInit{
  
    user:any;
    
    isActive = false;
    showMenu = '';

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
    
    constructor(public router:Router,public variab:Global,config: NgbDropdownConfig,public boardservice:BoardService,public userservice:Userservice,public dataservice:DataService,public service:Service,public groupService:GroupService){
   

    }
    ngOnInit(){
      this.user = localStorage.getItem('name');

        //Get board annotations
                   this.dataservice.getannotations().then(res=>{
                     //Set result to global variable as it can be accessed outdside the component
                    this.variab.annotations=res;
                    
                    });
             //Get readlater annotations

                   this.dataservice.getreadlater(this.user).then(result=>{
                     //Set result to global variable as it can be accessed outdside the component
                       this.variab.readlaterfeeds=result;
                      
                   });
              //Get recently read annotaions
                   this.dataservice.getrecentlyread(this.user).then(result=>{
                       //Set result to global variable as it can be accessed outdside the component
                       this.variab.recentlyread=result;
                   });
          
        //Get the boards from the group the registered user belongs to
        /*this.groupService.getgroups().then(res=>{
          
            var groups:any=[];
            groups =res;
            console.log("boards",groups);
            groups.map(checkgroup=>{
              checkgroup.value.members.map(member=>{

                  if(member === this.user){
                      
                      this.variab.displayUserBoards = checkgroup.value.boards;
                      
                  }
              })
            });
        })*/
          //Get the board names to display in the sidebar and createboard component

               


                this.groupService.getgroups().then(res=>{
                  var groups:any=[];
                  groups=res;
                  
                  groups.map(group=>{
                    //Check if the logged member is part of any group
                    var checkmemberof = group.value.members.map(member=>{
                      if(member == this.user){
                        return group.value.groupname;
                      }
                    })
                    
                    //get the boards belong to a group
                    checkmemberof.map(value=>{
                      if(group.value.groupname === value){
                        this.variab.displayUserBoards = group.value.boards;
                      }
                     
                      
                    })
                    
                    //get board docs by giving group board name of the group boards

                    var boardsOnGroup:any=[];
                    
                      this.variab.displayUserBoards.map(userboard=>{
                        this.boardservice.getboards(userboard).then(res=>{
                          
                          boardsOnGroup.push(res);
                          this.variab.boardupdated = _.flatten(boardsOnGroup) 
                          console.log("er",this.variab.boardupdated);
                        });
                       
                       //
                      })
                      
                   

                  

                  });
                  


              });

                

         




        //Get the feed names to display in the sidebar and other components
        this.userservice.getUserSubscriptions().then(res=>{
           //Set result to global variable as it can be accessed outdside the component
          this.variab.categoryupdated=res;
        //  console.log(this.variab.categoryupdated)
          
        });
        


       
    }
    //Function called from html to navigate to feeds component with category name variable
    routeto(category){
        
        
        this.router.navigate(['/feeds',category] )
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
     
        this.router.navigate(['/boardfeeds', board ]);


    }
   
    
    
}
