import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Events } from 'ionic-angular';
import { NativeService } from './native.service';
import { JPush } from '../../../typings/modules/jpush/index';
import { is_debug } from './../public/config';

@Injectable()
export class PushService {

    constructor(
        private events: Events,
        private nativeService: NativeService,
        private jPush: JPush
    ) { }

    /**
        * 极光推送
    */
    initJpush() {
        if (!this.nativeService.isMobile()) {
            return;
        }
        this.jPush.init();
        this.jPush.setDebugMode(is_debug);
        this.jPushAddEventListener();
    }

    private jPushAddEventListener() {
        this.jPush.getUserNotificationSettings().then(result => {
            if (result == 0) {
                console.log('jpush-系统设置中已关闭应用推送');
            } else if (result > 0) {
                console.log('jpush-系统设置中打开了应用推送');
            }
        });
        //点击通知进入应用程序时会触发的事件
        document.addEventListener('jpush.openNotification', event => {
            this.setIosIconBadgeNumber(0);
            let content = this.nativeService.isIos() ? event['aps'].alert : event['alert'];
            console.log('jpush.openNotification' + content);
            this.events.publish('jpush.openNotification', content);
        }, false);

        //收到通知时会触发该事件
        document.addEventListener('jpush.receiveNotification', event => {
            let content = this.nativeService.isIos() ? event['aps'].alert : event['alert'];
            console.log('jpush.receiveNotification' + content);
        }, false);

        //收到自定义消息时触发这个事件
        document.addEventListener('jpush.receiveMessage', event => {
            let message = this.nativeService.isIos() ? event['content'] : event['message'];
            console.log('jpush.receiveMessage' + message);
        }, false);

    }

    jpushOpenNotification(nav: any) {

        //当点击极光推送消息跳转到指定页面
        this.events.subscribe('jpush.openNotification', content => {
            let tabs = nav.getActiveChildNav();
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
                // activeNav.push(AboutPage);//跳转到指定页面
            });
        });

    }

    //设置ios应用角标数量
    setIosIconBadgeNumber(badgeNumber) {
        if (this.nativeService.isIos()) {
            this.jPush.setBadge(badgeNumber);//上传badge值到jPush服务器
            this.jPush.setApplicationIconBadgeNumber(badgeNumber);//设置应用badge值
        }
    }
}
