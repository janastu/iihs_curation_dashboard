import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../router.animations';
import { Userservice } from '../services/userservice';
import { FormBuilder,Validators, FormGroup} from '@angular/forms';
import { Router } from '@angular/router';

@Component({
    selector: 'app-signup',
    templateUrl: './signup.component.html',
    styleUrls: ['./signup.component.scss'],
    animations: [routerTransition()]
})
export class SignupComponent implements OnInit {

registerForm:FormGroup;
name = this.formBuilder.control('', [Validators.required]);
username = this.formBuilder.control('', [Validators.required]);
email = this.formBuilder.control('', [Validators.required]);
password = this.formBuilder.control('', [Validators.required]);
confirmpassword = this.formBuilder.control('', [Validators.required]);
    
    constructor(public userService:Userservice,public formBuilder:FormBuilder,public router:Router) { }

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
                if(response){
                    this.router.navigate(['/login']);
                }
            });
    }
}
