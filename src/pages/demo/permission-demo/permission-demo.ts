import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { CommonService } from "../../../core/services/CommonService";
import { NativeService } from "../../../core/services/NativeService";
import { PatrolTaskPage } from "./patrol-task/patrol-task";
import { CustomerListPage } from "./customer-list/customer-list";

/**
 * Generated class for the PermissionDemoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-permission-demo',
  templateUrl: 'permission-demo.html',
})
export class PermissionDemoPage {
  // 定义app所有菜单关系,其中code对应后台资源配置的code
  menuRelation = [{
    code: 'app_menu_patrol',
    name: '巡检',
    url: '',
    icon: 'build',
    color: '#63c6e6',
  }, {
    code: 'app_menu_repair',
    name: '消缺',
    url: '',
    icon: 'car',
    color: '#868fe7',
  }];

  //当前登录用户拥有的菜单
  menu = [{
    code: 'app_menu_customer',
    name: '客户档案',
    url: '',
    icon: 'people',
    color: '#eec56d',
  }];

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public nativeService: NativeService,
    public commonService: CommonService) {
    let menu = [];
    //从后台获取当前登录用户的菜单资源
    this.commonService.getResource(1).subscribe(res => {
      for (let item of res) {
        for (let _menuRelation of this.menuRelation) {
          if (item.code == _menuRelation.code) {
            menu.push(_menuRelation);
          }
        }
      }
      this.menu = this.menu.concat(menu);
    })
  }

  navigation(code) {
    switch (code) {
      case 'app_menu_patrol':
        this.navCtrl.push(PatrolTaskPage);
        break;
      case 'app_menu_customer':
        this.navCtrl.push(CustomerListPage);
        break;
      default:
        this.nativeService.alert('未找到页面');
    }
  }

}
