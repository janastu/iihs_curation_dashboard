import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../router.animations';
import { FormBuilder,Validators, FormGroup,FormControl} from '@angular/forms';
import { Router,ActivatedRoute } from '@angular/router';
import { Userservice } from '../services/userservice';
import { Global } from '../shared';
import {NgbAlertConfig} from '@ng-bootstrap/ng-bootstrap';
@Component({
    selector: 'app-forgetpassword',
    templateUrl: './forgetpassword.component.html',
    styleUrls: ['./forgetpassword.component.scss'],
    animations: [routerTransition()],
    providers: [NgbAlertConfig]
})
export class ForgetpasswordComponent implements OnInit {

    loginForm:FormGroup;
    email=this.formBuilder.control('', [Validators.required]);
    alertsuccess:boolean = false;
    alertauth:boolean= false;
    alertmissing:boolean=false;
    errormessage:any;
    tokenfromurl: any;
    urlstatus: any;

    constructor(public router: Router,public activatedRoute:ActivatedRoute, public formBuilder:FormBuilder,private userService:Userservice,public ngAlert:NgbAlertConfig,public variab:Global) {
              

            }

  ngOnInit() {
  
    this.loginForm = new FormGroup({
        
        'email': new FormControl(null, [Validators.required, Validators.email])
       
    });
  }
        

     reset(){
    let email=this.loginForm.controls['email'].value
  if (email!=null) {


      console.log("a", email);

    this.userService.onforget(email).then(response => {
      console.log("re", response);
      if (response['success']) {
        //alert('Login Successful');
        this.alertsuccess = true;
        this.ngAlert.type = 'success';
       
      }
      else {
      
        console.log('not changed');
      }

    });
    }
    else{
  this.alertmissing = true;

  }

/*
         if (this.username.value ==this.password.value) {
             this.userService.resetPassword(this.tokenfromurl, this.password.value).then(response => {
                 console.log("re", response);
            if(response['success']){
                //alert('Login Successful');
                this.alertsuccess=true;
                this.ngAlert.type = 'success';
                this.router.navigate(['/login']);
            }
            else{
                console.log('not changed');
            }
          });
         }
         else{
        console.log("not match");
        }
        */
    }
    
    public closeAlert() {
        this.alertsuccess=false;
        this.alertauth = false;
        this.alertmissing = false;
    }

}
