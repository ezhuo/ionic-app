import { Component, ViewEncapsulation, Injector } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UserData } from '@shared';
import { IndexControl, LoginOptions } from '@core';

@Component({
    selector: 'page-signup',
    templateUrl: 'signup.html',
    styleUrls: ['./signup.scss'],
})
export class SignupPage extends IndexControl {
    signup: LoginOptions = { username: '', password: '' };
    submitted = false;

    constructor(protected injector: Injector) {
        super(injector);
        super.__init__(this);
    }

    get userData() {
        return this.injector.get(UserData);
    }

    onSignup(form: NgForm) {
        this.submitted = true;

        if (form.valid) {
            this.userData.signup(this.signup.username);
            this.route.navigateByUrl('/app/tabs/(schedule:schedule)');
        }
    }
}
