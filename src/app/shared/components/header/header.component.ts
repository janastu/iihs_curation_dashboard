import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { Userservice } from '../../../services/userservice';
import { Cookie } from 'ng2-cookies/ng2-cookies';
@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
    user:any;
    pushRightClass: string = 'push-right';
    disableManagement:boolean=false;
    constructor(private translate: TranslateService, public router: Router,public userService:Userservice) {
        this.router.events.subscribe((val) => {
            if (val instanceof NavigationEnd && window.innerWidth <= 992 && this.isToggled()) {
                this.toggleSidebar();
            }
        });
    }

    ngOnInit() {
        this.user = localStorage.getItem('name');
        this.userService.getAuser(this.user).then(response=>{
          if(response['type'] === 'admin'){
             this.disableManagement=true;
           }
        });
        
    }

    isToggled(): boolean {
        const dom: Element = document.querySelector('body');
        return dom.classList.contains(this.pushRightClass);
    }

    toggleSidebar() {
        const dom: any = document.querySelector('body');
        dom.classList.toggle(this.pushRightClass);
    }

    rltAndLtr() {
        const dom: any = document.querySelector('body');
        dom.classList.toggle('rtl');
    }

    onLoggedout() {
        localStorage.removeItem('isLoggedin');
        localStorage.removeItem('url');
        Cookie.delete('isLoggedin');
        this.userService.logout();
    }

    changeLang(language: string) {
        this.translate.use(language);
    }
    
}
