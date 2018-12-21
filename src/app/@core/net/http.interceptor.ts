import { Injectable, Injector } from '@angular/core';
import {
  HttpSentEvent,
  HttpHeaderResponse,
  HttpProgressEvent,
  HttpUserEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpErrorResponse,
  HttpResponse,
} from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, of, throwError } from 'rxjs';
import { mergeMap, catchError } from 'rxjs/operators';
import { NoticeService } from '../utils/notice.service';
import { TokenService, UserService } from '../data';
import * as configInc from '../config.inc';
import * as helper from '../helpers';

@Injectable()
export class HttpAuthInterceptor implements HttpInterceptor {
  constructor(private injector: Injector) {}

  NoticeMothed = 'msg';

  get router() {
    return this.injector.get(Router);
  }

  get tokenSrv() {
    return this.injector.get(TokenService);
  }

  get noticeSrv() {
    return this.injector.get(NoticeService);
  }

  get userSrv() {
    return this.injector.get(UserService);
  }

  private httpResponseSuccess = (
    authReq,
    event: HttpResponse<any>,
  ): Observable<any> => {
    let $message = '';
    try {
      // this.httpService.end();
      const $httpCode = event.status;
      const $notice = 'Info';
      const data = event.body;
      this.noticeSrv.clearAll();

      if (helper.isObject(data.dt)) {
        this.userSrv.apiDt = data.dt || helper.getNow();
      }
      if (configInc.httpCode.hasOwnProperty($httpCode)) {
        $message += configInc.httpCode[$httpCode];
      }
      if (helper.isObject(data) && data.message && authReq.method !== 'GET') {
        $message += data.message;
      }

      switch ($httpCode) {
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
        this.noticeSrv[this.NoticeMothed + $notice]($message);
      }
    } catch (e) {
      console.error(e);
    }
    return of(Object.assign(event, { message2: $message }));
  };

  private httpResponseError = (
    authReq,
    err: HttpErrorResponse,
  ): Observable<any> => {
    let $message = '';
    try {
      // this.httpService.end();
      const $http_code = err.status;
      let $notice = 'error';
      const data = err.error;
      this.noticeSrv.clearAll();

      const format_validate_message = function($str) {
        let $msg_str = $str;
        if (helper.isArray($str)) {
          $msg_str = $str.join('<br/>');
          $msg_str =
            `<div style='width: 100%'><span style='font-size: 20px;color: red'>` +
            $msg_str +
            `</span></div>`;
        }
        return $msg_str;
      };

      if (configInc.httpCode.hasOwnProperty($http_code)) {
        $message += configInc.httpCode[$http_code];
      }
      if (typeof data === 'object' && data.message) {
        $message += data.message;
      }

      switch ($http_code) {
        case 400:
          break;
        case 401:
          // 重要通知
          this.tokenSrv.isAuth = false;
          // 退出系统
          setTimeout(() => {
            this.router.navigate([configInc.router.login]);
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
          this.noticeSrv.msgError(format_validate_message(data.message));
          $notice = '';
          break;
        case 500:
          break;
        case 504:
          break;
      }
      if ($message && $notice) {
        this.noticeSrv.msgWarning($message);
      }
    } catch (e) {
      console.error(e);
    }
    if (configInc.appDebug) console.error('[HTTP] >> interceptor >> ：', err);
    return throwError(Object.assign(err, { message2: $message }));
  };

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler,
  ): Observable<
    | HttpSentEvent
    | HttpHeaderResponse
    | HttpProgressEvent
    | HttpResponse<any>
    | HttpUserEvent<any>
  > {
    const rh = this.tokenSrv.getRequestHeaders(req.body);
    const authReq = req.clone({
      headers: req.headers
        .set('style', rh.get('style').toString())
        .set('token', rh.get('token').toString())
        .set('validate', rh.get('validate').toString()),
      withCredentials: true,
    });
    return next.handle(authReq).pipe(
      mergeMap((event: any) => {
        if (configInc.appDebug)
          console.log('[HTTP] >> interceptor >>：', event);
        // 允许统一对请求错误处理，这是因为一个请求若是业务上错误的情况下其HTTP请求的状态是200的情况下需要
        if (
          event instanceof HttpResponse &&
          [200, 201, 202, 203, 204, 205, 206].indexOf(event.status) > -1
        )
          return this.httpResponseSuccess(authReq, event);
        // 若一切都正常，则后续操作
        return of(event);
      }),
      catchError((err: HttpErrorResponse) => {
        if (configInc.appDebugError) console.error('[HTTP] >> interceptor >>：', err);
        return this.httpResponseError(authReq, err);
      }),
    );
  }
}
