import { Component, Injector, ViewEncapsulation } from '@angular/core';
import { IndexControl } from '@core';
declare var AlloyLever;

@Component({
    selector: 'page-allowlever-demo',
    templateUrl: 'allowlever-demo.html',
    encapsulation: ViewEncapsulation.None,
})
export class AllowleverDemoPage extends IndexControl {
    constructor(protected injector: Injector) {
        super(injector);
    }

    ionViewDidEnter() {
        AlloyLever.entry('#entry2');
    }

    details(url) {
        this.ionSrv.app.openUrlByBrowser(url);
    }
}
