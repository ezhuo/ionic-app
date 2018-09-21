import { Injectable, Injector } from '@angular/core';
import { Platform } from '@ionic/angular';

import {
    AppMinimize,
    AppVersion,
    BarcodeScanner,
    // CallNumber,
    Camera,
    Device,
    Diagnostic,
    File,
    //FileOpener,
    FileTransfer,
    ImagePicker,
    InAppBrowser,
    WebView,
    Network,
    SplashScreen,
    StatusBar,
} from './native.plugins';

import { NativeApp } from './native.app';
import { NativeGets } from './native.gets';

import { LoggerService } from './logger.service';
import { NoticeService } from '../utils';

@Injectable()
export class NativeService {
    get platform() {
        return this.injector.get(Platform);
    }
    get statusBar() {
        return this.injector.get(StatusBar);
    }
    get splashScreen() {
        return this.injector.get(SplashScreen);
    }
    get appVersion() {
        return this.injector.get(AppVersion);
    }
    get camera() {
        return this.injector.get(Camera);
    }
    get file() {
        return this.injector.get(File);
    }
    get fileTransfer() {
        return this.injector.get(FileTransfer);
    }
    get inAppBrowser() {
        return this.injector.get(InAppBrowser);
    }
    get imagePicker() {
        return this.injector.get(ImagePicker);
    }
    get network() {
        return this.injector.get(Network);
    }
    get appMinimize() {
        return this.injector.get(AppMinimize);
    }
    get barcodeScanner() {
        return this.injector.get(BarcodeScanner);
    }
    get logger() {
        return this.injector.get(LoggerService);
    }
    get diagnostic() {
        return this.injector.get(Diagnostic);
    }
    get noticeService() {
        return this.injector.get(NoticeService);
    }
    get device() {
        return this.injector.get(Device);
    }
    get webView() {
        return this.injector.get(WebView);
    }
    // get cn() {
    //     return this.injector.get(CallNumber);
    // }

    private __nativeGets: NativeGets;
    private __nativeApp: NativeApp;
    get gets() {
        return this.__nativeGets;
    }
    get app() {
        return this.__nativeApp;
    }
    constructor(protected injector: Injector) {
        this.__nativeGets = new NativeGets(this);
        this.__nativeApp = new NativeApp(this);
    }
}
