import { Component } from '@angular/core';
import { Platform, NavController, ModalController, Events } from 'ionic-angular';
import { MineEditPage } from './mine-edit/mine-edit';
import { MineEditAvatarModalPage } from './mine-edit-avatar-modal/mine-edit-avatar-modal';
import { AboutPage } from './about/about';
import { WorkMapPage } from './work-map/work-map';
import { SettingPage } from './setting/setting';
import { FileCachePage } from '../../theme/components/file-cache/file-cache';
import { NativeService } from '../../core/utils/native.service';
import { UserService } from '../../core/data/users.service';
import { NoticeService } from '../../core/utils/notice.service';
import { api as config_api } from '../../core/public/config';

@Component({
  selector: 'page-mine',
  templateUrl: 'mine.html'
})
export class MinePage {
  userInfo;

  constructor(public navCtrl: NavController,
    public platform: Platform,
    public modalCtrl: ModalController,
    public nativeService: NativeService,
    public userService: UserService,
    private events: Events,
    private noticeService: NoticeService) {
    this.userInfo = this.userService.userInfo;
    this.events.subscribe('user:login', userInfo => {
      this.userInfo = userInfo;
    })
  }

  edit() {
    this.navCtrl.push(MineEditPage);
  }

  setting() {
    this.navCtrl.push(SettingPage);
  }

  loginOut() {
    this.noticeService.alert({
      title: '确认重新登录？',
      buttons: [{ text: '取消' },
      {
        text: '确定',
        handler: () => {
          let modal = this.modalCtrl.create('LoginPage');
          modal.present();
          modal.onDidDismiss(userInfo => {
            if (userInfo) {
              this.userInfo = userInfo;
            }
          });
        }
      }
      ]
    });
  }

  //工作地图
  map() {
    this.navCtrl.push(WorkMapPage);
  }

  fileCache() {
    this.navCtrl.push(FileCachePage);
  }

  exitSoftware() {
    this.noticeService.alert({
      title: '确认退出软件？',
      buttons: [{ text: '取消' },
      {
        text: '确定',
        handler: () => {
          this.platform.exitApp();
        }
      }
      ]
    });
  }

  about() {
    this.navCtrl.push(AboutPage);
  }

  viewAvatar() {
    this.modalCtrl.create(MineEditAvatarModalPage).present();
  }

  notice() {
    this.noticeService.alert_info('开发中...');
  }

  get avatar() {
    return config_api.down + this.userService.userInfo.avatar
  }

}
