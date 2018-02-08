import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../../router.animations';
import { FormBuilder,Validators, FormGroup} from '@angular/forms';
import { GroupService } from '../../services/group-service';
import { Userservice } from '../../services/userservice';
@Component({
  selector: 'app-join-group',
  templateUrl: './join-group.component.html',
  styleUrls: ['./join-group.component.scss'],
  animations: [routerTransition()]
})
export class JoinGroupComponent implements OnInit {
  contacts:any=[];
  usertypes:any=[{name:'admin'},{name:'student'}];
  groupname:any;
  user:any;
  groups:any=[];
  catvalue:any;
  //loginForm:FormGroup;
  //name = this.formBuilder.control('', [Validators.required]);
  //mail = this.formBuilder.control('', [Validators.required]);
 //usertype = this.formBuilder.control('', [Validators.required]);
  constructor(public formBuilder:FormBuilder,public groupService:GroupService,public userService:Userservice) { }

  ngOnInit() {
    this.user = localStorage.getItem('name');
    this.groupService.getgroups().then(res=>{
      this.groups = res;
    })
  }
  //Function to add user to a group
   addContact(name,mail,user,group){
     var slusers:any=[];

      this.userService.getusers().then(res=>{
        slusers=res;
        slusers.map(user=>{
          if(user.key === name){
            //check if the user is already a part of some group
            //if yes the push the group else make a property with group array
            if(user.value.group === undefined){
              user.value.group=[group];
              this.userService.updateAuser(user.value);
            }
            else{
              user.value.group.push(group);
              this.userService.updateAuser(user.value);
            }
          console.log(user.value);
         
          //update the group with the member
            this.groups.map(usergroup=>{
              if(usergroup.key === group) {
                
                usergroup.value.members.push(name)
              this.groupService.update(usergroup.value);
              }
            })
               
          }
        })
      });
   
  }
   removeContact(contact){
      let index = this.contacts.indexOf(contact);
      this.contacts.splice(index,1);
  }
 
 addGroup(){
   var members:any=[];
   var boards:any=[];
   let doc={
     'groupname':this.groupname,
     'owner':this.user,
     'members':[this.user],
     'boards':[]

   }
  // console.log("dov",doc);
   this.groups.push({value:doc});
   this.groupService.addGroupDb(doc);
 }
 //Join to a Particular group
 joinGroup(groupname){
   this.groups.map(group=>{
     if(group.value.groupname === groupname){
       group.value.members.push(this.user);
       this.groupService.update(group);
     }
   })
 }

}

