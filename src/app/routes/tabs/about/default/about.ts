import { Component, ViewEncapsulation, Injector } from '@angular/core';

import { IndexControl } from '@core';
import { PopoverPage } from '../about-popover/about-popover';

@Component({
    selector: 'page-about',
    templateUrl: 'about.html',
    styleUrls: ['./about.scss'],
    encapsulation: ViewEncapsulation.None,
})
export class AboutPage extends IndexControl {
    conferenceDate = '2047-05-17';

    constructor(protected injector: Injector) {
        super(injector);
    }

    async presentPopover(event: Event) {
        const popover = await this.modalSrv.popoverCtrl.create({
            component: PopoverPage,
            event,
        });
        await popover.present();
    }
}
