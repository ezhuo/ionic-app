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
    selector: 'page-work-map',
    templateUrl: 'work-map.html',
    styleUrls: [`./work-map.scss`],
    encapsulation: ViewEncapsulation.None,
})
export class WorkMapPage extends IndexControl implements OnInit, OnDestroy {
    toolbar = true;
    params = {
        draggable: true,
        click: false,
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
        this.toolbar = this.activeRoute.snapshot.params.get('toolbar');
    }

    ngOnInit() {
        super.ngOnInit();
    }

    ngOnDestory() {
        super.ngOnDestroy();
    }

    dismiss() {
        // this.viewCtrl.dismiss();
    }
}
