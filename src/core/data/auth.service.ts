import { NoticeService } from '../utils/notice.service';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/finally';
import { catchError } from 'rxjs/operators';
import { HttpService } from './http.service';
import { TokenService } from './token.service';
import { StateService } from './state.service';

@Injectable()
export class AuthService {

  constructor(
    private noticeService: NoticeService,
    private http: HttpService,
    protected tokenService: TokenService,
    protected stateService: StateService
  ) { }

  /**
   * @param loginData 登录
   */
  doLogin(loginData: any): Observable<any> {
    const login$ = new Subject();
    const http$ = this.http
      .post('/auth/login', {
        login_type: 'sys',
        name: loginData.account,
        password: loginData.password
      })
      .finally(() => {
        const to = setTimeout(() => {
          http$.unsubscribe();
          clearTimeout(to);
        }, 10);
      })
      .subscribe(
        (data: any) => {
          // 登录成功
          if (this.tokenService.token_write(data.data.token)) {
            this.loginSuccess(data);
            login$.next(data);
          } else {
            login$.error({
              error: {
                message: '数据包不完整，请留意网络安全！'
              }
            });
          }
        },
        error => {
          // 登录失败
          login$.error(error);
        }
      );

    return login$;
  }

  /**
   * 登录成功
   */
  loginSuccess(data: any) {
    console.log('loginSuccess');
    const self = this;
    if (data && data.data && data.data.menu_list)
      this.tokenService.menu_reload(data.data.menu_list);

  }

  /**
   * 检查权限
   */
  checkAuth(): boolean {
    if (this.tokenService.isAuth) {
      return true;
    }
    return false;
  }

  logoutAuth() {
    return this.tokenService.token_destory();
  }
}
