import { Component } from '@angular/core';
import {IonicPage, NavController, NavParams, ViewController} from 'ionic-angular';

/**
 * Generated class for the ModalScalePage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-modal-scale',
  templateUrl: 'modal-scale.html',
})
export class ModalScalePage {

  constructor(public navCtrl: NavController, public navParams: NavParams,public viewCtrl: ViewController) {
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }


}
