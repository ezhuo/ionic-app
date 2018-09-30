import {
    AfterViewInit,
    Component,
    ViewEncapsulation,
    Injector,
} from '@angular/core';
import { IndexControl } from '@core';

import { UserData } from '@shared/data/user-data';

@Component({
    selector: 'page-account',
    templateUrl: 'account.html',
    styleUrls: ['./account.scss'],
    encapsulation: ViewEncapsulation.None,
})
export class AccountPage extends IndexControl implements AfterViewInit {
    username: string;

    constructor(protected injector: Injector) {
        super(injector);
    }

    get userData() {
        return this.injector.get(UserData);
    }

    ngAfterViewInit() {
        this.getUsername();
    }

    updatePicture() {
        console.log('Clicked to update picture');
    }

    // Present an alert with the current username populated
    // clicking OK will update the username and display it
    // clicking Cancel will close the alert and do nothing
    async changeUsername() {
        const alert = await this.noticeSrv.alertCtrl.create({
            header: 'Change Username',
            buttons: [
                'Cancel',
                {
                    text: 'Ok',
                    handler: (data: any) => {
                        this.userData.setUsername(data.username);
                        this.getUsername();
                    },
                },
            ],
            inputs: [
                {
                    type: 'text',
                    name: 'username',
                    value: this.username,
                    placeholder: 'username',
                },
            ],
        });
        await alert.present();
    }

    getUsername() {
        this.userData.getUsername().then(username => {
            this.username = username;
        });
    }

    changePassword() {
        console.log('Clicked to change password');
    }

    logout() {
        
    }

    support() {
        this.route.navigateByUrl('/support');
    }
}
