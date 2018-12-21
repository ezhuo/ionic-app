import {
  Component,
  OnInit,
  OnDestroy,
  Injector,
  ViewEncapsulation,
} from '@angular/core';
import { FormGroup, Validators, NgForm } from '@angular/forms';
import { IndexControl, LoginOptions } from '@core';

@Component({
  selector: 'app-passport-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class UserLoginComponent extends IndexControl
  implements OnInit, OnDestroy {
  form: FormGroup;
  error = '';
  type = 0;
  login$: any;
  captcha$: any;
  captchaData: any = {};
  isLoading: Boolean = false;
  login: LoginOptions = { username: '', password: '' };
  submitted = false;

  constructor(protected injector: Injector) {
    super(injector);
    super.__init__(this);

    this.form = this.FormBuilder.group({
      account: [null, [Validators.required, Validators.minLength(1)]],
      password: [null, Validators.required],
      mobile: [null, [Validators.required, Validators.pattern(/^1\d{10}$/)]],
      captcha: [null, [Validators.required]],
      remember: [true],
    });
  }

  ngOnInit(): void {
    super.ngOnInit();
    this.ionSrv.menu.enable(false);
    // this.getCaptchaPic();
  }

  ngOnDestroy(): void {
    super.ngOnDestroy();
    if (this.interval$) clearInterval(this.interval$);
    if (this.login$ && this.login$.subscribe) {
      this.login$.subscribe();
      this.login$ = null;
    }
    if (this.captcha$ && this.captcha$.subscribe) {
      this.captcha$.subscribe();
      this.captcha$ = null;
    }
  }

  // region: fields

  get account() {
    return this.form.controls.account;
  }
  get password() {
    return this.form.controls.password;
  }
  get mobile() {
    return this.form.controls.mobile;
  }
  get captcha() {
    return this.form.controls.captcha;
  }
  get loading() {
    if (!this.isLoading) return false;
    return this.stateSrv.httpLoading;
  }

  // endregion

  switch(ret: any) {
    this.type = ret.index;
  }

  // region: get captcha

  count = 0;
  interval$: any;

  getCaptcha() {
    this.count = 59;
    this.interval$ = setInterval(() => {
      this.count -= 1;
      if (this.count <= 0) clearInterval(this.interval$);
    }, 1000);
  }

  getCaptchaPic() {
    this.isLoading = false;
    if (this.captcha$ && this.captcha$.unsubscribe) {
      this.captcha$.unsubscribe();
    }
    this.captcha$ = this.httpSrv
      .get(`/auth/captcha`)
      .subscribe((result: any) => {
        this.captchaData = result;
      });
  }

  // endregion

  submit() {
    this.error = '';
    this.type = 0;
    // if (this.type === 0) {
    //     this.account.markAsDirty();
    //     this.account.updateValueAndValidity();
    //     this.password.markAsDirty();
    //     this.password.updateValueAndValidity();
    //     this.captcha.markAsDirty();
    //     this.captcha.updateValueAndValidity();
    //     if (
    //         this.account.invalid ||
    //         this.password.invalid ||
    //         this.captcha.invalid ||
    //         !this.captchaData['key']
    //     )
    //         return;
    // } else {
    //     this.mobile.markAsDirty();
    //     this.mobile.updateValueAndValidity();
    //     this.captcha.markAsDirty();
    //     this.captcha.updateValueAndValidity();
    //     if (this.mobile.invalid || this.captcha.invalid) return;
    // }

    if (this.type === 0) {
      this.isLoading = true;
      const value = Object.assign(this.form.value, {
        captchaParams: {
          key: this.captchaData.key,
          sensitive: this.captchaData.sensitive,
        },
      });
      this.login$ = this.authSrv.doLogin(value).subscribe(
        (data: any) => {
          if (this.configSrv.appDebug) console.log('login.component:', data);
          this.error = '';
          // this.noticeSrv.msg_success('登录成功！');
          return this.goDefaultURL();
        },
        error => {
          console.error('login.component:', error);
          this.getCaptchaPic();
          if (error && error.message2) {
            return (this.error = error.message2);
          }
          return (this.error = `账户或密码错误`);
        },
      );
    }
  }

  // region: social

  goDefaultURL() {
    return this.route.navigate([this.configSrv.config.router.defaultUrl]);
  }

  onLogin(form: NgForm) {
    this.submitted = true;

    if (form.valid) {
      this.login$ = this.authSrv
        .doLogin({
          account: this.login.username,
          password: this.login.password,
        })
        .subscribe(
          (data: any) => {
            if (this.configSrv.appDebug) console.log('login.component:', data);
            this.error = '';
            // this.noticeSrv.msg_success('登录成功！');
            return this.goDefaultURL();
          },
          error => {
            console.error('login.component:', error);
            this.getCaptchaPic();
            if (error && error.message2) {
              return (this.error = error.message2);
            }
            return (this.error = `账户或密码错误`);
          },
        );
      // this.userData.login(this.login.username);
      // this.route.navigateByUrl('/app/tabs/(schedule:schedule)');
    }
  }

  onSignup() {
    this.route.navigateByUrl('/signup');
  }

  // endregion
}
