import { Component } from '@angular/core';
import { Storage } from "@ionic/storage";
import { NavController, NavParams, ModalController } from 'ionic-angular';
import { ChangePasswordPage } from "../change-password/change-password";
import { UserService } from '../../../core/data/users.service';
import { NoticeService } from '../../../core/utils/notice.service';
import { NativeService } from '../../../core/utils/native.service';
import { TokenService } from '../../../core/data/token.service';
import { define } from '../../../core/public/config';

/**
 * Generated class for the SettingPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-setting',
  templateUrl: 'setting.html',
})
export class SettingPage {

  enabledFileCache: boolean = true;//app是否开启缓存

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private storage: Storage,
    public nativeService: NativeService,
    public tokenService: TokenService,
    private modalCtrl: ModalController,
    private userService: UserService,
    private noticeservice:NoticeService
  ) {
    this.enabledFileCache = define.file_cache;
  }

  clearCache() {
    this.tokenService.token_destory();//清除数据缓存
    this.noticeservice.msg_info('缓存清除成功');
    this.navCtrl.pop();
  }

  cacheChange() {
    define.file_cache = this.enabledFileCache;
    this.storage.set('enabled-file-cache-' + this.userService.userInfo.Id, this.enabledFileCache);
  }

  changePassword() {
    let modal = this.modalCtrl.create(ChangePasswordPage);
    modal.present();
    modal.onDidDismiss(data => {
    });
  }


}
