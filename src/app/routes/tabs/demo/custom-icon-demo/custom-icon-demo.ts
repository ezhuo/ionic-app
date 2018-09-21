import { Component, Injector,ViewEncapsulation } from '@angular/core';
import { IndexControl } from '@core';

/*
  Generated class for the CustomIconDemo page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
    selector: 'page-custom-icon-demo',
    templateUrl: 'custom-icon-demo.html',
    encapsulation: ViewEncapsulation.None,
})
export class CustomIconDemoPage extends IndexControl {
    constructor(protected injector: Injector) {
        super(injector);
    }

    details(url) {
        this.ionNativeSrv.app.openUrlByBrowser(url);
    }
}
