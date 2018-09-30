import {
    Component,
    ViewEncapsulation,
    OnInit,
    OnDestroy,
    Injector,
} from '@angular/core';
import { IndexControl } from '@core';

import { PopoverPage } from '../about-popover/about-popover';

@Component({
    selector: 'tabs-mine',
    templateUrl: 'mine.html',
    styleUrls: [`./mine.scss`],
    // encapsulation: ViewEncapsulation.None,
})
export class TabsMine extends IndexControl implements OnInit, OnDestroy {
    userInfo;

    constructor(protected injector: Injector) {
        super(injector);
        // this.userInfo = this.globalData.user;
        this.ionSrv.events.subscribe('user:login', userInfo => {
            this.userInfo = userInfo;
        });
    }

    ngOnInit(): void {
        super.ngOnInit();
    }

    ngOnDestroy(): void {
        super.ngOnDestroy();
    }

    async presentPopover(event: Event) {
        const popover = await this.modalSrv.popoverCtrl.create({
            component: PopoverPage,
            event,
        });
        await popover.present();
    }

    loginOut() {
        // const modal = this.modalCtrl.create(LoginPage);
        // modal.present();
        // modal.onDidDismiss(userInfo => {
        //     if (userInfo) {
        //         this.userInfo = userInfo;
        //     }
        // });
    }

    exitApp() {
        this.noticeSrv
            .alertConfirm('确认退出软件？')
            .then((res: any) => {
                this.ionSrv.exitApp();
            })
            .catch((err: any) => {
                // console.log('err');
            });
    }

    notice() {
        this.noticeSrv.alertInfo('开发中...');
    }
}
