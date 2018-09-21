import { Component, ViewEncapsulation, Injector } from '@angular/core';
import { NgForm } from '@angular/forms';
import { IndexControl } from '@core';
import { UserData } from '../../../providers/user-data';

import { UserOptions } from '../../../interfaces/user-options';

@Component({
    selector: 'page-signup',
    templateUrl: 'signup.html',
    styleUrls: ['./signup.scss'],
    encapsulation: ViewEncapsulation.None,
})
export class SignupPage extends IndexControl {
    signup: UserOptions = { username: '', password: '' };
    submitted = false;

    constructor(protected injector: Injector) {
        super(injector);
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
