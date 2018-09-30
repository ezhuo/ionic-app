import { Observable } from 'rxjs';
import { IonicService } from './ionic.service';

export class NativeApp {
    private __ionicSrv: IonicService;
    get ionSrv() {
        return this.__ionicSrv;
    }

    constructor(ionicService: IonicService) {
        this.__ionicSrv = ionicService;
    }

    /**
     * 判断是否有网络
     */
    isConnecting(): boolean {
        return this.ionSrv.gets.getNetworkType() != 'none';
    }

    /**
     * 是否运行到真机上
     */
    isCordova() {
        return this.ionSrv.platform.is('cordova');
    }

    /**
     * 是否真机环境
     */
    isMobile(): boolean {
        return this.ionSrv.platform.is('mobile');
    }

    /**
     * 是否android真机环境
     */
    isAndroid(): boolean {
        return this.isMobile() && this.ionSrv.platform.is('android');
    }

    /**
     * 是否ios真机环境
     */
    isIos(): boolean {
        return (
            this.isMobile() &&
            (this.ionSrv.platform.is('ios') ||
                this.ionSrv.platform.is('ipad') ||
                this.ionSrv.platform.is('iphone'))
        );
    }

    /**
     * 状态栏
     */
    statusBarStyle(): void {
        if (this.ionSrv.app.isMobile()) {
            this.ionSrv.statusBar.overlaysWebView(false);
            this.ionSrv.statusBar.styleLightContent();
            this.ionSrv.statusBar.backgroundColorByHexString(
                this.ionSrv.configSrv.platformConfig.statusBarColor,
            );
        }
    }

    /**
     * 隐藏启动页面
     */
    splashScreenHide(): void {
        return this.ionSrv.app.isMobile() && this.ionSrv.splashScreen.hide();
    }

    /**
     * 调用最小化app插件
     */
    minimize(): void {
        this.ionSrv.appMinimize.minimize();
    }

    /**
     * 通过浏览器打开url
     */
    openUrlByBrowser(url: string): void {
        this.ionSrv.inAppBrowser.create(url, '_system');
    }

    // 检测网络
    assertNetwork() {
        if (!this.isConnecting()) {
            this.ionSrv.noticeSrv.alert('未检测到网络,请连接网络');
        }
    }

    /**
     * 版本升级检查
     */
    assertVersion() {
        this.ionSrv.gets.getVersionNumber().subscribe(resVer => {
            this.ionSrv.httpSrv
                .post(`/ver/check`, { ver: resVer })
                .subscribe((res: any) => {
                    console.log(res);
                    const up = res.data || {};
                    if (up.url) {
                        this.ionSrv.noticeSrv
                            .alertConfirm(up.message, '更新')
                            .then(() => {
                                this.ionSrv.app.openUrlByBrowser(up.url);
                            })
                            .catch(() => {
                                console.log('no update');
                            });
                    }
                });
        });
    }
}
