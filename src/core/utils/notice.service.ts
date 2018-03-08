import { Injectable, Injector } from '@angular/core';
import { Platform, ToastController, LoadingController, Loading, AlertController } from "ionic-angular";

@Injectable()
export class NoticeService {
  constructor(
    private injector: Injector
  ) { }

  private types: string[] = ['default', 'info', 'success', 'warning', 'error', 'loading'];

  get toastCtrl() {
    return this.injector.get(ToastController);
  }

  get alertCtrl() {
    return this.injector.get(AlertController);
  }

  private showAlert(options) {
    let confirm = this.alertCtrl.create(options);
    confirm.present();
    return confirm;
  }

  private showMsg(type: string, title: string, body: string) {
    let toast = this.toastCtrl.create({
      message: body,
      duration: 3000,
      position: 'middle'
    });

    return toast.present(toast);
  }

  clear() {

  }

  msg_info(msg, title = '信息') {
    return this.showMsg(this.types[1], title, msg);
  }

  msg_success(msg, title = '成功') {
    return this.showMsg(this.types[2], title, msg);
  }

  msg_warning(msg, title = '警告') {
    return this.showMsg(this.types[3], title, msg);
  }

  msg_error(msg, title = '错误') {
    return this.showMsg(this.types[4], title, msg);
  }

  msg_loading(msg, title = '') {
  }

  msg_html(html) {
  }

  msg_clear() {
  }

  alert_info(body: string, title: string = '信息') {
    return this.showAlert({
      title: title,
      message: body,
      buttons: ['好']
    });
  }

  alert_confirm(body: string, title: string = '询问？') {
    const self = this;
    return new Promise((resolve, reject) => {
      return self.showAlert({
        title: title,
        message: body,
        buttons: [
          {
            text: '取消',
            handler: () => {
              reject('cancel');
            }
          },
          {
            text: '好的',
            handler: () => {
              resolve('ok');
            }
          }
        ]
      });
    })
  }

  alert_prompt(body: string, inputs = null, title: string = '输入') {
    const self = this;
    return new Promise((resolve, reject) => {
      inputs = inputs || [
        {
          name: 'ipt',
          placeholder: '请输入'
        },
      ];
      return self.showAlert({
        title: title,
        message: body,
        inputs: inputs,
        buttons: [
          {
            text: '取消',
            handler: (data) => {
              reject(data);
            }
          },
          {
            text: '好的',
            handler: (data) => {
              resolve(data);
            }
          }
        ]
      });
    })
  }

}
