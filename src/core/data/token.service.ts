import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
import { NoticeService } from '../utils/notice.service';
import { http } from '../public/config';
import { StorageService } from '../utils/storage.service';
import { JwtHelper } from 'angular2-jwt';
import { UserService } from './users.service';
import * as helper from '../../helpers';
import * as md5 from 'blueimp-md5';

@Injectable()
export class TokenService {
  protected __token = '';
  protected __isAuth: Boolean = false;
  protected __local = null;
  protected __session = null;
  protected jwtHelper: JwtHelper = new JwtHelper();
  protected __menu: any[];

  constructor(
    private noticeService: NoticeService,
    private userService: UserService,
    private storageService: StorageService
  ) {
    this.__local = this.storageService.local;
    this.__session = this.storageService.session;
  }

  /**
   * Returns the token value
   * @returns string
   */
  token_read() {
    if (!this.__token) {
      this.__token = this.__session.get('token');
    }
    this.__token = this.__token || '';
    this.token_assign(this.__token);
    return this.__token;
  }

  token_assign(token): Boolean {
    try {
      this.__isAuth = false;
      if (!token) {
        throw new Error('token is empty');
      }
      this.__token = token;
      if (helper.IsEmpty(this.userService.userInfo)) {
        const userInfo = this.jwtHelper.decodeToken(token);
        this.userService.userInfo = userInfo;
      }
      this.__isAuth = true;
    } catch (e) {
      //
    }
    return this.__isAuth;
  }

  token_write(token): Boolean {
    token = token || '';
    // 设置token
    if (token.length > 10 && this.token_assign(token)) {
      this.__token = token;
      this.__session.set('token', token);
    } else {
      this.token_destory();
    }
    return this.isAuth;
  }

  token_destory() {
    // 注销token
    this.isAuth = false;
    this.__token = null;
    this.userService.userInfo = null;
    this.__session.clear();
    this.__local.clear();
    return true;
  }

  get isAuth() {
    this.__isAuth =
      (this.token_read() || '').length > 10 &&
      !helper.IsEmpty(this.userService.userInfo);

    if (this.__isAuth) {
      console.log('isAuth');
      this.menu_reload(); // 加载菜单
    }

    return this.__isAuth;
  }

  set isAuth(bool) {
    this.__isAuth = bool;
  }

  getRequestHeaders($data: any): HttpHeaders {
    let r_data = $data || {};
    // 数据发送类型
    const style = http.style || '10';
    let validate = '';
    const token = this.token_read();
    try {
      r_data = JSON.stringify(r_data);
      validate = style + token + r_data + http.check;
      // console.log(validate);
      validate = md5(validate);
    } catch (e) {
      this.noticeService.msg_error('package build error');
      console.error(e);
    }

    return new HttpHeaders()
      .set('style', style.toString())
      .set('token', this.__token)
      .set('validate', validate);
  }

  set app_menu(_menu: any[]) {
    this.__menu = _menu;
  }

  get app_menu() {
    return this.__menu;
  }

  menu_reload(__menus = null) {
    let tmp = null;
    if (__menus) {
      tmp = __menus;
      this.menu_cache(__menus);
    } else {
      tmp = this.__local.get('menu');
    }
    if (tmp && helper.isString(tmp)) {
      tmp = JSON.parse(tmp);
    }
    if (tmp) {
      // this.app_menu = [...tmp];
    }
  }

  menu_cache(__menus) {
    if (__menus) {
      this.__local.set('menu', __menus);
    }
  }

}
