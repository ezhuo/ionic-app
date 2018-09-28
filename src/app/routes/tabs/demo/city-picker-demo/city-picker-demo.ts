import { Component, Injector,ViewEncapsulation } from '@angular/core';
import { IndexControl } from '@core';

/**
 * Generated class for the CityPickerDemoPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
    selector: 'page-city-picker-demo',
    templateUrl: 'city-picker-demo.html',
    encapsulation: ViewEncapsulation.None,
})
export class CityPickerDemoPage extends IndexControl {
    cityData: any[] = []; // 城市数据
    cityName = '广东省-广州市-天河区'; // 初始化城市名
    code: string; // 城市编码
    constructor(protected injector: Injector) {
        super(injector);
    }

    ionViewDidLoad() {
        // 获取城市数据
        // 实际开发中,城市数据应该从后台接口获取
        // this.demoService.geCityData().subscribe(res => {
        //     this.cityData = res;
        // });
    }

    // 城市选择器被改变时触发的事件
    cityChange(event) {
        this.code = event['region'].value;
    }

    details(url) {
        this.ionSrv.app.openUrlByBrowser(url);
    }
}
