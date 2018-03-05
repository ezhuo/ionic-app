import {Component} from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';
import {NativeService} from '../../../core/services/NativeService';
declare var AlloyLever;

@Component({
  selector: 'page-allowlever-demo',
  templateUrl: 'allowlever-demo.html',
})
export class AllowleverDemoPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, private nativeService: NativeService) {
  }

  ionViewDidEnter() {
    AlloyLever.entry('#entry2')
  }

  details(url){
    this.nativeService.openUrlByBrowser(url);
  }

}
