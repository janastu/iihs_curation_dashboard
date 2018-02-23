import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../router.animations';
import { FormBuilder,Validators, FormGroup, FormControl} from '@angular/forms';
import { Router } from '@angular/router';
import { Userservice } from '../services/userservice';
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

    constructor(public router: Router,public formBuilder:FormBuilder,private userService:Userservice,public ngAlert:NgbAlertConfig,public variab:Global) {
              

            }

    ngOnInit() {
        /**/

        this.loginForm = new FormGroup({
            'username': new FormControl(null, [Validators.required, Validators.minLength(6)]),
            'password': new FormControl(null, [Validators.required])
        });

    }

    onforget(){
        this.userService.onforget().then(response => {
            console.log("re", response);
        });
    }
    onLoggedin() {
        console.log(this.username)
        let credentials = {
            'username':this.loginForm.controls['username'].value,
            'password':this.loginForm.controls['password'].value
        };
        console.log("log",credentials);
        
        

        this.userService.login(credentials).then(response=>{
            
            if(response['issued']){
                //alert('Login Successful');
                this.alertsuccess=true;
                this.ngAlert.type = 'success';
               localStorage.setItem('isLoggedin', 'true');
               localStorage.setItem('name', this.loginForm.controls['username'].value);
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
