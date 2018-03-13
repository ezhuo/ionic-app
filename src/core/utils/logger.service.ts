import { Injectable, ErrorHandler } from '@angular/core';
import { Platform } from "ionic-angular";
import { UserService } from '../data/users.service';
import { AppVersion } from "@ionic-native/app-version";
import { is_debug, define } from '../public/config';

//参考文档:https://docs.fundebug.com/notifier/javascript/framework/ionic2.html
// import * as fundebug from 'fundebug-javascript';
declare var AlloyLever;
declare var fundebug;

export class FunDebugErrorHandler implements ErrorHandler {
  handleError(err: any): void {
    // fundebug.notifyError(err);
    console.error(err);
  }
}

/**
 * Utils类存放和业务无关的公共方法
 * @description
 */
@Injectable()
export class LoggerService {
  constructor(
    private userService: UserService,
    private platform: Platform,
    private appVersion: AppVersion) {

    if (this.isFundebug()) {
      fundebug.apikey = define.fundebug_api_key;
      // 应用开发阶段，development:开发;production:生产
      fundebug.releasestage = is_debug ? 'development' : 'production';
      // 如果暂时不需要使用Fundebug，将silent属性设为true
      fundebug.silent = !is_debug;
    }

  }

  isMobile(): boolean {
    return this.platform.is('mobile') && !this.platform.is('mobileweb');
  }

  isFundebug() {
    return (typeof fundebug != 'undefined');
  }

  log(info: any, action: string, other = null): void {
    console.log(info);
  }

  err(err: any, action: string, other = null): void {
    console.error('Logger.log：action-' + action);
    other && console.error(other);
    console.error(err);

    if (this.isFundebug())
      fundebug.notifyError(err,
        {
          metaData: {
            action: action,//操作名称
            other: other,//其他数据信息
            user: { id: this.userService.userInfo.id, name: this.userService.userInfo.true_name }
          }
        });
  }

  httpLog(err: any, msg: string, other = {}): void {
    console.log('Logger.httpLog：msg-' + msg);
    if (this.isFundebug())
      fundebug.notifyHttpError(err,
        {
          metaData: {
            action: msg,//操作名称
            other: other,//其他数据信息
            user: { id: this.userService.userInfo.id, name: this.userService.userInfo.true_name }
          }
        });
  }

  funDebugInit() {
    if (this.isMobile() && this.isFundebug()) {
      this.appVersion.getAppName().then((version: string) => {
        fundebug.appversion = version;
      }).catch(err => {
        this.log(err, '获得app name失败');
      });
    }
  }

  /**
   * AlloyLever,一款本地"开发者工具"
   * 文档:https://github.com/AlloyTeam/AlloyLever
   */
  alloyLeverInit() {
    AlloyLever.config({
      cdn: 'http://s.url.cn/qqun/qun/qqweb/m/qun/confession/js/vconsole.min.js',  //vconsole的CDN地址
      /*reportUrl: "//a.qq.com",  //错误上报地址
      reportPrefix: 'qun',    //错误上报msg前缀，一般用于标识业务类型
      reportKey: 'msg',        //错误上报msg前缀的key，用户上报系统接收存储msg
      otherReport: {              //需要上报的其他信息
        uin: 491862102
      },*/
      entry: "#entry"         //请点击这个DOM元素6次召唤vConsole。//你可以通过AlloyLever.entry('#entry2')设置多个机关入口召唤神龙
    })
  }

  AlloyLeverEntry(val) {
    return AlloyLever.entry(val);
  }

}
