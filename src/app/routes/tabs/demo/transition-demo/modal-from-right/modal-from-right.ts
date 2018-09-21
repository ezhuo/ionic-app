import { Component, Injector,ViewEncapsulation } from '@angular/core';
import { ModalControl } from '@core';

@Component({
    selector: 'page-modal-from-right',
    templateUrl: 'modal-from-right.html',
    encapsulation: ViewEncapsulation.None,
})
export class ModalFromRightPage extends ModalControl {
    constructor(protected injector: Injector) {
        super(injector);
    }

    dismiss() {
        this.modalClose();
    }
}
