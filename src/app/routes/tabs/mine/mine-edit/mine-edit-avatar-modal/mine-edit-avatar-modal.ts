import {
    Component,
    ViewEncapsulation,
    OnInit,
    OnDestroy,
    Injector,
} from '@angular/core';
import { ModalControl } from '@core';
// import { ViewController } from 'ionic-angular';
// import { NativeService } from '../../../providers/NativeService';
// import { FileService } from '../../../providers/FileService';
// import { MineService } from '../MineService';
// import { GlobalData } from '../../../providers/GlobalData';
import { Camera } from '@ionic-native/camera/ngx';

declare var AlloyCrop;

@Component({
    selector: 'tabs-mine-edit-avatar-modal',
    templateUrl: 'mine-edit-avatar-modal.html',
    styleUrls: [`./mine-edit-avatar-modal.scss`],
    encapsulation: ViewEncapsulation.None,
})
export class TabsMineEditAvatarModal extends ModalControl
    implements OnInit, OnDestroy {
    userInfo;

    constructor(protected injector: Injector) {
        super(injector);
    }

    get camera() {
        return this.injector.get(Camera);
    }

    getPicture(type) {
        if (type == 0) {
            // 从相册选一张
            let options = {
                sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
                destinationType: this.camera.DestinationType.FILE_URI,
            };
            // this.ionNativeSrv.getPicture(options).subscribe(fileUrl => {
            //     this.getPictureSuccess(fileUrl);
            // });
        }
        if (type == 1) {
            // 拍一张照片
            let options = {
                sourceType: this.camera.PictureSourceType.CAMERA,
                destinationType: this.camera.DestinationType.FILE_URI,
            };
            // this.ionNativeSrv.getPicture(options).subscribe(fileUrl => {
            //     this.getPictureSuccess(fileUrl);
            // });
        }
        if (type == 2) {
            // 从相册选一张,不裁剪
            let options: any = {
                sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
                destinationType: this.camera.DestinationType.DATA_URL,
                targetWidth: 400,
                targetHeight: 400,
            };
            // this.ionNativeSrv.getPicture(options).subscribe(base64 => {
            //     this.saveAvatar(base64);
            // });
        }
    }

    private getPictureSuccess(fileUrl) {
        new AlloyCrop({
            // api:https://github.com/AlloyTeam/AlloyCrop
            image_src: fileUrl,
            circle: false, // optional parameters , the default value is false
            width: 256, // crop width
            height: 256, // crop height
            output: 1,
            ok: base64 => {
                this.saveAvatar(base64);
            },
            cancel: () => {
                console.log('AlloyCrop cancel');
            },
            ok_text: '确定', // optional parameters , the default value is ok
            cancel_text: '取消', // optional parameters , the default value is cancel
        });
    }

    saveAvatar(base64) {
        // const fileObj = { base64: base64 };
        // this.fileService.uploadByBase64(fileObj).subscribe(fileObj => {
        //     // 上传头像图片到文件服务器
        //     const avatarId = fileObj.id;
        //     const avatarPath = fileObj.origPath;
        //     this.globalData.user.avatarId = avatarId;
        //     this.globalData.user.avatarPath = avatarPath;
        //     this.viewCtrl.dismiss();
        //     this.mineService.updateUserAvatarId(avatarId).subscribe(res => {
        //         // 保存avatar字段到用户表
        //         this.globalData.user.avatarId = avatarId;
        //         this.globalData.user.avatarPath = avatarPath;
        //         this.viewCtrl.dismiss();
        //     });
        // });
    }

    dismiss() {
        this.modalClose();
    }

    ngOnInit(): void {
        super.ngOnInit();
    }

    ngOnDestroy(): void {
        super.ngOnDestroy();
    }
}
