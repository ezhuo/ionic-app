
import { Component } from '@angular/core';
import { ModalController, ViewController, Platform, Events, IonicPage, NavController } from 'ionic-angular';
import { FormBuilder, Validators } from '@angular/forms';
import { UserInfo } from '../../core/model/UserInfo';
import { NoticeService } from '../../core/utils/notice.service';
import { AuthService } from './../../core/data/auth.service';
import { UserService } from '../../core/data/users.service';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {
  submitted: boolean = false;
  loginForm: any;
  login$: any;

  constructor(public viewCtrl: ViewController,
    public formBuilder: FormBuilder,
    public events: Events,
    public noticeService: NoticeService,
    public modalCtrl: ModalController,
    public platform: Platform,
    public authService: AuthService,
    public nav: NavController,
    public userService: UserService) {

    this.loginForm = this.formBuilder.group({
      account: [this.userService.userInfo.true_name || 'admin', [Validators.required, Validators.minLength(2)]],// 第一个参数是默认值
      password: ['123456', [Validators.required, Validators.minLength(4)]]
    });
  }

  submit() {
    this.submitted = true;
    this.noticeService.showLoading('正在登录...');
    this.login$ = this.authService.doLogin(this.loginForm.value)
      .finally(() => {
        this.submitted = false;
        this.noticeService.clearLoading();
      })
      .subscribe(
        data => {
          this.noticeService.msg_info('登录成功！');
          setTimeout(() => {
            this.viewCtrl.dismiss();
          }, 0);
        },
        error => {
          this.noticeService.msg_info('登录失败！');
        }
      );

  }

  ionViewWillEnter() {
    const self = this;
    this.events.subscribe('android:backButtonAction', () => {
      //订阅安卓返回按钮事件
      if (!self.authService.checkAuth()) { //如果没有登录,弹出是否确定退出软件
        self.noticeService.alert({
          title: '确认退出软件？',
          buttons: [{ text: '取消' },
          {
            text: '确定',
            handler: () => {
              this.platform.exitApp();
            }
          }
          ]
        });
      }
    })
  }

  toRegister() {
    let modal = this.modalCtrl.create('RegisterPage');
    modal.present();
  }

  findPassword() {
    let modal = this.modalCtrl.create('FindPasswordPage');
    modal.present();
  }

}
