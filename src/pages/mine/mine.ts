import {Component} from "@angular/core";
import {Platform, NavController, ModalController, AlertController, Events} from "ionic-angular";
import {MineEditPage} from "./mine-edit/mine-edit";
import {MineEditAvatarModalPage} from "./mine-edit-avatar-modal/mine-edit-avatar-modal";
import {AboutPage} from "./about/about";
import {Helper} from "../../core/services/Helper";
import {WorkMapPage} from "./work-map/work-map";
import {SettingPage} from "./setting/setting";
import {NativeService} from "../../core/services/NativeService";
import {FileCachePage} from "../../theme/components/file-cache/file-cache";
import {GlobalData} from "../../core/services/GlobalData";

@Component({
  selector: 'page-mine',
  templateUrl: 'mine.html'
})
export class MinePage {
  userInfo;

  constructor(public navCtrl: NavController,
              public platform: Platform,
              public helper: Helper,
              public modalCtrl: ModalController,
              public nativeService: NativeService,
              public globalData: GlobalData,
              private events: Events,
              public alertCtrl: AlertController) {
    this.userInfo = this.globalData.user;
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
    this.alertCtrl.create({
      title: '确认重新登录？',
      buttons: [{text: '取消'},
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
    }).present();
  }

  //工作地图
  map() {
    this.navCtrl.push(WorkMapPage);
  }

  fileCache() {
    this.navCtrl.push(FileCachePage);
  }

  exitSoftware() {
    this.alertCtrl.create({
      title: '确认退出软件？',
      buttons: [{text: '取消'},
        {
          text: '确定',
          handler: () => {
            this.platform.exitApp();
          }
        }
      ]
    }).present();
  }

  about() {
    this.navCtrl.push(AboutPage);
  }

  viewAvatar() {
    this.modalCtrl.create(MineEditAvatarModalPage).present();
  }

  notice() {
    this.nativeService.alert('开发中...');
  }

}
