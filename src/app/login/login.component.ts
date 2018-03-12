import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../router.animations';
import { FormBuilder,Validators, FormGroup, FormControl} from '@angular/forms';
import { Router,ActivatedRoute } from '@angular/router';
import { Userservice } from '../services/userservice';
import { GroupService } from '../services/group-service';
import { Global } from '../shared';
import {NgbAlertConfig} from '@ng-bootstrap/ng-bootstrap';
@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
    animations: [routerTransition()],
    providers: [NgbAlertConfig]
})
export class LoginComponent implements OnInit {

    loginForm:FormGroup;
    username=this.formBuilder.control('', /*[Validators.required]*/);
    password=this.formBuilder.control('',/* [Validators.required]*/);
    alertsuccess:boolean = false;
    alertauth:boolean= false;
    alertmissing:boolean=false;
    errormessage:any;
    showDialog:boolean;
    groups:any=[];

    constructor(public router: Router,public route:ActivatedRoute,public formBuilder:FormBuilder,private userService:Userservice,public ngAlert:NgbAlertConfig,public variab:Global,public groupService:GroupService) {
              

            }

    ngOnInit() {
        

        this.loginForm = new FormGroup({
            'username': new FormControl(null, [Validators.required, Validators.minLength(6)]),
            'password': new FormControl(null, [Validators.required])
        });
        //Get the url parameters ,the groupname and store the groupname in the database
        this.route.queryParams.subscribe(params=>{

            this.userService.getemail().then(res=>{
                var emailOfUsers:any=[];
                emailOfUsers=res;
                var checkforEmail = emailOfUsers.filter(email=>{
                    return email.key === params['email'];
                })
               //console.log(checkforEmail);
               if(checkforEmail.length!=0){
                   // console.log("email",checkforEmail[0].id);
                    this.userService.getAuser(checkforEmail[0].id).then(res=>{
                        var users:any=[];
                        users=res;
                        if(users.memberof){
                            users.memberof.push(params.groupname);
                            users.type = params['type'];
                           this.userService.updateAuser(users);
                        }
                        else{
                            users.memberof = [];
                            users.memberof.push(params.groupname);
                            users.type = params['type'];
                            console.log(users);
                            this.userService.updateAuser(users);
                        }
                    })
                }
            })
        })

    }

  
    onLoggedin() {
        console.log(this.username)
        let credentials = {
            'username':this.loginForm.controls['username'].value,
            'password':this.loginForm.controls['password'].value
        };
        //console.log("log",credentials);
        
        

        this.userService.login(credentials).then(response=>{
            console.log(response);
            if(response['issued']){
                //alert('Login Successful');
                this.alertsuccess=true;
                this.ngAlert.type = 'success';
               localStorage.setItem('isLoggedin', 'true');
               localStorage.setItem('name', this.loginForm.controls['username'].value);
               //check if member is partof any group or groups
               this.userService.getAuser(this.loginForm.controls['username'].value).then(userDoc=>{
                 var groupname = userDoc['memberof'];
                 console.log(groupname);
                  if(groupname){
                   if(groupname.length == 0){
                     this.router.navigate(['/dashboard'])
                    // 
                     //this.router.navigate(['/dashboard'],{queryParams:{memberof:groupname}});
                   }   
                   else if(groupname.length == 1){
                     var gname = userDoc['memberof'][0];
                     this.router.navigate(['/dashboard'],{queryParams:{memberof:gname}});
                     localStorage.setItem('group',gname);
                    // this.router.navigate(['/dashboard']);
                   }
                   else if(groupname.length>1){
                     //this.router.navigate(['/dashboard'],{queryParams:{memberof:gname}});
                     //console.log("you are part of many groups,choose 1");
                     //this.router.navigate(['/choose-group'])

                     this.groups=userDoc['memberof'];
                     this.showDialog=true;
                     console.log(this.showDialog);
                   }
                  }
                  else{
                      userDoc['memberof']=[];
                      userDoc['memberof'].push('default');
                     // console.log(userDoc);
                      this.userService.updateAuser(userDoc);
                      let doc = {
                          name:this.loginForm.controls['username'].value,
                          email:userDoc['email'],
                          type:'user'
                      }
                      console.log(doc);
                      this.groupService.getgroups().then(res=>{
                          var groups:any=[];
                          groups=res;
                          groups.map(group=>{
                              
                              if(group.key === 'default'){
                                   
                                 group.value.members.push(doc);
                                 this.groupService.update(group.value).then(res=>{
                                     //console.log(res);
                                     if(res['ok']== true){
                                       localStorage.setItem('group','default');
                                         this.router.navigate(['/dashboard'],{queryParams:{memberof:'default'}});
                                     }
                                 });
                              }
                          })
                      })
                      
                  }
               });
               //
            }
            if(response['error'] == 'Unauthorized'){
                this.alertauth = true;
                //alert(response['message'])
                this.ngAlert.type = 'danger';
                this.errormessage = response['message'];
                
            }
            if(response['error'] == 'Username or Password missing...'){
                this.alertmissing = true;
                this.ngAlert.type = 'danger';
                this.errormessage = response['error'];
                //alert(response['error'])
                
            }
        })

        
    }
    public closeAlert() {
        this.alertsuccess=false;
        this.alertauth = false;
        this.alertmissing = false;
    }
    //Dialog component to choose group to navigate to that group
    onChoosegroup(groupname){
      localStorage.setItem('group',groupname);
     this.router.navigate(['/dashboard'],{queryParams:{memberof:groupname}});
    }

}
