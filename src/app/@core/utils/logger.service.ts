import { Injectable, Injector } from '@angular/core';
import { UserService } from '../data';
// import * as fundebug from 'fundebug-javascript';

/**
 * Utils类存放和业务无关的公共方法
 * @description
 */
@Injectable()
export class LoggerService {
    constructor(protected injector: Injector) {}

    get userSrv() {
        return this.injector.get(UserService);
    }

    log(err: any, action: string, other = null): void {
        console.log('Logger.log：action-' + action);
        other && console.log(other);
        console.log(err);
        // fundebug.notifyError(err, {
        //     metaData: {
        //         action, // 操作名称
        //         other, // 其他数据信息
        //         user: {
        //             id: this.userSrv.user.key || 0,
        //             name: this.userSrv.user.name || 'test',
        //         },
        //     },
        // });
    }

    httpLog(err: any, msg: string, other = {}): void {
        console.log('Logger.httpLog：msg-' + msg);
        // fundebug.notifyHttpError(err, {
        //     metaData: {
        //         action: msg, // 操作名称
        //         other, // 其他数据信息
        //         user: {
        //             id: this.userSrv.user.key || 0,
        //             name: this.userSrv.user.name || 'test',
        //         },
        //     },
        // });
    }
}
