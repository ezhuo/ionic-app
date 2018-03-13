import { Injectable, Injector } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { StateService } from './../data/state.service';
import { NativeService } from './native.service';
import { Platform, ModalController, Events } from "ionic-angular";
import { NoticeService } from './notice.service';
import { TokenService } from '../data/token.service';
import { StorageService } from './storage.service';
import { LoggerService } from './logger.service';
import { PushService } from './push.service';


/**
 * 用于应用启动时
 * 一般用来获取应用所需要的基础数据等
 */
@Injectable()
export class StartupService {

    constructor(
        private injector: Injector,
        private storage: StorageService,
        private noticeService: NoticeService,
        private tokenService: TokenService,
        private modalCtrl: ModalController,
        private pushService: PushService
    ) { }

    get httpClient() {
        return this.injector.get(HttpClient);
    }
    get stateService() {
        return this.injector.get(StateService);
    }
    get nativeService() {
        return this.injector.get(NativeService);
    }

    get events() {
        return this.injector.get(Events);
    }

    get logger() {
        return this.injector.get(LoggerService);
    }

    platformReady() {
        this.nativeService.statusBarStyle();
        this.nativeService.splashScreenHide();
        this.nativeService.assertNetwork();//检测网络
    }

    userTokenstart() {
        const token = this.tokenService.token_read();
        if (!token) {
            this.modalCtrl.create('LoginPage').present();
        };
    }

    loggerInit() {
        this.logger.funDebugInit();//初始化fundebug
        this.logger.alloyLeverInit();//本地"开发者工具"
    }

    pushInit(nav: any) {
        this.pushService.initJpush();//初始化极光推送
        this.pushService.jpushOpenNotification(nav);//处理打开推送消息事件
    }

    getStorageDriver() {
        this.storage.ionicStorage.remove('a');
        this.storage.ionicStorage.set('a', 'fdaf');
        console.log(this.storage.ionicStorage.driver);
        this.storage.ionicStorage.get('a').then((data) => {
            console.log(data);
        })
    }

}