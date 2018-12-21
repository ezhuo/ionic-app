import {
  Component,
  Injector,
  OnInit,
  ViewEncapsulation,
  ViewChildren,
  QueryList,
} from '@angular/core';
import { IndexControl } from '@core';
import { IonRouterOutlet } from '@ionic/angular';
import { UserData } from '@shared';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class AppComponent extends IndexControl implements OnInit {
  loggedIn = false;
  lastTimeBackPress = 0;
  timePeriodToExit = 2000;

  @ViewChildren(IonRouterOutlet)
  routerOutlets: QueryList<IonRouterOutlet>;

  constructor(protected injector: Injector) {
    super(injector);
    super.__init__(this);
    this.initializeApp();
  }

  get userData() {
    return this.injector.get(UserData);
  }

  ngOnInit() {
    this.listenBackButtonEvent();
    this.checkLoginStatus();
    this.listenForLoginEvents();

    // setTimeout(async () => {
    //   console.log('abc');
    //   this.storageSrv.set('f', { a: 1 });
    //   const a = await this.storageSrv.get('f');
    //   console.log(a);
    //   console.log('abcd');
    //   const b = await this.storageSrv.get('f');
    //   console.log(b);
    //   console.log('abcde');
    // }, 1000);

    // setTimeout(async () => {
    //     debugger;
    //     const a = await this.storageSrv.get('f');
    //     console.log(a);
    // }, 2000);
  }

  initializeApp() {
    this.ionSrv.platform.ready().then(() => {
      this.ionSrv.app.statusBarStyle();
      this.freeTimeOut.to = setTimeout(() => {
        this.ionSrv.app.assertNetwork();
        this.ionSrv.app.assertVersion();
        this.ionSrv.splashScreen.hide();
      }, 800);
    });
  }

  listenBackButtonEvent() {
    const tabsUrl = ['/app/tabs/speakers', '/app/tabs/demo', '/app/tabs/mine'];
    const isClose = async () => {
      let result: any = null;
      result = await this.modalSrv.modalCtrl.getTop();
      if (!result) result = await this.modalSrv.popoverCtrl.getTop();
      if (!result) result = await this.noticeSrv.actionSheetCtrl.getTop();
      if (!result) result = await this.noticeSrv.alertCtrl.getTop();
      if (!result) {
        result = await this.ionSrv.menu.getOpen();
        if (result) {
          this.ionSrv.closeMenu();
        }
      }
      return result;
    };
    const subscribe = async () => {
      const is = await isClose();
      // console.log(is);
      // 说明有overlay 组件，不在继续
      if (is) return false;

      if (this.routerOutlets)
        this.routerOutlets.forEach((outlet: IonRouterOutlet) => {
          if (this.route.url == this.configSrv.router.defaultUrl) {
            if (
              new Date().getTime() - this.lastTimeBackPress <
              this.timePeriodToExit
            ) {
              this.ionSrv.exitApp();
            } else {
              this.noticeSrv.msgSuccess(`再按一次退出系统`);
              this.lastTimeBackPress = new Date().getTime();
              this.navigateByUrl(this.configSrv.router.defaultUrl);
            }
          } else if (tabsUrl.indexOf(this.route.url) > -1) {
            this.navigateByUrl(this.configSrv.router.defaultUrl);
          } else if (outlet && outlet.canGoBack()) {
            debugger;
            outlet.pop();
          }
        });

      this.ionSrv.events.publish('router-pop');
    };

    // setTimeout(() => {
    //     subscribe();
    // }, 5000);
    this.ionSrv.platform.backButton.subscribe(subscribe);
  }

  logout() {
    this.tokenSrv.tokenDestory();
  }

  openTutorial() {
    this.ionSrv.menu.enable(false);
    this.ionSrv.storage.set('ion_did_tutorial', false);
    this.route.navigateByUrl('/tutorial');
  }

  checkLoginStatus() {
    return this.userData.isLoggedIn().then(loggedIn => {
      return this.updateLoggedInStatus(loggedIn);
    });
  }

  updateLoggedInStatus(loggedIn: boolean) {
    setTimeout(() => {
      this.loggedIn = loggedIn;
    }, 300);
  }

  listenForLoginEvents() {
    this.ionSrv.events.subscribe('user:login', () => {
      this.updateLoggedInStatus(true);
    });

    this.ionSrv.events.subscribe('user:signup', () => {
      this.updateLoggedInStatus(true);
    });

    this.ionSrv.events.subscribe('user:logout', () => {
      this.updateLoggedInStatus(false);
    });
  }
}
