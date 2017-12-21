import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../router.animations';
import { FormBuilder,Validators, FormGroup} from '@angular/forms';
import { Router } from '@angular/router';
import { Userservice } from '../services/userservice';
import { ComponentsService } from '../services/components-service';
@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
    animations: [routerTransition()]
})
export class LoginComponent implements OnInit {

    loginForm:FormGroup;
    username=this.formBuilder.control('', [Validators.required]);
    password=this.formBuilder.control('', [Validators.required]);

    constructor(public router: Router,public formBuilder:FormBuilder,private userService:Userservice,public componentsService:ComponentsService) {
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
        console.log("log",credentials);

        this.userService.login(credentials).then(response=>{
            console.log("response",response);
            if(response){
               this.router.navigate(['/dashboard']);
            }
        })

        localStorage.setItem('isLoggedin', 'true');
        localStorage.setItem('name', this.username.value);
    }

}
