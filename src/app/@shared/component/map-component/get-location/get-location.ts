import {
    Component,
    Injector,
    OnInit,
    OnDestroy,
    ViewEncapsulation,
    Input,
} from '@angular/core';
import { IndexControl } from '@core';

@Component({
    selector: 'page-get-location',
    templateUrl: 'get-location.html',
    styleUrls: [`./get-location.scss`],
    encapsulation: ViewEncapsulation.None,
})
export class GetLocationPage extends IndexControl implements OnInit, OnDestroy {
    params = {
        draggable: true,
        click: true,
        searchBar: true,
        navigation: true,
        address: '',
        position: {
            lng: '',
            lat: '',
        },
    };

    constructor(protected injector: Injector) {
        super(injector);
        Object.assign(
            this.params,
            this.activeRoute.snapshot.params.get('params'),
        );
    }

    ngOnInit() {
        super.ngOnInit();
    }

    ngOnDestory() {
        super.ngOnDestroy();
    }

    save() {
        console.log(this.params.position);
    }
}
