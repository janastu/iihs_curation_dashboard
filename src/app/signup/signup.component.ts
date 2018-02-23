    import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../router.animations';
import { Userservice } from '../services/userservice';
import { FormBuilder,Validators, FormGroup, FormControl} from '@angular/forms';
import { Router } from '@angular/router';
import {NgbAlertConfig} from '@ng-bootstrap/ng-bootstrap';
import { ActivatedRoute } from '@angular/router';
@Component({
    selector: 'app-signup',
    templateUrl: './signup.component.html',
    styleUrls: ['./signup.component.scss'],
    animations: [routerTransition()]
})
export class SignupComponent implements OnInit {

registerForm:FormGroup;
name = this.formBuilder.control('', /*[Validators.required]*/);
username = this.formBuilder.control('', /*[Validators.required,Validators.minLength(6)]*/);
email = this.formBuilder.control('', /*[Validators.email]*/);
password = this.formBuilder.control('',/* [Validators.required,,Validators.minLength(6)]*/);
confirmpassword = this.formBuilder.control('', /*[Validators.required]*/);
alertsuccess:boolean = false;
alertauth:boolean= false;
errormessage:any;

signupForm: FormGroup;
    

    urlstatus:boolean=false;
    emailfromurl: any ;
    constructor(private activatedRoute: ActivatedRoute,public userService:Userservice,public formBuilder:FormBuilder,public router:Router,public ngAlert:NgbAlertConfig) { }


    ngOnInit() { 

        this.signupForm = new FormGroup({
            'name': new FormControl(null, [Validators.required]),
            'username': new FormControl(null, [Validators.required, Validators.minLength(6)]),
            'email': new FormControl(null, [Validators.required, Validators.email]),
            'password': new FormControl(null, [Validators.required]),
            'confirmpassword': new FormControl(null, [Validators.required])
        });
        

        this.activatedRoute.queryParams.subscribe(params => {
            if (params[ 'email']){
                this.urlstatus == true;
                this.emailfromurl = params['email'];
            console.log(this.emailfromurl); // Print the parameter to the console. 
               
           }
           else{
               this.emailfromurl=''
             
            }

           });

        
       /* this.signupForm = this.formBuilder.group({
            name:this.name,
            username:this.username,
            email:this.email,
            password:this.password,
            confirmpassword:this.confirmpassword

        });*/


    	
    }

    onregister(){
            console.log(this.signupForm.controls['username'].value)
        //this.signupForm.controls['firstname'].markAsTouched()
            let doc = {
                'name':this.signupForm.controls['name'].value,
                'username':this.signupForm.controls['username'].value,
                'email':this.signupForm.controls['email'].value,
                'password':this.signupForm.controls['password'].value,
                'confirmPassword':this.signupForm.controls['confirmpassword'].value
            };
            console.log("doc",doc);
            this.userService.adduser(doc).then(response=>{
                console.log("response",response);
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
                if(response['error'] == 'Validation failed'){
                    console.log("hgfh",response['validationErrors']['username'])
                    this.alertauth=true;
                    this.errormessage = response['validationErrors']['username']
                    this.ngAlert.type = 'danger';
                    if(response['validationErrors']['username'] == undefined){
                     this.alertauth=true;
                     this.errormessage = response['validationErrors']['email']
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
