import { Component, ViewChild } from '@angular/core';
import { Platform, IonicApp, Nav, ModalController, Keyboard, Events } from "ionic-angular";
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { TabsPage } from '../pages/tabs/tabs';
import { UserInfo } from '../core/model/userinfo';
import { VersionService } from '../core/utils/version.service';
import { UserService } from '../core/data/users.service';
import { NoticeService } from './../core/utils/notice.service';
import { TokenService } from './../core/data/token.service';
import { NativeService } from './../core/utils/native.service';
import { StartupService } from '../core/utils/startup.service';
import { PushService } from '../core/utils/push.service';

@Component({
  templateUrl: 'app.html'
})
export class AppComponent {
  @ViewChild('appNav') nav: Nav;
  rootPage: any = TabsPage;
  backButtonPressed: boolean = false;

  constructor(
    private platform: Platform,
    private keyboard: Keyboard,
    private ionicApp: IonicApp,
    private userService: UserService,
    private noticeService: NoticeService,
    private modalCtrl: ModalController,
    private events: Events,
    private tokenService: TokenService,
    private versionService: VersionService,
    private nativeService: NativeService,
    private startupService: StartupService,
    private pushService: PushService
  ) {

    platform.ready().then(this.platformReady.bind(this));

    this.startupService.getStorageDriver();

  }

  platformReady() {
    const self = this;
    console.log('platformReady');
    
    this.startupService.platformReady();

    this.registerBackButtonAction();//注册android返回按键事件

    this.startupService.loggerInit();

    this.startupService.userTokenstart();

    this.versionService.init();//初始化版本信息

    this.startupService.pushInit(this.nav);

    setTimeout(() => {
      this.versionService.assertUpgrade();//检测app是否升级
      // this.nativeService.sync();//启动app检查热更新
      // self.tokenService.token_destory();//清除数据缓存
    }, 5000);

  }

  registerBackButtonAction() {

    if (!this.nativeService.isAndroid()) {
      return;
    }
    this.platform.registerBackButtonAction(() => {
      this.events.publish('android:backButtonAction');
      if (this.keyboard.isOpen()) {//如果键盘开启则隐藏键盘
        this.keyboard.close();
        return;
      }
      //如果想点击返回按钮隐藏toast或loading或Overlay就把下面加上
      // this.ionicApp._toastPortal.getActive() ||this.ionicApp._loadingPortal.getActive()|| this.ionicApp._overlayPortal.getActive()
      let activePortal = this.ionicApp._modalPortal.getActive() || this.ionicApp._toastPortal.getActive() || this.ionicApp._overlayPortal.getActive();
      if (activePortal) {
        activePortal.dismiss();
        return;
      }
      let tabs = this.nav.getActiveChildNav();//获取tabs导航,this.nav是总导航,tabs是子导航
      let tab = tabs.getSelected();//获取选中的tab
      let activeVC = tab.getActive();//通过当前选中的tab获取ViewController
      let activeNav = activeVC.getNav();//通过当前视图的ViewController获取的NavController
      return activeNav.canGoBack() ? activeNav.pop() : this.nativeService.minimize();//this.showExit()
    }, 1);

  }

  //双击退出提示框
  showExit() {

    if (this.backButtonPressed) { //当触发标志为true时，即2秒内双击返回按键则退出APP
      this.platform.exitApp();
    } else {
      this.noticeService.alert_info('再按一次退出应用');
      this.backButtonPressed = true;
      setTimeout(() => {
        //2秒内没有再次点击返回则将触发标志标记为false
        this.backButtonPressed = false;
      }, 2000)
    }

  }

}
