import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../router.animations';
import { FormBuilder,Validators, FormGroup} from '@angular/forms';
import { Router } from '@angular/router';
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
    username=this.formBuilder.control('', [Validators.required]);
    password=this.formBuilder.control('', [Validators.required]);
    alertsuccess:boolean = false;
    alertauth:boolean= false;
    alertmissing:boolean=false;
    errormessage:any;
    constructor(public router: Router,public formBuilder:FormBuilder,private userService:Userservice,public groupService:GroupService,public ngAlert:NgbAlertConfig,public variab:Global) {
              

            }

    ngOnInit() {
        this.loginForm = this.formBuilder.group({
           
            username:this.username,
            password:this.password

        });
      
    }

    onLoggedin() {
        let credentials = {
            'username':this.username.value,
            'password':this.password.value
        };
        //console.log("log",credentials);
        
        

        this.userService.login(credentials).then(response=>{
            
            if(response['issued']){
                //alert('Login Successful');
                this.alertsuccess=true;
                this.ngAlert.type = 'success';
               localStorage.setItem('isLoggedin', 'true');
               localStorage.setItem('name', this.username.value);
               this.router.navigate(['/dashboard']);
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

}
