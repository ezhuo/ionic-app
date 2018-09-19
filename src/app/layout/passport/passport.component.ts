import { Component, Injector, OnInit, OnDestroy } from '@angular/core';
import { AppControl } from '@core';

@Component({
    selector: 'layout-passport',
    templateUrl: './passport.component.html',
    styleUrls: ['./passport.component.scss'],
})
export class LayoutPassportComponent extends AppControl
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
