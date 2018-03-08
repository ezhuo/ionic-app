import { NoticeService } from '../utils/notice.service';
import { Injectable, Injector } from '@angular/core';
import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpErrorResponse,
  HttpResponse
} from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { TokenService } from './token.service';

import 'rxjs/add/operator/do';

import * as helper from '../../helpers';
import { UserService } from './users.service';
import { StateService } from './state.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(
    private tokenService: TokenService,
    private noticeService: NoticeService,
    private stateService: StateService,
    private userService: UserService,
    private injector: Injector
  ) { }

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const rh = this.tokenService.getRequestHeaders(req.body);
    const authReq = req.clone({
      headers: req.headers
        .set('style', rh.get('style').toString())
        .set('token', rh.get('token').toString())
        .set('validate', rh.get('validate').toString())
    });

    return next.handle(authReq).do(
      (event: HttpEvent<any>) => {
        if (event instanceof HttpResponse) {
          this.httpResponseSuccess(authReq, event);
        }
      },
      (err: any) => {
        if (err instanceof HttpErrorResponse) {
          this.httpResponseError(authReq, err);
        }
      }
    );
  }

  private httpResponseSuccess(authReq, event: HttpResponse<any>) {
    // console.log(event);
    try {
      const $http_code = event.status;
      const $notice = 'info';
      let $message = '';
      const data = event.body;
      this.noticeService.clear();

      if (helper.isObject(data.dt)) {
        this.userService.apiDt = data.dt || helper.getNow();
      }
      if (this.stateService.config.http_code.hasOwnProperty($http_code)) {
        $message += this.stateService.config.http_code[$http_code];
      }
      if (helper.isObject(data) && data.message && authReq.method !== 'GET') {
        $message += data.message;
      }

      switch ($http_code) {
        case 200:
          break;
        case 201:
          break;
        case 202:
          break;
        case 203:
          break;
        case 204:
          break;
        case 205:
          break;
      }

      if ($message && $notice) {
        this.noticeService['msg_' + $notice]($message);
      }
    } catch (e) {
      console.error(e);
    }
    return event;
  }

  private httpResponseError(authReq, err: HttpErrorResponse) {
    // console.log(err);
    try {
      const $http_code = err.status;
      let $notice = 'error';
      let $message = '';
      const data = err.error;
      this.noticeService.clear();

      const format_validate_message = function ($str) {
        let $msg_str = $str;
        if (helper.isArray($str)) {
          $msg_str = $str.join('<br/>');
          $msg_str = `<div style='width: 100%'><span style='font-size: 20px;color: red'>${$msg_str}</span></div>`;
        }
        return $msg_str;
      };

      if (this.stateService.config.http_code.hasOwnProperty($http_code)) {
        $message += this.stateService.config.http_code[$http_code];
      }
      if (typeof data === 'object' && data.message) {
        $message += data.message;
      }

      switch ($http_code) {
        case 400:
          break;
        case 401:
          // 重要通知
          this.tokenService.isAuth = false;
          // 退出系统
          setTimeout(() => {
            // this.router.navigate([this.stateService.config.router.login]);
          }, 2000);
          // _utils.storage_clear(configService);
          break;
        case 403:
          break;
        case 404:
          break;
        case 406:
          break;
        case 410:
          break;
        case 411:
          break;
        case 412:
          break;
        case 422:
          this.noticeService.alert_info(
            format_validate_message(data.message)
          );
          $notice = '';
          break;
        case 500:
          break;
      }

      if ($message && $notice) {
        this.noticeService['msg_' + $notice]($message);
      }
    } catch (e) {
      console.error(e);
    }
    return err;
  }
}
