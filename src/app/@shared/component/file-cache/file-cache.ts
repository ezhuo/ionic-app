import {
    Component,
    Injector,
    OnInit,
    OnDestroy,
    ViewEncapsulation,
} from '@angular/core';
import { IndexControl } from '@core';
import { FileObj } from '@core/model/FileObj';

@Component({
    selector: 'page-file-cache',
    templateUrl: 'file-cache.html',
    styleUrls: [`./file-cache.scss`],
    encapsulation: ViewEncapsulation.None,
})
export class FileCachePage extends IndexControl implements OnInit, OnDestroy {
    enabledFileCache = true; // app是否开启缓存
    uploading = false; // 是否正在上传
    fileObjList: FileObj[] = []; // 待上传的文件数组
    uploadTotal = 0; // 待上传的文件数量
    progress;

    constructor(protected injector: Injector) {
        super(injector);
        this.enabledFileCache = true;
        const cacheKey = 'file-cache-' + this.userSrv.user.key;
        this.ionSrv.storage.get(cacheKey).then(cacheData => {
            this.fileObjList = cacheData || [];
        });
    }

    ngOnInit() {
        super.ngOnInit();
    }

    ngOnDestory() {
        super.ngOnDestroy();
    }

    async upload() {
        this.uploadTotal = this.fileObjList.length;
        this.progress = await this.noticeSrv.alertCtrl.create({
            header: '0/' + this.uploadTotal,
            subHeader: '上传中...',
            cssClass: 'js-upload',
            // enableBackdropDismiss: false,
            buttons: [
                {
                    text: '取消上传',
                    handler: () => {
                        this.uploading = false;
                    },
                },
            ],
        });
        await this.progress.present();
        this.uploading = true;
        this.doUpload();
    }

    // 上传文件,每次上传一张.
    doUpload() {
        /*
        if (this.fileObjList.length > 0 && this.uploading) {
            const fileObj = this.fileObjList[0];
            fileObj.parameter = fileObj.id;
            // 上传文件前,如果app开启了缓存需要先关闭缓存
            this.enabledFileCache && (this.globalData.enabledFileCache = false);
            // 执行上传
            this.globalData.showLoading = false;
            this.fileService.uploadByFilePath(fileObj).subscribe(res => {
                // 文件上传成功后,重新开启app缓存
                this.enabledFileCache &&
                    (this.globalData.enabledFileCache = true);
                // 修改缓存文件关系为真实文件关系
                this.globalData.showLoading = false;
                this.commonService
                    .fileRelationReplace([
                        { realId: res.id, replaceId: res.parameter },
                    ])
                    .subscribe(() => {
                        // 更新上传进度
                        const title = document
                            .getElementsByClassName('js-upload')[0]
                            .getElementsByClassName('alert-title')[0];
                        title &&
                            (title.innerHTML =
                                this.uploadTotal -
                                this.fileObjList.length +
                                '/' +
                                this.uploadTotal);
                        this.fileObjList.shift();
                        this.fileService.deleteFileCacheByIds([res.parameter]);
                        // 上传完成
                        if (this.fileObjList.length === 0) {
                            this.progress.dismiss();
                            this.nativeService.alert('上传完成');
                            this.uploading = false;
                        }
                        this.doUpload(); // 继续上传下一个文件
                    });
            });
        }

        */
    }
}
