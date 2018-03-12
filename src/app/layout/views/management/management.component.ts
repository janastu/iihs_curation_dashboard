import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../../../router.animations';
import { FormBuilder,Validators,FormGroup, FormControl} from '@angular/forms';
import { GroupService } from '../../../services/group-service';
import { Userservice } from '../../../services/userservice';
import { Global } from '../../../shared';
import {NgbAlertConfig} from '@ng-bootstrap/ng-bootstrap';
import {Subject} from 'rxjs/Subject';
import {debounceTime} from 'rxjs/operator/debounceTime';
import { Router,ActivatedRoute } from '@angular/router';
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
  requireduser:any;
  requiredadmin:any;
  mailsuccess: any;
  catvalue:any;
  mygroups:any=[];
  userform:FormGroup;
  name = this.formBuilder.control('',);
  mail = this.formBuilder.control('',);
  usertype = this.formBuilder.control('',);
  selectgroup = this.formBuilder.control('',);
  displayMembers:any=[];
 groupform: FormGroup;
 gpname = this.formBuilder.control('', [Validators.required]);

 
  constructor(public formBuilder: FormBuilder, public groupService:GroupService,public userService:Userservice,public ngAlert:NgbAlertConfig,public router:Router,public variab:Global) { }

  ngOnInit() {
    
    this.user = localStorage.getItem('name');

    this.groupname = localStorage.getItem('group');

    this.userform = new FormGroup({
        'name': new FormControl(null, [Validators.required]),
        'mail': new FormControl(null, [Validators.required, Validators.email]),
        'usertype': new FormControl(),
        'selectgroup': new FormControl()
    });

    this.groupform=this.formBuilder.group({
      gpname: this.gpname
    });
    this.groupService.getgroups().then(res=>{
      this.groups = res;
       this.groups.filter(group=>{
         if(group.key === this.groupname){
          this.displayMembers =  group.value.members;  
           console.log("mem",this.displayMembers);
         }
          
        });
       
    });

    this.userService.getAuser(this.user).then(res=>{
      this.mygroups = res['memberof'];
    })
  }
  //Function to add user to a group
  addNewUser() {
  //console.log('asd', this.name.value, this.mail.value, this.usertype.value, this.selectgroup.value);
  var name = this.userform.controls.name.value;
  var mail = this.userform.controls.mail.value;
  var group = this.userform.controls.selectgroup.value;
  var usertype = this.userform.controls.usertype.value;
  console.log('asd',usertype);
  if (name === '' || mail === '' || group === '' || usertype ==='')
  {
     //console.log("gp", this.gpname.value);
      this.requireduser = true;
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

    this.userService.getAuser(this.user).then(response=>{
      if(response['type'] === 'admin'){
        this.groupService.getgroups().then(res=>{
          groupnames = res;
          //console.log("groupname", groupnames);
          groupnames.map(groupname=>{
            if (groupname.key===group){
              groupname.value.members.push({ 'name':name,'email': mail, 'type': usertype});
              
          //console.log('asd', groupname);
             this.userService.sendConfirmEmail(mail,group,usertype).then(res=>{
          //console.log('in com', res);
                if (res === true){
                  
                  this.groupService.update(groupname.value).then(res=>{
                      if(res['ok'] == true){
                        this.mailsuccess = true;
                        this.ngAlert.type = 'success';
                        this.displayMembers.push({ 'name':name,'email': mail, 'type': usertype});
                      }
                  });
                }
              });
            }
          })
        });
      }
      else{
         this.requiredadmin=true;
         this.ngAlert.type='warning';
      }
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

    let doc={
      'groupname':this.gpname.value,
      'owner':this.user,
      'members':[],
      'boards':[]

    }

    if (this.gpname.value =='') {
      //console.log("gp", this.gpname.value);
      this.requiredsuccess = true;
      this.ngAlert.type = 'warning';
    }
    else {
    //console.log("gpsa", this.gpname.value);
      this.userService.getAuser(this.user).then(response=>{
        if(response['type'] === 'admin'){
          //console.log("can add group");
        //console.log("dov",doc);
        
        
          this.groupService.addGroupDb(doc).then(result => {

            console.log('resofgroup', result)
            if (result ===true) {
              this.groups.push({ value: doc });
              this.alertsuccess=true;
              this.ngAlert.type = 'success';
              this.groupname='';
              this.userService.getAuser(this.user).then(user=>{
                if(user['memberof']){
                  user['memberof'].push(this.gpname.value);
                  console.log("ass",user);
                 this.userService.updateAuser(user);
                }
                else{
                user['memberof']=[];
                user['memberof'].push(this.gpname.value);
                console.log("na",user);
                this.userService.updateAuser(user);
                } 
                //console.log(user);
                
              })  
            }
          });
        }
        else{
          this.requiredadmin=true;
          this.ngAlert.type='warning';
        }
      }) 
    }
  }
  public closeAlert() {
      this.alertsuccess=false;
      this.mailsuccess=false;
      this.requiredsuccess=false;
      this.requiredadmin=false;
      this.requireduser=false;
  }
  //On choosing a group
  onChoosegroup(groupname){
    localStorage.setItem('group',groupname);
   this.router.navigate(['/dashboard'],{queryParams:{memberof:groupname}});
   
  }

}
/*class Contact{
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
}*/
