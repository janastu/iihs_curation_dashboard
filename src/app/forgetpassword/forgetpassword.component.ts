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
   // Variable declarations
    loginForm:FormGroup;              
    email=this.formBuilder.control('', [Validators.required]);
    alertsuccess:boolean = false; //Alert variable to show sucess state
    alertauth:boolean= false;     //Alert variable to show authentication failure
    alertmissing:boolean=false;    //Alert variable to show missing from values
    //errormessage:any;         
    //tokenfromurl: any;
    //urlstatus: any;

    constructor(public router: Router,public activatedRoute:ActivatedRoute, public formBuilder:FormBuilder,private userService:Userservice,public ngAlert:NgbAlertConfig,public variab:Global) {
              

            }

  ngOnInit() {
  //Validate the email input and define in the form variable
    this.loginForm = new FormGroup({
        
        'email': new FormControl(null, [Validators.required, Validators.email])
       
    });
  }
        
//Function called when clicked on reset button
  reset(){
   //Get the email value from the form input
   let email=this.loginForm.controls['email'].value
   //Check if the email input is empty
    if (email!=null) {
      //If not empty,call the service function by passing the input email as parameters
      this.userService.onforget(email).then(response => {
        //console.log("re", response);
         //If the response is success,give feedback to the user as mail sent or show error
          if (response['success']) {
      //alert('Login Successful');
            this.alertsuccess = true;
            this.ngAlert.type = 'success';
            setTimeout(() => this.alertsuccess = false, 2000);
          }
          else if (response['error']) {
            this.alertauth = true;
            setTimeout(() => this.alertsuccess = false, 2000);
          }

      });
    }
    else{
      this.alertmissing = true;
      setTimeout(() => this.alertmissing = false, 2000);
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
//Function to close the alerts 
  public closeAlert() {
    this.alertsuccess=false;
    this.alertauth = false;
    this.alertmissing = false;
  }

}
