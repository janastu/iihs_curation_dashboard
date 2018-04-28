import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { Router } from '@angular/router';
import { Cookie } from 'ng2-cookies/ng2-cookies';
@Injectable()
export class AuthGuard implements CanActivate {

    constructor(private router: Router) { }

    canActivate() {
        if (Cookie.get('isLoggedin')) {
            return true;
        }

        this.router.navigate(['/login']);
        return false;
    }
}
