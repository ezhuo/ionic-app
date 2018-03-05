import { Component, ViewChild } from "@angular/core";
import { Storage } from "@ionic/storage";
import { Platform, IonicApp, Nav, ModalController, Keyboard, ToastController, Events } from "ionic-angular";
import { NativeService } from "../core/services/NativeService";
import { TabsPage } from "../pages/tabs/tabs";
import { Helper } from "../core/services/Helper";
import { GlobalData } from "../core/services/GlobalData";
import { Utils } from "../core/services/Utils";
import { CommonService } from "../core/services/CommonService";
import { VersionService } from "../core/services/VersionService";
import { UserInfo } from '../core/model/UserInfo';
import { AboutPage } from '../pages/mine/about/about';

@Component({
  templateUrl: 'app.html'
})
export class AppComponent {
  @ViewChild('appNav') nav: Nav;
  rootPage = TabsPage;
  backButtonPressed: boolean = false;

  constructor(
    private platform: Platform,
    private keyboard: Keyboard,
    private ionicApp: IonicApp,
    private storage: Storage,
    private globalData: GlobalData,
    private helper: Helper,
    private toastCtrl: ToastController,
    private modalCtrl: ModalController,
    private events: Events,
    private commonService: CommonService,
    private versionService: VersionService,
    private nativeService: NativeService) {

    platform.ready().then(() => {
      this.nativeService.statusBarStyle();
      this.nativeService.splashScreenHide();
      this.assertNetwork();//检测网络
      this.helper.funDebugInit();//初始化fundebug
      this.helper.alloyLeverInit();//本地"开发者工具"
      this.helper.initJpush();//初始化极光推送
      this.jpushOpenNotification();//处理打开推送消息事件
      this.storage.get('token').then(token => { //从缓存中获取token
        if (token) {
          this.globalData.token = token;
          this.commonService.getNewToken().mergeMap((newToken) => { //用旧token获取新token,旧token作为请求头
            this.globalData.token = newToken;
            this.storage.set('token', newToken);
            return this.commonService.getUserInfo();
          }).subscribe((userInfo: UserInfo) => {
            this.helper.loginSuccessHandle(userInfo);
          });
        } else {
          this.modalCtrl.create('LoginPage').present();
        }
      });
      this.registerBackButtonAction();//注册android返回按键事件
      this.versionService.init();//初始化版本信息
      setTimeout(() => {
        this.versionService.assertUpgrade();//检测app是否升级
        this.nativeService.sync();//启动app检查热更新
        Utils.sessionStorageClear();//清除数据缓存
      }, 5000);
    });

  }

  assertNetwork() {
    if (!this.nativeService.isConnecting()) {
      this.toastCtrl.create({
        message: '未检测到网络,请连接网络',
        showCloseButton: true,
        closeButtonText: '确定'
      }).present();
    }
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
      this.nativeService.showToast('再按一次退出应用');
      this.backButtonPressed = true;
      setTimeout(() => { //2秒内没有再次点击返回则将触发标志标记为false
        this.backButtonPressed = false;
      }, 2000)
    }
  }

  jpushOpenNotification() {
    //当点击极光推送消息跳转到指定页面
    this.events.subscribe('jpush.openNotification', content => {
      let tabs = this.nav.getActiveChildNav();
      let tab = tabs.getSelected();
      let activeVC = tab.getActive();
      // if (activeVC.component == AboutPage) {//如果当前所在页面就是将要跳转到的页面则不处理
      //   return;
      // }
      let activeNav = activeVC.getNav();
      activeNav.popToRoot({}).then(() => {//导航跳到最顶层
        tabs.select(3);//选中第四个tab
        let tab = tabs.getSelected();//获取选中的tab
        let activeVC = tab.getActive();//通过当前选中的tab获取ViewController
        let activeNav = activeVC.getNav();//通过当前视图的ViewController获取的NavController
        activeNav.push(AboutPage);//跳转到指定页面
      });
    });
  }

}
