import { Component, Injector ,ViewEncapsulation} from '@angular/core';
import { ModalControl } from '@core';

/**
 * Generated class for the ModalScalePage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@Component({
    selector: 'page-modal-scale',
    templateUrl: 'modal-scale.html',
    encapsulation: ViewEncapsulation.None,
})
export class ModalScalePage extends ModalControl {
    constructor(protected injector: Injector) {
        super(injector);
    }

    dismiss() {
        this.modalClose();
    }
}
