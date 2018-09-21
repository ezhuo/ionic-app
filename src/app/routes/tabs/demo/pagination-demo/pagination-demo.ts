import { Component, Injector,ViewEncapsulation } from '@angular/core';
import { IndexControl } from '@core';

/*
 Generated class for the PaginationDemo page.

 See http://ionicframework.com/docs/v2/components/#navigation for more info on
 Ionic pages and navigation.
 */
@Component({
    selector: 'page-pagination-demo',
    templateUrl: 'pagination-demo.html',
    encapsulation: ViewEncapsulation.None,
})
export class PaginationDemoPage extends IndexControl {
    constructor(protected injector: Injector) {
        super(injector);
    }

    details(url) {
        this.ionNativeSrv.app.openUrlByBrowser(url);
    }

    doSearch(pageNum) {
        console.log(pageNum);
    }
}
