import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { NoticeService } from '../../../../core/utils/notice.service';

/**
 * Generated class for the TaskPatrolPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@Component({
  selector: 'page-patrol-task',
  templateUrl: 'patrol-task.html',
})
export class PatrolTaskPage {

  //登录用户按钮权限code集合
  buttonCodes = [];

  constructor(public navCtrl: NavController,
    public noticeService: NoticeService,
    public navParams: NavParams) {

  }

  click() {
    this.noticeService.alert_info('开发中...');
  }

  assertButtonPermission(code) {
    return this.buttonCodes.indexOf(code) != -1;
  }

}
