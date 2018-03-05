import { Component } from '@angular/core';
import { ModalController, ViewController, Platform, AlertController, Events, IonicPage, NavController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { FormBuilder, Validators } from '@angular/forms';
import { GlobalData } from "../../core/services/GlobalData";
import { CommonService } from "../../core/services/CommonService";
import { Helper } from "../../core/services/Helper";
import { UserInfo } from '../../core/model/UserInfo';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {
  submitted: boolean = false;
  loginForm: any;

  constructor(public viewCtrl: ViewController,
    public formBuilder: FormBuilder,
    public storage: Storage,
    public events: Events,
    public globalData: GlobalData,
    public modalCtrl: ModalController,
    public platform: Platform,
    public alertCtrl: AlertController,
    public helper: Helper,
    public nav: NavController,
    public commonService: CommonService) {
    this.loginForm = this.formBuilder.group({
      username: [this.globalData.username || 'admin', [Validators.required, Validators.minLength(2)]],// 第一个参数是默认值
      password: ['123456', [Validators.required, Validators.minLength(4)]]
    });
  }

  login(user) {
    this.submitted = true;
    this.commonService.getToken(user.username, user.password).mergeMap(token => {
      this.globalData.token = token;
      this.storage.set('token', token);
      return this.commonService.getUserInfo();
    }).subscribe((userInfo: UserInfo) => {
      this.submitted = false;
      this.helper.loginSuccessHandle(userInfo);
      this.viewCtrl.dismiss();
    }, () => {
      this.submitted = false;
    });
  }

  ionViewWillEnter() {
    this.events.subscribe('android:backButtonAction', () => { //订阅安卓返回按钮事件
      if (!this.globalData.user.id) { //如果没有登录,弹出是否确定退出软件
        this.alertCtrl.create({
          title: '确认退出软件？',
          buttons: [{ text: '取消' },
          {
            text: '确定',
            handler: () => {
              this.platform.exitApp();
            }
          }
          ]
        }).present();
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

  try() {
    this.globalData.token = 'test';
    let userInfo = {
      "id": 1,
      "username": "admin",
      "mobileNumber": "13800003333",
      "email": "admin@test.net",
      "realname": "张无忌",
      "departmentId": 1,
      "registerTime": "2017-11-24 08:46:54",
      "avatarId": null,
      "roles": [{
        "id": 2,
        "code": "app_admin",
        "name": "app管理员",
        "description": "",
        "clientType": 2,
        "resourceIds": null
      }]
    };
    this.helper.loginSuccessHandle(userInfo);
    this.viewCtrl.dismiss();
  }
}
