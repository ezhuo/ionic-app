import { Injectable, Injector } from '@angular/core';
import {
    ToastController,
    AlertController,
    LoadingController,
} from '@ionic/angular';

@Injectable()
export class NoticeService {
    private __msg: any;
    private __loading: any;
    private __alert: any;

    constructor(private injector: Injector) {}

    private types: string[] = [
        'default',
        'info',
        'success',
        'warning',
        'error',
        'loading',
    ];

    get toastCtl() {
        return this.injector.get(ToastController);
    }

    get alertCtl() {
        return this.injector.get(AlertController);
    }

    get loadingCtl() {
        return this.injector.get(LoadingController);
    }

    async showToAst(type: string, msg: string) {
        this.__msg = await this.toastCtl.create({
            message: msg,
            duration: 3000,
        });
        return await this.__msg.present();
    }

    async showAlert(type: string, title: string, msg: string) {
        this.__alert = await this.alertCtl.create({
            header: title,
            // subHeader: 'Subtitle',
            message: msg,
            buttons: ['好的'],
        });

        await this.__alert.present();
    }

    async showLoading(opts: any) {
        opts = opts || { message: null };
        this.__loading = await this.loadingCtl.create(
            Object.assign(
                {
                    duration: 10000,
                    translucent: true,
                    cssClass: 'custom-class custom-loading',
                },
                opts,
            ),
        );
        return await this.__loading.present();
    }

    clear() {
        this.alertClear();
        this.msgClear();
        this.loadingClear();
    }

    alertInfo(msg, title = '信息') {
        return this.showAlert(this.types[1], title, msg);
    }

    alertSuccess(msg, title = '成功') {
        return this.showAlert(this.types[2], title, msg);
    }

    alertWarning(msg, title = '警告') {
        return this.showAlert(this.types[3], title, msg);
    }

    alertError(msg, title = '错误') {
        return this.showAlert(this.types[4], title, msg);
    }

    alertConfirm(msg: any, title = '询问') {
        return new Promise(async (resolve, reject) => {
            const alert = await this.alertCtl.create({
                header: title,
                message: msg,
                buttons: [
                    {
                        text: '取消',
                        role: 'cancel',
                        cssClass: 'secondary',
                        handler: blah => {
                            reject(blah);
                            // console.log('Confirm Cancel: blah');
                        },
                    },
                    {
                        text: '确定',
                        handler: () => {
                            resolve(true);
                            // console.log('Confirm Okay');
                        },
                    },
                ],
            });
            return await alert.present();
        });
    }

    alertClear() {
        if (this.__alert) return this.alertCtl.dismiss(null, undefined, null);
    }

    msgInfo(msg, title = '信息') {
        return this.showToAst(this.types[1], msg);
    }

    msgSuccess(msg, title = '成功') {
        return this.showToAst(this.types[2], msg);
    }

    msgWarning(msg, title = '警告') {
        return this.showToAst(this.types[3], msg);
    }

    msgError(msg, title = '错误') {
        return this.showToAst(this.types[4], msg);
    }

    msgClear() {
        if (this.__msg) {
            return this.__msg.dismiss();
        }
    }

    loading(msg?: any) {
        return this.showLoading({
            message: msg,
        });
    }

    loadingClear() {
        if (this.__loading)
            return this.loadingCtl.dismiss(null, undefined, null);
    }
}
