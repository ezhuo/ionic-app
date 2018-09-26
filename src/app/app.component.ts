import {
    Component,
    Injector,
    OnInit,
    ViewEncapsulation,
    ViewChildren,
    QueryList,
} from '@angular/core';
import { IndexControl } from '@core';
import { IonRouterOutlet, StackController } from '@ionic/angular';
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
        const init = () => {
            this.ionNativeSrv.app.statusBarStyle();
            this.ionNativeSrv.splashScreen.hide();
            this.checkVer();
        };
        this.ionNativeSrv.platform.ready().then(() => {
            setTimeout(init, 500);
        });
    }

    backButtonEvent() {
        const tabsUrl = [
            '/app/tabs/(speakers:speakers)',
            '/app/tabs/(demo:demo)',
            '/app/tabs/(mine:mine)',
        ];
        const subscribe = async () => {
            // try {
            //     const isClose =
            //         (await this.noticeSrv.closeActionSheet()) ||
            //         (await this.noticeSrv.closeAlert()) ||
            //         (await this.modalSrv.closePopover()) ||
            //         (await this.modalSrv.closeModal()) ||
            //         (await this.ionSrv.closeMenu());
            //     if (isClose) return false;
            // } catch (e) {}

            this.routerOutlets.forEach((outlet: IonRouterOutlet) => {
                if (this.route.url == this.configSrv.router.default) {
                    if (
                        new Date().getTime() - this.lastTimeBackPress <
                        this.timePeriodToExit
                    ) {
                        this.ionNativeSrv.exitApp();
                    } else {
                        this.ionSrv.nav.this.noticeSrv.msgSuccess(
                            `再按一次退出系统`,
                        );
                        this.lastTimeBackPress = new Date().getTime();
                        this.navigateByUrl(this.configSrv.router.default);
                    }
                } else if (tabsUrl.indexOf(this.route.url) > -1) {
                    this.navigateByUrl(this.configSrv.router.default);
                }

                // else if (outlet && outlet.canGoBack()) {
                //     outlet.pop();
                // }
            });
        };

        // setTimeout(() => {
        //     subscribe();
        // }, 5000);
        this.ionNativeSrv.platform.backButton.subscribe(subscribe);
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
        this.ionNativeSrv.gets.getCheckVersion();
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
