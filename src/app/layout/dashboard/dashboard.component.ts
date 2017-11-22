    import { Component, OnInit } from '@angular/core';
import { FormBuilder,Validators, FormGroup} from '@angular/forms';
import { routerTransition } from '../../router.animations';
import { Service } from '../../services/services';
@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss'],
    animations: [routerTransition()]
})
export class DashboardComponent implements OnInit {
	feeds:any=[];
    contacts:any=[];
    usertypes:any=[{name:'admin'},{name:'student'}];
    //loginForm:FormGroup;
    //name = this.formBuilder.control('', [Validators.required]);
    //mail = this.formBuilder.control('', [Validators.required]);
   usertype = this.formBuilder.control('', [Validators.required]);
    constructor(public service:Service, public formBuilder:FormBuilder) {
    }

    ngOnInit() {
    	this.service.getAll().then(result=>{

this.feeds= result["_nr_stories"];
console.log("feeds",this.feeds);
})
    }
    

     addContact(name,mail,user,phone){
        let contact = new Contact(name,mail,user);
        this.contacts.push(contact);
    }
     removeContact(contact){
        let index = this.contacts.indexOf(contact);
        this.contacts.splice(index,1);
    }
}
 class Contact{
    name:string;
    mail:string;
    user:string;
    descr:string;

    constructor(name,mail,user){
        this.name=name;
        this.mail=mail;
        this.user=user;
        this.descr=this.name+'   '+this.mail+'   '+this.user;
    }
}
