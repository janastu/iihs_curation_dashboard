import { Component, OnInit } from '@angular/core';
import { FormBuilder,Validators, FormGroup} from '@angular/forms';
import { routerTransition } from '../../router.animations';
import { Service } from '../../services/services';
@Component({
    selector: 'app-landing',
    templateUrl: './landing.component.html',
    styleUrls: ['./landing.component.scss'],
    animations: [routerTransition()]
})
export class LandingComponent implements OnInit {
	feeds:any=[];
    usersinfo:any=[];
    usertypes:any=[{name:'admin'
    },{name:'student'}]
    loginForm:FormGroup;
    name = this.formBuilder.control('', [Validators.required]);
    mail = this.formBuilder.control('', [Validators.required]);
    usertype = this.formBuilder.control('', [Validators.required]);
    constructor(public service:Service, public formBuilder: FormBuilder) {
    }

    ngOnInit() {
    	this.service.getAll().then(result=>{

this.feeds= result["_nr_stories"];
console.log("feeds",this.feeds);
});
        this.loginForm = this.formBuilder.group({

          name: this.name,
          mail: this.mail,
          usertype: [this.usertypes.name]
        });
    }
    adduser(event){
        //console.log("adding user",this.loginForm.value.mail);
        this.usersinfo.push(this.loginForm.value);
        event.preventDefault();
        console.log("adding user",this.usersinfo);


    }
    display()
    {
        
    }
   
}
