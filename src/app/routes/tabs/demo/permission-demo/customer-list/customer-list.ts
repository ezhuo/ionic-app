import { Component, Injector,ViewEncapsulation } from '@angular/core';
import { IndexControl } from '@core';

/**
 * Generated class for the CustomerListPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
    selector: 'page-customer-list',
    templateUrl: 'customer-list.html',
    encapsulation: ViewEncapsulation.None,
})
export class CustomerListPage extends IndexControl {
    constructor(protected injector: Injector) {
        super(injector);
    }

    click() {
        this.httpSrv.get('/v1/user/view/id/1').subscribe(res => {
            this.noticeSrv.alertInfo(JSON.stringify(res), '请求成功');
        });
    }
}
