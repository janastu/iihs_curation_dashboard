import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../../../router.animations';
import { FormBuilder,Validators, FormGroup} from '@angular/forms';
import { GroupService } from '../../../services/group-service';
import { Userservice } from '../../../services/userservice';
import {NgbAlertConfig} from '@ng-bootstrap/ng-bootstrap';
import {Subject} from 'rxjs/Subject';
import {debounceTime} from 'rxjs/operator/debounceTime';

@Component({
  selector: 'app-management',
  templateUrl: './management.component.html',
  styleUrls: ['./management.component.scss'],
  animations: [routerTransition()]
})
export class ManagementComponent implements OnInit {
  contacts:any=[];
  usertypes:any=[{name:'admin'},{name:'collaborator'}];
  groupname:any;
  user:any;
  groups:any=[];
  alertsuccess:any;
  requiredsuccess: any;
  mailsuccess: any;
  catvalue:any;

  userform:FormGroup;
  name = this.formBuilder.control('', [Validators.required]);
  mail = this.formBuilder.control('', [Validators.required]);
  usertype = this.formBuilder.control('', [Validators.required]);
  selectgroup = this.formBuilder.control('', [Validators.required]);

 groupform: FormGroup;
 gpname = this.formBuilder.control('', [Validators.required]);

 
  constructor(public formBuilder: FormBuilder, public groupService:GroupService,public userService:Userservice,public ngAlert:NgbAlertConfig) { }

  ngOnInit() {
    

    this.userform = this.formBuilder.group({
       
        name:this.name,
        mail:this.mail,
        usertype:this.usertype,
    selectgroup: this.selectgroup

    });
this.groupform=this.formBuilder.group({
  gpname: this.gpname
});

    this.user = localStorage.getItem('name');
    this.groupService.getgroups().then(res=>{
      this.groups = res;
    })
  }
  //Function to add user to a group
  addNewUser() {
    console.log('asd', this.name.value, this.mail.value, this.usertype.value, this.selectgroup.value);
  var name = this.name.value;
  var mail = this.mail.value;
  var group = this.selectgroup.value;
  var usertype = this.usertype.value;
  if (this.name.value === '' || this.mail.value === '' || this.usertype.value === '' || this.selectgroup.value==='')
  {
         console.log("gp", this.gpname.value);
       this.requiredsuccess = true;
    this.ngAlert.type = 'success';
      }
      else {
    
   
    var groupnames: any = [];
    let doc = {
        'name':name,
        'email':mail,
        'usertype':usertype,
        'groupname':group
    };

    this.groupService.getgroups().then(res=>{
      groupnames = res;
      console.log("groupname", groupnames);
      groupnames.map(groupname=>{
        if (groupname.key===group)
        {
          groupname.value.members.push([{ 'name':name,'email': mail, 'type': usertype}]);
          console.log('asd', groupname);
          this.userService.sendConfirmEmail(mail,group).then(res=>{
      console.log('in com', res);
      if (res === true)
      {
           this.mailsuccess = true;
        this.ngAlert.type = 'success';
        this.groupService.update(groupname.value);
    }

      });

        }
      })

    });
   
   }

   
  }
/*
  //Function to add user to a group
   addContact(name,mail,u,group){
     var slusers:any=[];
      let contact = new Contact(name,mail,u,group);
      console.log(contact);
      this.userService.getusers().then(res=>{
        slusers=res;
        slusers.map(user=>{
          if(user.key === name){
            //check if the user is already a part of some group
            //if yes the push the group else make a property with group array
            if(user.value.memberof === undefined){
              user.value.memberof=[group];
              user.value.type=u;
             //this.userService.updateAuser(user.value);
            }
            else{
              user.value.memberof.push(group);
              //this.userService.updateAuser(user.value);
            }
          console.log(user.value);
         
          //update the group with the member
            this.groups.map(usergroup=>{
              if(usergroup.key === group) {
                
                usergroup.value.members.push(name)
             // this.groupService.update(usergroup.value);
              }
            })
               
          }
        })
      });
      this.contacts.push(contact);
      
  }
  */
   removeContact(contact){
      let index = this.contacts.indexOf(contact);
      this.contacts.splice(index,1);
  }
  //Function to add group 
  addGroup(){
    if (this.gpname.value =='') {
     console.log("gp", this.gpname.value);
   this.requiredsuccess = true;
this.ngAlert.type = 'success';
  }
  else {
    console.log("gpsa", this.gpname.value);
     
         
    
   var members:any=[];
   var boards:any=[];
   let doc={
     'groupname':this.gpname.value,
     'owner':this.user,
     'members':[this.user],
     'boards':[]

   }
   //console.log("dov",doc);
   
   this.alertsuccess=true;
   this.ngAlert.type = 'success';
   this.groupname='';
   this.groupService.addGroupDb(doc).then(result => {

     console.log('resofgroup', result)
     if (result ===true) {
       this.groups.push({ value: doc });
     }

   });

}
   }
  public closeAlert() {
      this.alertsuccess=false;
      
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
