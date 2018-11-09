import {
    Component,
    ViewEncapsulation,
    OnInit,
    OnDestroy,
    Injector,
} from '@angular/core';
import { IndexControl, FileInfo } from '@core';
// import { FileService } from '../../../providers/FileService';
// import { Validators } from '../../../providers/Validators';
// import { FormBuilder } from '@angular/forms';
// import { MineService } from '../MineService';
// import { AlertController, NavController } from 'ionic-angular';

@Component({
    selector: 'tabs-mine-feed-back',
    templateUrl: 'feed-back.html',
    styleUrls: [`./feed-back.scss`],
    encapsulation: ViewEncapsulation.None,
})
export class TabsMineFeedBack extends IndexControl
    implements OnInit, OnDestroy {
    verifyMessages = {
        title: {
            errorMsg: '',
            required: '标题为必填项',
            minlength: '标题最少4个字符',
            maxlength: '标题最大20个字符',
        },
        content: {
            errorMsg: '',
            required: '内容为必填项',
            minlength: '内容最少4个字符',
            maxlength: '内容最大500个字符',
        },
    };
    fileObjList: FileInfo[] = [];
    form: any;

    constructor(protected injector: Injector) {
        super(injector);
        this.form = this.FormBuilder.group({
            title: [
                '',
                [
                    this.Validators.required,
                    this.Validators.minLength(4),
                    this.Validators.maxLength(20),
                ],
            ], // 第一个参数是默认值
            content: [
                '',
                [
                    this.Validators.required,
                    this.Validators.minLength(4),
                    this.Validators.maxLength(500),
                ],
            ],
            type: ['1'], // 1:BUG;2:需求；3：问题；
            state: ['1'], // 1:未回复；2:已回复；3:补充待回复;8：已关闭;9重新打开；
            sourceId: [1], // 1:现场作业app；2:精准营销app；3:web
        });
        this.form.valueChanges.subscribe(data => {
            const verifyMessages = this.verifyMessages;
            Object.keys(verifyMessages).forEach(field => {
                verifyMessages[field].errorMsg = '';
                const control = this.form.get(field);
                if (control && control.dirty && !control.valid) {
                    const messages = verifyMessages[field];
                    Object.keys(control.errors).forEach(key => {
                        messages[key] &&
                            (verifyMessages[field].errorMsg +=
                                messages[key] + ' ');
                    });
                }
            });
        });
    }

    ngOnInit(): void {
        super.ngOnInit();
    }

    ngOnDestroy(): void {
        super.ngOnDestroy();
    }

    save(data) {
        this.noticeSrv
            .alertConfirm('提交后将不能修改', '确定提交？')
            .then(() => {
                // this.fileService
                //     .uploadMultiByFilePath(this.fileObjList)
                //     .subscribe(fileList => {
                //         const fileIdList = [];
                //         for (const fileObj of fileList) {
                //             fileIdList.push(fileObj.id);
                //         }
                //         data.fileIdList = fileIdList;
                //         this.mineService
                //             .requirementSave(data)
                //             .subscribe(res => {
                //                 this.navCtrl.pop();
                //             });
                //     });
            })
            .catch(() => {});
    }
}
