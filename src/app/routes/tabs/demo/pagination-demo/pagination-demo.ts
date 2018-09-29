import { Component, Injector, ViewEncapsulation } from '@angular/core';
import { IndexControl } from '@core';

@Component({
    selector: 'page-pagination-demo',
    templateUrl: 'pagination-demo.html',
    styleUrls: [`./pagination-demo.scss`],
    encapsulation: ViewEncapsulation.None,
})
export class PaginationDemoPage extends IndexControl {
    constructor(protected injector: Injector) {
        super(injector);
    }

    details(url) {
        this.ionSrv.app.openUrlByBrowser(url);
    }

    doSearch(pageNum) {
        console.log(pageNum);
    }
}
