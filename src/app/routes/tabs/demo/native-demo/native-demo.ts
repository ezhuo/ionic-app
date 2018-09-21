import { Component, Injector, ViewEncapsulation } from '@angular/core';
import { IndexControl } from '@core';
import { Position } from '@core/model/type';

@Component({
    selector: 'page-native-demo',
    templateUrl: 'native-demo.html',
    encapsulation: ViewEncapsulation.None,
})
export class NativeDemoPage extends IndexControl {
    networkType = 'unknown';
    currentVersionNo: string = '1.0.0';
    scanText = '';
    location = {};
    imgPath;

    constructor(protected injector: Injector) {
        super(injector);
    }

    ionViewWillEnter() {
        if (!this.ionNativeSrv.app.isMobile()) {
            this.noticeSrv.alertInfo('请使用真机调试');
        }
    }

    getNetworkType() {
        this.networkType = this.ionNativeSrv.gets.getNetworkType();
    }

    getVersionNumber() {
        if (this.ionNativeSrv.app.isMobile()) {
            this.ionNativeSrv.gets.getVersionNumber().subscribe(res => {
                this.currentVersionNo = res;
            });
        }
    }

    callNumber(number) {
        // this.ionNativeSrv.isMobile() && this.noticeSrv.callNumber(number);
    }

    scan() {
        if (this.ionNativeSrv.app.isMobile()) {
            this.ionNativeSrv.app.scan().subscribe(res => {
                this.scanText = res;
            });
        }
    }

    getPictureByCamera() {
        if (this.ionNativeSrv.app.isMobile()) {
            this.ionNativeSrv.gets
                .getPictureByCamera({
                    destinationType: 1, //期望返回的图片格式,1图片路径
                })
                .subscribe(img => {
                    this.imgPath = img;
                });
        }
    }

    getUserLocation() {
        // this.noticeSrv.getUserLocation().subscribe(res => {
        //     this.location = res;
        // });
    }

    navigation() {
        let startPoint: Position = { lng: '113.350912', lat: '23.119495' };
        let endPoint: Position = { lng: '113.450912', lat: '23.219495' };
        // this.noticeSrv.navigation(startPoint, endPoint).subscribe(res => {
        //   console.log(res);
        // });
    }
}
