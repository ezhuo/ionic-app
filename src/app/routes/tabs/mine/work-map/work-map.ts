import {
    Component,
    ViewEncapsulation,
    OnInit,
    OnDestroy,
    Injector,
} from '@angular/core';
import { IndexControl } from '@core';
// import { MapLocation } from '../../../shared/map-component/map-location/map-location';

@Component({
    selector: 'tabs-mine-work-map',
    templateUrl: 'work-map.html',
    styleUrls: [`./work-map.scss`],
    encapsulation: ViewEncapsulation.None,
})
export class TabsMineWorkMap extends IndexControl implements OnInit, OnDestroy {
    // params = { ...MapLocation.defaultParams, draggable: false };

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
