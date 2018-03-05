import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { NativeService } from "../../../../core/services/NativeService";
import { CommonService } from "../../../../core/services/CommonService";

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
    public nativeService: NativeService,
    public commonService: CommonService,
    public navParams: NavParams) {
    //从后台获取当前登录用户的按钮权限
    this.commonService.getResource(3).subscribe(res => {
      this.buttonCodes = res.map(item => item.code);
    })
  }

  click() {
    this.nativeService.alert('开发中...');
  }

  assertButtonPermission(code) {
    return this.buttonCodes.indexOf(code) != -1;
  }

}
