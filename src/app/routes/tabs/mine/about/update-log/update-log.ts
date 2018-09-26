import {
    Component,
    ViewEncapsulation,
    OnInit,
    OnDestroy,
    Injector,
} from '@angular/core';
import { IndexControl } from '@core';

@Component({
    selector: 'tabs-mine-update-log',
    templateUrl: 'update-log.html',
    styleUrls: [`./update-log.scss`],
    encapsulation: ViewEncapsulation.None,
})
export class TabsMineUpdateLog extends IndexControl
    implements OnInit, OnDestroy {
    versions = [];

    constructor(protected injector: Injector) {
        super(injector);
        // this.versionService.getVersionList().subscribe(versions => {
        //     this.versions = versions;
        // });
    }

    ngOnInit(): void {
        super.ngOnInit();
    }

    ngOnDestroy(): void {
        super.ngOnDestroy();
    }
}
