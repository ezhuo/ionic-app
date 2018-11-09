import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { UserInfo, User } from '@core';
import { define, appDebug } from '../config.inc';
import * as helper from '../helpers';

@Injectable({
    providedIn: 'root',
})
export class UserService {
    private __api_dt: any = null;
    private __userInfo: UserInfo = { id: 0 };
    private __user: User = {};

    constructor() {}

    getUser(): Observable<UserInfo> {
        return of(this.__userInfo);
    }

    set userInfo(dd: UserInfo) {
        this.__userInfo = dd;
        if (dd) {
            this.__userInfo.avatar = define.userImages;
            if (dd.images) {
                const pic = helper.parseJSON(dd.images) || [];
                if (pic && pic.length > 0) {
                    this.__userInfo.avatar = pic[0].url;
                }
            }
            this.__user.name = this.__userInfo.true_name;
            this.__user.avatar = this.__userInfo.avatar;
            this.__user.email = this.__userInfo.email || '';
            this.__user.key = this.__userInfo.id;
        }
        if (appDebug) console.log(this.__userInfo);
    }

    get userInfo(): UserInfo {
        return this.__userInfo;
    }

    get user(): User {
        return this.__user;
    }

    set apiDt(dd: any) {
        this.__api_dt = dd;
    }

    get apiDt() {
        return this.__api_dt;
    }
}
