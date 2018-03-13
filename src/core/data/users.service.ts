import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import * as helper from '../../helpers';
import { define } from '../public/config';
import { UserInfo } from './../model/userinfo.d';

@Injectable()
export class UserService {
  private __api_dt: any = null;
  private __userInfo: UserInfo = {};
  private __user: any = {};

  constructor() { }

  getUser(): Observable<any> {
    return Observable.of(this.__userInfo);
  }

  set userInfo(dd: any) {
    this.__userInfo = dd;
    if (dd) {
      const pic = helper.parseJSON(dd.images) || [];
      if (pic && pic.length > 0) {
        this.__userInfo.avatar = pic[0].path;
      } else {
        this.__userInfo.avatar = define.user_images;
      }

      this.__user.name = this.__userInfo.true_name;
      this.__user.avatar = this.__userInfo.avatar;
      this.__user.email = this.__userInfo.email || '';
      this.__user.key = this.__userInfo.id;
    }
    console.log(this.__userInfo);
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
