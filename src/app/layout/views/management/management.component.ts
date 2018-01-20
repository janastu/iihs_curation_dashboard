import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../../../router.animations';
import { FormBuilder,Validators, FormGroup} from '@angular/forms';
import { GroupService } from '../../../services/group-service';
import { Userservice } from '../../../services/userservice';
@Component({
  selector: 'app-management',
  templateUrl: './management.component.html',
  styleUrls: ['./management.component.scss'],
  animations: [routerTransition()]
})
export class ManagementComponent implements OnInit {
  contacts:any=[];
  usertypes:any=[{name:'admin'},{name:'student'}];
  groupname:any;
  user:any;
  groups:any=[];
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
      let contact = new Contact(name,mail,user,group);
      console.log(contact);
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
      this.contacts.push(contact);
  }
   removeContact(contact){
      let index = this.contacts.indexOf(contact);
      this.contacts.splice(index,1);
  }
  //Function to add group 
  addGroup(){
   var members:any=[];
   var boards:any=[];
   let doc={
     'groupname':this.groupname,
     'owner':this.user,
     'members':[],
     'boards':[]

   }
   console.log("dov",doc);
   this.groups.push({value:doc});
   this.groupService.addGroupDb(doc);
  }

}
class Contact{
    name:string;
    mail:string;
    user:string;
    descr:string;
    group:any=[];

    constructor(name,mail,user,group){
        this.name=name;
        this.mail=mail;
        this.user=user;
        this.group=group
        this.descr=this.name+'   '+this.mail+'   '+this.user+'   '+this.group;
    }
}
