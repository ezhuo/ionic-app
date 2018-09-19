import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LayoutPassportComponent } from './passport.component';
import { UserLoginComponent } from './login/login.component';
import { SignupPage } from './signup/signup';

const routes: Routes = [
    {
        path: '',
        component: LayoutPassportComponent,
        children: [
            {
                path: 'login',
                component: UserLoginComponent,
            },
            {
                path: 'signup',
                component: SignupPage,
            },
            { path: '', redirectTo: 'login', pathMatch: 'full' },
            { path: '**', redirectTo: 'login' },
        ],
    },
];

export const routedComponents = [
    LayoutPassportComponent,
    UserLoginComponent,
    SignupPage,
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class PassportRoutingModule {}
