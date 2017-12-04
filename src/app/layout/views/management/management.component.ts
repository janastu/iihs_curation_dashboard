import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../../../router.animations';
import { FormBuilder,Validators, FormGroup} from '@angular/forms';
import { Userservice } from '../../../services/userservice';
@Component({
  selector: 'app-management',
  templateUrl: './management.component.html',
  styleUrls: ['./management.component.scss'],
  animations: [routerTransition()]
})
export class ManagementComponent implements OnInit {
  contacts:any=[];
  usertypes:any=[{name:'admin'},{name:'student'}];
  //loginForm:FormGroup;
  //name = this.formBuilder.control('', [Validators.required]);
  //mail = this.formBuilder.control('', [Validators.required]);
 //usertype = this.formBuilder.control('', [Validators.required]);
  constructor(public formBuilder:FormBuilder) { }

  ngOnInit() {
  }
   addContact(name,mail,user){
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
