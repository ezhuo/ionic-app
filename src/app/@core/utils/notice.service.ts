import { Injectable, Injector } from '@angular/core';
import {
    ToastController,
    AlertController,
    LoadingController,
    ActionSheetController,
} from '@ionic/angular';
import { Toast } from '../ionic/native.plugins';
import { Platform } from '@ionic/angular';

@Injectable({
    providedIn: 'root',
  })
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

    get toastCtrl() {
        return this.injector.get(ToastController);
    }

    get alertCtrl() {
        return this.injector.get(AlertController);
    }

    get loadingCtrl() {
        return this.injector.get(LoadingController);
    }
    get actionSheetCtrl() {
        return this.injector.get(ActionSheetController);
    }
    get toast() {
        return this.injector.get(Toast);
    }
    get platform() {
        return this.injector.get(Platform);
    }
    get isMobile(): boolean {
        return this.platform.is('mobile');
    }
    async showToast(type: string, msg: string) {
        if (this.isMobile) {
            this.toast.show(msg, '5000', 'top').subscribe(toast => {
                console.log(msg);
            });
        } else {
            const __create = await this.toastCtrl.create({
                position: 'top',
                message: msg,
                duration: 3000,
            });
            this.__msgList.push(__create);
            await __create.present();
            return __create;
        }
    }
    async showAlert(type: string, title: string, msg: string) {
        const __create = await this.alertCtrl.create({
            header: title,
            // subHeader: 'Subtitle',
            message: msg,
            buttons: ['好'],
        });
        this.__alertList.push(__create);
        await __create.present();
        return __create;
    }

    async showLoading(opts: any) {
        opts = opts || { message: null };
        const __create = await this.loadingCtrl.create(
            Object.assign(
                {
                    duration: 8000,
                    translucent: false,
                },
                opts,
            ),
        );
        this.__loadingList.push(__create);
        await __create.present();
        return __create;
    }

    async closeActionSheet(data?: any, role?: string, id?: string) {
        try {
            const element = await this.actionSheetCtrl.getTop();
            if (element) {
                return element.dismiss();
            }
        } catch (error) {
            return error;
        }
        return false;
    }

    async closeAlert(data?: any, role?: string, id?: string) {
        try {
            const element = await this.alertCtrl.getTop();
            if (element) {
                return element.dismiss();
            }
        } catch (error) {
            return error;
        }
        return false;
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

    alert(msg: any, title = '信息') {
        return this.alertInfo(msg, title);
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

    alertConfirm(
        msg: any,
        title = '询问？',
        okText = '确定',
        cancelText = '取消',
    ) {
        return new Promise(async (resolve, reject) => {
            const alert = await this.alertCtrl.create({
                header: title,
                message: msg,
                buttons: [
                    {
                        text: cancelText,
                        role: 'cancel',
                        cssClass: 'secondary',
                        handler: (blah?: any) => {
                            reject(blah || 'cancel');
                        },
                    },
                    {
                        text: okText,
                        handler: (res?: any) => {
                            resolve(res || 'ok');
                        },
                    },
                ],
            });
            return await alert.present();
        });
    }

    msg(msg: any, title = '信息') {
        return this.msgInfo(msg, title);
    }

    msgInfo(msg: any, title = '信息') {
        return this.showToast(this.types[1], msg);
    }

    msgSuccess(msg: any, title = '成功') {
        return this.showToast(this.types[2], msg);
    }

    msgWarning(msg: any, title = '警告') {
        return this.showToast(this.types[3], msg);
    }

    msgError(msg: any, title = '错误') {
        return this.showToast(this.types[4], msg);
    }

    loading(msg?: any) {
        return this.showLoading({
            message: msg,
        });
    }
}
