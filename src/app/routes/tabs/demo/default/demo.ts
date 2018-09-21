import {
    Component,
    Injector,
    OnInit,
    OnDestroy,
    ViewEncapsulation,
} from '@angular/core';
import { IndexControl } from '@core';

@Component({
    selector: 'page-contact',
    templateUrl: 'demo.html',
    styleUrls: [`./demo.scss`],
    encapsulation: ViewEncapsulation.None,
})
export class DemoPage extends IndexControl implements OnInit, OnDestroy {
    constructor(protected injector: Injector) {
        super(injector);
    }

    ngOnInit(): void {
        super.ngOnInit();
    }

    ngOnDestroy(): void {
        super.ngOnDestroy();
    }
}
