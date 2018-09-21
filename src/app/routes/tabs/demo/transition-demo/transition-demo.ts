import { Component, Injector,ViewEncapsulation } from '@angular/core';
import { IndexControl } from '@core';
import { ModalScalePage } from './modal-scale/modal-scale';
import { ModalFromRightPage } from './modal-from-right/modal-from-right';

/**
 * Generated class for the TransitionDemoPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@Component({
    selector: 'page-transition-demo',
    templateUrl: 'transition-demo.html',
    encapsulation: ViewEncapsulation.None,
})
export class TransitionDemoPage extends IndexControl {
    constructor(protected injector: Injector) {
        super(injector);
    }

    scaleModalScalePage() {
        this.modalSrv.create(
            ModalScalePage,
            {},
            {
                enterAnimation: 'modal-scale-enter',
                leaveAnimation: 'modal-scale-leave',
            },
        );
    }

    presentModalFromRightPage() {
        this.modalSrv.create(
            ModalFromRightPage,
            {},
            {
                enterAnimation: 'modal-from-right-enter',
                leaveAnimation: 'modal-from-right-leave',
            },
        );
    }
}
