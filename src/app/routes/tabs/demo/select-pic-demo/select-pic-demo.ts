import { Component, Injector, ViewEncapsulation } from '@angular/core';
import { IndexControl, FileInfo } from '@core';
import { map } from 'rxjs/operators';
// import { FileService } from '../../../providers/FileService';

@Component({
    selector: 'page-select-pic-demo',
    templateUrl: 'select-pic-demo.html',
    encapsulation: ViewEncapsulation.None,
})
export class SelectPicDemoPage extends IndexControl {
    fileObjList: FileInfo[] = [];
    filePaths: FileInfo[] = [];

    constructor(protected injector: Injector) {
        super(injector);

        this.httpSrv
            .get('./assets/data/fileData.json')
            .pipe(map((res: Response) => res.json()))
            .subscribe((res: any) => {
                if (res.success) {
                    for (const fileObj of res.data) {
                        this.fileObjList.push({
                            thumbUrl: fileObj.base64,
                            originFileObj: fileObj.base64,
                            base64: fileObj.base64,
                        });
                    }
                }
            });
    }

    details(url) {
        this.ionSrv.app.openUrlByBrowser(url);
    }

    uploadMultiByBase64() {
        // this.fileService
        //     .uploadMultiByBase64(this.fileObjList)
        //     .subscribe(fileList => {
        //         this.nativeService.showToast(
        //             '成功上传' + fileList.length + '张图片',
        //         );
        //     });
    }

    uploadMultiByFilePath() {
        // this.fileService
        //     .uploadMultiByFilePath(this.filePaths)
        //     .subscribe(fileList => {
        //         this.nativeService.showToast(
        //             '成功上传' + fileList.length + '张图片',
        //         );
        //     });
    }
}
