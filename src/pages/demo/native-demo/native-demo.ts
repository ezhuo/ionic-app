import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';
import {NativeService} from "../../../core/services/NativeService";
import {Position} from "../../../core/model/type";

@Component({
  selector: 'page-native-demo',
  templateUrl: 'native-demo.html',
})
export class NativeDemoPage {
  networkType = 'unknown';
  currentVersionNo: string = '1.0.0';
  scanText = '';
  location = {};
  imgPath;

  constructor(public navCtrl: NavController, public nativeService: NativeService) {
  }

  ionViewWillEnter() {
    if (!this.nativeService.isMobile()) {
      this.nativeService.alert('请使用真机调试');
    }
  }

  getNetworkType() {
    this.networkType = this.nativeService.getNetworkType()
  }

  getVersionNumber() {
    if (this.nativeService.isMobile()) {
      this.nativeService.getVersionNumber().subscribe(res => {
        this.currentVersionNo = res;
      })
    }
  }

  callNumber(number) {
    this.nativeService.isMobile() && this.nativeService.callNumber(number);
  }

  scan() {
    if (this.nativeService.isMobile()) {
      this.nativeService.scan().subscribe(res => {
        this.scanText = res;
      });
    }
  }

  getPictureByCamera() {
    if (this.nativeService.isMobile()) {
      this.nativeService.getPictureByCamera({
        destinationType: 1//期望返回的图片格式,1图片路径
      }).subscribe(img => {
        this.imgPath = img;
      });
    }
  }

  getUserLocation() {
    this.nativeService.getUserLocation().subscribe(res => {
      this.location = res;
    });
  }

  navigation(){
    let startPoint:Position = {'lng': '113.350912', 'lat': '23.119495'};
    let endPoint :Position= {'lng': '113.450912', 'lat': '23.219495'};
    this.nativeService.navigation(startPoint,endPoint).subscribe(res => {
      console.log(res);
    });
  }


}
