import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { NativeService } from '../../../core/utils/native.service';
import { LoggerService } from '../../../core/utils/logger.service';

@Component({
  selector: 'page-allowlever-demo',
  templateUrl: 'allowlever-demo.html',
})
export class AllowleverDemoPage {

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private logger: LoggerService,
    private nativeService: NativeService) {
  }

  ionViewDidEnter() {
    this.logger.AlloyLeverEntry('#entry2');
  }

  details(url) {
    this.nativeService.openUrlByBrowser(url);
  }

}
