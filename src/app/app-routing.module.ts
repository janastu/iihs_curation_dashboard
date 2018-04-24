import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './shared';

const routes: Routes = [
    {
        path: '',
        loadChildren: './layout/layout.module#LayoutModule',
        canActivate: [AuthGuard]
    },
    { path: 'login', loadChildren: './login/login.module#LoginModule' },
    { path: 'signup', loadChildren: './signup/signup.module#SignupModule' },
    { path: 'resetpassword', loadChildren: './resetpassword/resetpassword.module#ResetpasswordModule' },
    { path: 'forgetpassword', loadChildren: './forgetpassword/forgetpassword.module#ForgetpasswordModule' },
    { path: 'choose-group', loadChildren: './join-group/join-group.module#JoinGroupModule'},
    {path:  'not-found', loadChildren: './not-found/not-found.module#NotFoundModule' },
    {path:  'mm/:boardname/:date/archives', loadChildren: './mmpublish/mmpublish.module#MmpublishModule' },
    //{path:  'mm/:boardname/:date', loadChildren: './mmpublish/mmpublish.module#MmpublishModule' },
    { path: 'mm/:boardname/:date', loadChildren: './published-view/published-view.module#PublishedViewModule'},
    { path: '**', redirectTo: 'not-found' }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
