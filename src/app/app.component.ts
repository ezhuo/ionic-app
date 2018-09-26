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
import { UserData } from './providers/user-data';

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

    get userData() {
        return this.injector.get(UserData);
    }
    constructor(protected injector: Injector) {
        super(injector);
        this.initializeApp();
        this.backButtonEvent();
    }

    ngOnInit() {
        this.checkLoginStatus();
        this.listenForLoginEvents();
    }

    initializeApp() {
        // this.checkVer();
        this.ionNativeSrv.platform.ready().then(() => {
            this.ionNativeSrv.app.statusBarStyle();
            // this.ionNativeSrv.statusBar.styleDefault();
            this.ionNativeSrv.splashScreen.hide();
            this.checkVer();
        });
    }

    backButtonEvent() {
        this.ionNativeSrv.platform.backButton.subscribe(async () => {
            // close action sheet
            try {
                const element = await this.noticeSrv.actionSheetCtrl.getTop();
                if (element) {
                    element.dismiss();
                    return;
                }
            } catch (error) {}

            // close popover
            try {
                const element = await this.modalSrv.popoverCtrl.getTop();
                if (element) {
                    element.dismiss();
                    return;
                }
            } catch (error) {}

            // close modal
            try {
                const element = await this.modalSrv.modalCtrl.getTop();
                if (element) {
                    element.dismiss();
                    return;
                }
            } catch (error) {
                console.log(error);
            }

            // close side menua
            try {
                const element = await this.ionSrv.menu.getOpen();
                if (element !== null) {
                    this.ionSrv.menu.close();
                    return;
                }
            } catch (error) {}

            this.routerOutlets.forEach((outlet: IonRouterOutlet) => {
                console.log(this.route.url);
                if (outlet && outlet.canGoBack()) {
                    outlet.pop();
                } else if (this.route.url === '/home') {
                    if (
                        new Date().getTime() - this.lastTimeBackPress <
                        this.timePeriodToExit
                    ) {
                        this.ionNativeSrv.exitApp();
                    } else {
                        this.noticeSrv.msgSuccess(`再按一次退出系统`);
                        this.lastTimeBackPress = new Date().getTime();
                    }
                }
            });
        });
    }

    logout() {
        this.userData.logout().then(() => {
            return this.navigate('/app/tabs/(schedule:schedule)');
        });
    }

    openTutorial() {
        this.ionSrv.menu.enable(false);
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

    checkVer() {
        // this.ionNativeSrv.gets.getCheckVersion();
        this.httpSrv.post(`/ver/check`, { ver: '1' }).subscribe((res: any) => {
            console.log(res);
            const dd = res.data || [];
            if (dd.length > 0) {
                if (dd[0].url) {
                    this.ionNativeSrv.noticeSrv
                        .alertConfirm(dd[0].message, '更新')
                        .then(() => {
                            this.ionNativeSrv.app.openUrlByBrowser(dd[0].url);
                        });
                }
            }
        });
    }
}
