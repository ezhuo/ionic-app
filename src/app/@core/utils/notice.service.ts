import { Injectable, Injector } from '@angular/core';
import {
    ToastController,
    AlertController,
    LoadingController,
} from '@ionic/angular';

@Injectable()
export class NoticeService {
    private __msgList: any[] = [];
    private __loadingList: any[] = [];
    private __alertList: any[] = [];

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
        const __create = await this.toastCtl.create({
            position: 'top',
            message: msg,
            duration: 3000,
        });
        this.__msgList.push(__create);
        await __create.present();
        return __create;
    }

    async showAlert(type: string, title: string, msg: string) {
        const __create = await this.alertCtl.create({
            header: title,
            // subHeader: 'Subtitle',
            message: msg,
            buttons: ['好的'],
        });
        this.__alertList.push(__create);
        await __create.present();
        return __create;
    }

    async showLoading(opts: any) {
        opts = opts || { message: null };
        const __create = await this.loadingCtl.create(
            Object.assign(
                {
                    duration: 10000,
                    translucent: true,
                    cssClass: 'custom-class custom-loading',
                },
                opts,
            ),
        );
        this.__loadingList.push(__create);
        await __create.present();
        return __create;
    }

    clearAlert(data?: any, role?: string, id?: string) {
        if (this.__alertList.length > 0)
            return (this.__alertList.pop() as any).dismiss(data, role, id);
    }

    clearMsg(data?: any, role?: string, id?: string) {
        if (this.__msgList.length > 0) {
            return (this.__msgList.pop() as any).dismiss(data, role, id);
        }
    }

    clearLoading(data?: any, role?: string, id?: string) {
        if (this.__loadingList.length > 0)
            return (this.__loadingList.pop() as any).dismiss(data, role, id);
    }

    clearAll(data?: any, role?: string, id?: string) {
        this.clearAlert(data, role, id);
        this.clearMsg(data, role, id);
        this.clearLoading(data, role, id);
    }

    alertInfo(msg: any, title = '信息') {
        return this.showAlert(this.types[1], title, msg);
    }

    alertSuccess(msg: any, title = '成功') {
        return this.showAlert(this.types[2], title, msg);
    }

    alertWarning(msg: any, title = '警告') {
        return this.showAlert(this.types[3], title, msg);
    }

    alertError(msg: any, title = '错误') {
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
                        },
                    },
                    {
                        text: '确定',
                        handler: () => {
                            resolve(true);
                        },
                    },
                ],
            });
            return await alert.present();
        });
    }

    msgInfo(msg: any, title = '信息') {
        return this.showToAst(this.types[1], msg);
    }

    msgSuccess(msg: any, title = '成功') {
        return this.showToAst(this.types[2], msg);
    }

    msgWarning(msg: any, title = '警告') {
        return this.showToAst(this.types[3], msg);
    }

    msgError(msg: any, title = '错误') {
        return this.showToAst(this.types[4], msg);
    }

    loading(msg?: any) {
        return this.showLoading({
            message: msg,
        });
    }
}
