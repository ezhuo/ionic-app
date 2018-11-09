import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

import { define, appDebug } from '../config.inc';
import * as helper from '../helpers';

@Injectable({
    providedIn: 'root',
})
export class UserService {
    private __api_dt: any = null;
    private __userInfo: any = {};
    private __user: any = {};

    constructor() {}

    getUser(): Observable<any> {
        return of(this.__userInfo);
    }

    set userInfo(dd: any) {
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

    get userInfo() {
        return this.__userInfo;
    }

    get user() {
        return this.__user;
    }

    set apiDt(dd: any) {
        this.__api_dt = dd;
    }

    get apiDt() {
        return this.__api_dt;
    }
}
