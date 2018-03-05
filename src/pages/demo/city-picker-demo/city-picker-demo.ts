import {Component} from "@angular/core";
import {NavController, NavParams} from "ionic-angular";
import {NativeService} from "../../../core/services/NativeService";
import {DemoService} from "../DemoService";

/**
 * Generated class for the CityPickerDemoPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-city-picker-demo',
  templateUrl: 'city-picker-demo.html',
})
export class CityPickerDemoPage {
  cityData: any[] = []; //城市数据
  cityName:string = '广东省-广州市-天河区'; //初始化城市名
  code: string; //城市编码
  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public nativeService: NativeService,
              public demoService: DemoService) {
  }

  ionViewDidLoad() {
    //获取城市数据
    //实际开发中,城市数据应该从后台接口获取
    this.demoService.geCityData().subscribe(res => {
      this.cityData = res;
    })
  }

  //城市选择器被改变时触发的事件
  cityChange(event) {
    this.code = event['region'].value
  }

  details(url) {
    this.nativeService.openUrlByBrowser(url);
  }

}
