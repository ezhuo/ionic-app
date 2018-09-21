import {
    Component,
    Injector,
    ViewEncapsulation,
    OnInit,
    OnDestroy,
} from '@angular/core';
import { IndexControl } from '@core';

@Component({
    selector: 'layout-passport',
    templateUrl: './passport.component.html',
    styleUrls: ['./passport.component.scss'],
    encapsulation: ViewEncapsulation.None,
})
export class LayoutPassportComponent extends IndexControl
    implements OnInit, OnDestroy {
    constructor(protected injector: Injector) {
        super(injector);
    }

    ngOnInit() {
        super.ngOnInit();
    }

    ngOnDestory() {
        super.ngOnDestroy();
    }
}
