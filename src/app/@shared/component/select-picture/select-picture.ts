import {
    Component,
    Injector,
    OnInit,
    OnDestroy,
    ViewEncapsulation,
    Input,
    EventEmitter,
    Output,
} from '@angular/core';
import { IndexControl, FileInfo } from '@core';
import { PreviewPicturePage } from './preview-picture/preview-picture';

@Component({
    selector: 'page-select-picture',
    templateUrl: 'select-picture.html',
    styleUrls: [`./select-picture.scss`],
    encapsulation: ViewEncapsulation.None,
})
export class SelectPicturePage extends IndexControl
    implements OnInit, OnDestroy {
    @Input()
    max = 4; // 最多可选择多少张图片，默认为4张

    @Input()
    allowAdd = true; // 是否允许新增

    @Input()
    allowDelete = true; // 是否允许删除

    @Input()
    fileObjList: FileInfo[] = []; // 图片列表,与fileObjListChange形成双向数据绑定
    @Output()
    fileObjListChange = new EventEmitter<any>();

    constructor(protected injector: Injector) {
        super(injector);
    }

    ngOnInit() {
        super.ngOnInit();
    }

    ngOnDestory() {
        super.ngOnDestroy();
    }

    async addPicture() {
        // 新增照片
        const actionSheet = await this.noticeSrv.actionSheetCtrl.create({
            buttons: [
                {
                    text: '从相册选择',
                    handler: () => {
                        this.ionSrv.gets
                            .getMultiplePicture({
                                // 从相册多选
                                maximumImagesCount:
                                    this.max - this.fileObjList.length,
                                destinationType: 1, // 期望返回的图片格式,1图片路径
                            })
                            .subscribe(imgs => {
                                for (const img of imgs as string[]) {
                                    this.getPictureSuccess(img);
                                }
                            });
                    },
                },
                {
                    text: '拍照',
                    handler: () => {
                        this.ionSrv.gets.getPicture().subscribe(img => {
                            this.getPictureSuccess(img);
                        });
                    },
                },
                {
                    text: '取消',
                    role: 'cancel',
                },
            ],
        });

        await actionSheet.present();
    }

    deletePicture(i) {
        // 删除照片
        if (!this.allowDelete) {
            return;
        }

        this.noticeSrv
            .alertConfirm('', '确认删除？')
            .then(() => {
                const delArr = this.fileObjList.splice(i, 1);
                const delId = delArr[0].id;
                if (delId) {
                    // this.globalData.showLoading = false;
                    // this.fileService.deleteById(delId);
                }
            })
            .catch(() => {});
    }

    viewerPicture(index) {
        // 照片预览
        const picturePaths = [];
        for (const fileObj of this.fileObjList) {
            picturePaths.push(fileObj.originFileObj);
        }
        this.modalSrv.create(PreviewPicturePage, {
            initialSlide: index,
            picturePaths: picturePaths,
        });
    }

    private getPictureSuccess(img) {
        const fileObj = { originFileObj: img, thumbUrl: img };
        this.fileObjList.push(fileObj);
        this.fileObjListChange.emit(this.fileObjList);
    }
}
