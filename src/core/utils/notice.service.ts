import { Injectable, Injector } from '@angular/core';
import { ToastController, LoadingController, Loading, AlertController, Platform } from "ionic-angular";
import { Toast } from "@ionic-native/toast";

@Injectable()
export class NoticeService {
  private loading: Loading;

  constructor(
    private injector: Injector,
    private platform: Platform,
    private toast: Toast
  ) { }

  private types: string[] = ['default', 'info', 'success', 'warning', 'error', 'loading'];

  get toastCtrl() {
    return this.injector.get(ToastController);
  }

  get alertCtrl() {
    return this.injector.get(AlertController);
  }

  get loadingCtrl() {
    return this.injector.get(LoadingController);
  }

  /**
   * 是否真机环境
   */
  isMobile(): boolean {
    return this.platform.is('mobile') && !this.platform.is('mobileweb');
  }

  private showAlert(options) {
    let confirm = this.alertCtrl.create(options);
    confirm.present();
    return confirm;
  }

  private showMsg(type: string, title: string, body: string, duration: number = 2000) {
    if (this.isMobile()) {
      return this.toast.show(body, String(duration), 'bottom').subscribe();
    } else {
      let toast = this.toastCtrl.create({
        message: body,
        duration: duration,
        position: 'bottom'
      });
      return toast.present(toast);
    }
  }

  clear() {
    return this.clearLoading();
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

  alert_info(body: string, title: string = '') {
    return this.showAlert({
      title: title,
      message: body,
      buttons: ['我知道了']
    });
  }

  alert_confirm(body: string, title: string = '询问？', btn_ok = '好的') {
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
            text: btn_ok,
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

  alert(options: any = {}) {
    return this.showAlert(options);
  }

  showLoading(content: string = ''): void {
    //如果loading已经存在则不再打开
    if (!this.loading) {
      let loading = this.loadingCtrl.create({
        content: content
      });
      loading.present();
      this.loading = loading;
    }
  };

  /**
  * 关闭loading
  */
  clearLoading(): void {
    this.loading && this.loading.dismiss();
    this.loading = null;
  };

}
