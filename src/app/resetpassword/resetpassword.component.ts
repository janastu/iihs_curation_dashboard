import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../router.animations';
import { FormBuilder,Validators, FormGroup} from '@angular/forms';
import { Router,ActivatedRoute } from '@angular/router';
import { Userservice } from '../services/userservice';
import { Global } from '../shared';
import {NgbAlertConfig} from '@ng-bootstrap/ng-bootstrap';
@Component({
    selector: 'app-resetpassword',
    templateUrl: './resetpassword.component.html',
    styleUrls: ['./resetpassword.component.scss'],
    animations: [routerTransition()],
    providers: [NgbAlertConfig]
})
export class ResetpasswordComponent implements OnInit {

    loginForm: FormGroup;
    username = this.formBuilder.control('', [Validators.required]);
    password = this.formBuilder.control('', [Validators.required]);
    alertsuccess: boolean = false;
    alertauth: boolean = false;
    alertmissing: boolean = false;
    errormessage: any;
    tokenfromurl: any;
    urlstatus: any;
    constructor(public router: Router, public activatedRoute: ActivatedRoute, public formBuilder: FormBuilder, private userService: Userservice, public ngAlert: NgbAlertConfig, public variab: Global) {


    }

    ngOnInit() {
        this.loginForm = this.formBuilder.group({

            username: this.username,
            password: this.password

        });


        this.activatedRoute.queryParams.subscribe(params => {
            if (params['token']) {
                this.urlstatus == true;
                this.tokenfromurl = params['token'];
                console.log(this.tokenfromurl); // Print the parameter to the console. 

            }
            else {
                this.tokenfromurl = ''

            }
        });
    }

    reset() {
        if (this.username.value !== '' || this.password.value !== '') {
            console.log("a", this.username.value);
            if (this.username.value == this.password.value) {
                this.userService.resetPassword(this.tokenfromurl, this.password.value).then(response => {
                    console.log("re", response);
                    if (response['success']) {
                        //alert('Login Successful');
                        this.alertsuccess = true;
                        this.ngAlert.type = 'success';
                        this.router.navigate(['/login']);
                    }
                    else {
                        console.log('not changed');
                    }
                });
            }
            else {
                this.alertmissing = true;
                console.log("not match");
            }
        }
        else {
            this.alertauth = true;
        }
    


}
    public closeAlert() {
        this.alertsuccess=false;
        this.alertauth = false;
        this.alertmissing = false;
    }

}
