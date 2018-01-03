import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../router.animations';
import { Userservice } from '../services/userservice';
import { FormBuilder,Validators, FormGroup} from '@angular/forms';
import { Router } from '@angular/router';
import {NgbAlertConfig} from '@ng-bootstrap/ng-bootstrap';
@Component({
    selector: 'app-signup',
    templateUrl: './signup.component.html',
    styleUrls: ['./signup.component.scss'],
    animations: [routerTransition()]
})
export class SignupComponent implements OnInit {

registerForm:FormGroup;
name = this.formBuilder.control('', [Validators.required]);
username = this.formBuilder.control('', [Validators.required,Validators.minLength(6),Validators.pattern('[a-zA-Z]*')]);
email = this.formBuilder.control('', [Validators.email]);
password = this.formBuilder.control('', [Validators.required,,Validators.minLength(6)]);
confirmpassword = this.formBuilder.control('', [Validators.required]);
alertsuccess:boolean = false;
alertauth:boolean= false;
errormessage:any;
    constructor(public userService:Userservice,public formBuilder:FormBuilder,public router:Router,public ngAlert:NgbAlertConfig) { }

    ngOnInit() { 
        this.registerForm = this.formBuilder.group({
            name:this.name,
            username:this.username,
            email:this.email,
            password:this.password,
            confirmpassword:this.confirmpassword

        });


    	
    }
    onregister(){
            let doc = {
                'name':this.name.value,
                'username':this.username.value,
                'email':this.email.value,
                'password':this.password.value,
                'confirmPassword':this.confirmpassword.value
            };
            console.log("doc",doc);
            this.userService.adduser(doc).then(response=>{
                //console.log("response",response);
                if(response['success']){
                    this.alertsuccess = true;
                    this.ngAlert.type = 'success';

                    this.router.navigate(['/login']);
                }
                if(response['error']){
                    if(response['validationErrors']['password']){
                        console.log("response",response['validationErrors']['password']);
                        this.alertauth=true;
                        this.errormessage= response['validationErrors']['password'];
                        this.ngAlert.type = 'danger';
                    }

                }

            });
    }
    public closeAlert() {
        this.alertsuccess=false;
        this.alertauth = false;
        
    }
}
