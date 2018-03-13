import { Component } from '@angular/core';
import { NavController, ViewController, IonicPage } from 'ionic-angular';
import { FormBuilder, Validators } from '@angular/forms';
import { LoginPage } from '../login';

@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html'
})
export class RegisterPage {
  registerForm: any;

  constructor(private navCtrl: NavController,
    private viewCtrl: ViewController,
    private formBuilder: FormBuilder) {
    this.registerForm = this.formBuilder.group({
      username: [, [Validators.required, Validators.pattern('[(\u4e00-\u9fa5)0-9a-zA-Z\_\s@]+')]],
      verificationCode: [, [Validators.required, Validators.minLength(6), Validators.pattern('1[0-9]{6}')]],
      phone: [, [Validators.required, Validators.pattern('1[0-9]{10}')]],
      password: [, [Validators.required]]
    })
  };

  confirm() {
    this.navCtrl.setRoot(LoginPage)
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

}
