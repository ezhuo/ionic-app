import { Component, Injector,ViewEncapsulation } from '@angular/core';
import { IndexControl } from '@core';
// import { FileService } from '../../../providers/FileService';

/**
 * Generated class for the FileCacheDemoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
    selector: 'page-file-cache-demo',
    templateUrl: 'file-cache-demo.html',
    encapsulation: ViewEncapsulation.None,
})
export class FileCacheDemoPage extends IndexControl {
    fileObjList = [];

    constructor(protected injector: Injector) {
        super(injector);
    }

    ionViewWillEnter() {
        if (!this.ionSrv.app.isMobile()) {
            this.noticeSrv.alertInfo('请使用真机调试');
        }
    }

    save() {
        if (this.fileObjList.length === 0) {
            this.noticeSrv.alertInfo('请选择照片');
            return;
        }
        // this.fileService
        //     .uploadMultiByFilePath(this.fileObjList)
        //     .subscribe(res => {
        //         this.fileObjList = [];
        //         this.ionSrv.alert(
        //             '文件已缓存',
        //             '重启app在"我的-图片缓存"功能查看',
        //         );
        //     });
    }
}
