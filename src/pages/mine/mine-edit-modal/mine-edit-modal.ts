import { Component } from '@angular/core';
import { Storage } from '@ionic/storage';
import { FormBuilder } from '@angular/forms';
import { ViewController } from 'ionic-angular';
import { NativeService } from '../../../core/utils/native.service';
import { UserService } from '../../../core/data/users.service';
import { ValidatorService } from './../../../core/data/validator.service';
import { NoticeService } from './../../../core/utils/notice.service';

@Component({
  selector: 'page-mine-edit-modal',
  templateUrl: 'mine-edit-modal.html'
})
export class MineEditModalPage {
  userInfo;
  userForm: any;
  verifyMessages = {
    'name': {
      'errorMsg': '',
      'required': '用户名为必填项',
      'minlength': '姓名最少2个字符',
      'chinese': '姓名必须是中文'
    },
    'phone': {
      'errorMsg': '',
      'required': '手机号码为必填项',
      'phone': '请输入正确的手机号码'
    },
    'email': {
      'errorMsg': '',
      'required': '电子邮箱为必填项',
      'email': '请输入正确的邮箱地址'
    }
  };

  constructor(private viewCtrl: ViewController,
    private storage: Storage,
    private formBuilder: FormBuilder,
    private userService: UserService,
    private nativeService: NativeService,
    private noticeService: NoticeService
  ) {
    this.userInfo = this.userService.userInfo;
    this.userForm = this.formBuilder.group({
      name: [this.userInfo.realname, [ValidatorService.required, ValidatorService.minLength(2), ValidatorService.chinese]],
      mobileNumber: [this.userInfo.mobileNumber, [ValidatorService.required, ValidatorService.phone]],
      email: [this.userInfo.email, [ValidatorService.required, ValidatorService.email]]
    });
    this.userForm.valueChanges
      .subscribe(data => {
        const verifyMessages = this.verifyMessages;
        for (const field in verifyMessages) {
          verifyMessages[field].errorMsg = '';
          const control = this.userForm.get(field);
          if (control && control.dirty && !control.valid) {
            const messages = verifyMessages[field];
            for (const key in control.errors) {
              messages[key] && (verifyMessages[field].errorMsg += messages[key] + ' ');
            }
          }
        }
      });
  }

  onSubmit() {
    Object.assign(this.userInfo, this.userForm.value);
    this.storage.set('UserInfo', this.userInfo);
    this.noticeService.msg_info('保存成功');
    this.viewCtrl.dismiss(this.userInfo);
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }
}
