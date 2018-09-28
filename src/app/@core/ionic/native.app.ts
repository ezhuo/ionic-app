import { IonicService } from './ionic.service';
import { Observable } from 'rxjs';
import { FileEntry } from './native.plugins';

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
            this.ionSrv.statusBar.backgroundColorByHexString('#488aff'); //3261b3
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

    /**
     * 根据图片绝对路径转化为base64字符串
     * @param path 绝对路径
     */
    convertImgToBase64(path: string): Observable<string> {
        return Observable.create(observer => {
            this.ionSrv.file
                .resolveLocalFilesystemUrl(path)
                .then((fileEnter: FileEntry) => {
                    fileEnter.file(file => {
                        const reader = new FileReader();
                        reader.onloadend = function(e) {
                            observer.next(this.result);
                        };
                        reader.readAsDataURL(file);
                    });
                })
                .catch(err => {
                    this.ionSrv.logger.log(
                        err,
                        '根据图片绝对路径转化为base64字符串失败',
                    );
                    observer.error(false);
                });
        });
    }

    /**
     * 扫描二维码
     * @returns {any}
     */
    scan() {
        return Observable.create(observer => {
            this.ionSrv.barcodeScanner
                .scan()
                .then(barcodeData => {
                    observer.next(barcodeData.text);
                })
                .catch(err => {
                    this.ionSrv.logger.log(err, '扫描二维码失败');
                    observer.error(false);
                });
        });
    }

    // 检测网络
    assertNetwork() {
        if (!this.isConnecting()) {
            this.ionSrv.noticeSrv.alert('未检测到网络,请连接网络');
        }
    }
}
