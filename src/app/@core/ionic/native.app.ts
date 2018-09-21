import { NativeService } from './native.service';
import { Observable, zip } from 'rxjs';
import { FileEntry } from './native.plugins';

export class NativeApp {
    private __nativeSrv: NativeService;
    get ionNativeSrv() {
        return this.__nativeSrv;
    }

    constructor(nativeService: NativeService) {
        this.__nativeSrv = nativeService;
    }

    /**
     * 判断是否有网络
     */
    isConnecting(): boolean {
        return this.ionNativeSrv.gets.getNetworkType() != 'none';
    }

    /**
     * 是否真机环境
     */
    isMobile(): boolean {
        return this.ionNativeSrv.platform.is('mobile');
    }

    /**
     * 是否android真机环境
     */
    isAndroid(): boolean {
        return this.isMobile() && this.ionNativeSrv.platform.is('android');
    }

    /**
     * 是否ios真机环境
     */
    isIos(): boolean {
        return (
            this.isMobile() &&
            (this.ionNativeSrv.platform.is('ios') ||
                this.ionNativeSrv.platform.is('ipad') ||
                this.ionNativeSrv.platform.is('iphone'))
        );
    }

    /**
     * 状态栏
     */
    statusBarStyle(): void {
        if (this.ionNativeSrv.app.isMobile()) {
            this.ionNativeSrv.statusBar.overlaysWebView(false);
            this.ionNativeSrv.statusBar.styleLightContent();
            this.ionNativeSrv.statusBar.backgroundColorByHexString('#488aff'); //3261b3
        }
    }

    /**
     * 隐藏启动页面
     */
    splashScreenHide(): void {
        return (
            this.ionNativeSrv.app.isMobile() && this.ionNativeSrv.splashScreen.hide()
        );
    }

    /**
     * 调用最小化app插件
     */
    minimize(): void {
        this.ionNativeSrv.appMinimize.minimize();
    }

    /**
     * 通过浏览器打开url
     */
    openUrlByBrowser(url: string): void {
        this.ionNativeSrv.inAppBrowser.create(url, '_system');
    }

    /**
     * 根据图片绝对路径转化为base64字符串
     * @param path 绝对路径
     */
    convertImgToBase64(path: string): Observable<string> {
        return Observable.create(observer => {
            this.ionNativeSrv.file
                .resolveLocalFilesystemUrl(path)
                .then((fileEnter: FileEntry) => {
                    fileEnter.file(file => {
                        let reader = new FileReader();
                        reader.onloadend = function(e) {
                            observer.next(this.result);
                        };
                        reader.readAsDataURL(file);
                    });
                })
                .catch(err => {
                    this.ionNativeSrv.logger.err(
                        err,
                        '根据图片绝对路径转化为base64字符串失败',
                    );
                    observer.error(false);
                });
        });
    }

    /**
     * 拨打电话
     * @param number
     */
    /*    callNumber(number: string): void {
        this.cn
            .callNumber(number, true)
            .then(() => console.log('成功拨打电话:' + number))
            .catch(err => this.logger.err(err, '拨打电话失败'));
    }
*/
    /**
     * 扫描二维码
     * @returns {any}
     */
    scan() {
        return Observable.create(observer => {
            this.ionNativeSrv.barcodeScanner
                .scan()
                .then(barcodeData => {
                    observer.next(barcodeData.text);
                })
                .catch(err => {
                    this.ionNativeSrv.logger.err(err, '扫描二维码失败');
                    observer.error(false);
                });
        });
    }

    public assertNetwork() {
        if (!this.ionNativeSrv.app.isConnecting()) {
            this.ionNativeSrv.noticeService.alertInfo('未检测到网络,请连接网络');
        }
    }
}
