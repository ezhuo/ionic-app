import {Component} from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';
import {HttpService} from "../../../../core/services/HttpService";
import {NativeService} from "../../../../core/services/NativeService";

/**
 * Generated class for the CustomerListPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-customer-list',
  templateUrl: 'customer-list.html',
})
export class CustomerListPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, public httpService: HttpService, public nativeService: NativeService) {
  }

  click() {
    this.httpService.get('/v1/user/view/id/1').subscribe(res => {
      this.nativeService.alert('请求成功', '', JSON.stringify(res))
    })
  }

}
