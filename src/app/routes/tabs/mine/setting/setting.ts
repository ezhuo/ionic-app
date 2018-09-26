import {
    Component,
    ViewEncapsulation,
    OnInit,
    OnDestroy,
    Injector,
} from '@angular/core';
import { ModalControl } from '@core';
import { TabsMineChangePassword } from './change-password/change-password';

@Component({
    selector: 'tabs-mine-setting',
    templateUrl: 'setting.html',
    styleUrls: [`./setting.scss`],
    encapsulation: ViewEncapsulation.None,
})
export class TabsMineSetting extends ModalControl implements OnInit, OnDestroy {
    enabledFileCache = true; // app是否开启缓存

    constructor(protected injector: Injector) {
        super(injector);
        // this.enabledFileCache = this.globalData.enabledFileCache;
    }

    clearCache() {
        // Utils.sessionStorageClear(); // 清除数据缓存
        // this.nativeService.showToast('缓存清除成功');
        // this.navCtrl.pop();
    }

    cacheChange() {
        // this.globalData.enabledFileCache = this.enabledFileCache;
        // this.storage.set(
        //     'enabled-file-cache-' + this.globalData.userId,
        //     this.enabledFileCache,
        // );
    }

    changePassword() {
        this.modalSrv.create(TabsMineChangePassword);
    }

    ngOnInit(): void {
        super.ngOnInit();
    }

    ngOnDestroy(): void {
        super.ngOnDestroy();
    }
}
