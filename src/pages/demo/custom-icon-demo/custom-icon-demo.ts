import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { NativeService } from "../../../core/utils/native.service";

/*
  Generated class for the CustomIconDemo page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-custom-icon-demo',
  templateUrl: 'custom-icon-demo.html'
})
export class CustomIconDemoPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, private nativeService: NativeService) { }


  details(url) {
    this.nativeService.openUrlByBrowser(url);
  }

}
