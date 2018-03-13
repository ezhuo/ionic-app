import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { ModalScalePage } from "./modal-scale/modal-scale";
import { ModalFromRightPage } from "./modal-from-right/modal-from-right";

/**
 * Generated class for the TransitionDemoPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-transition-demo',
  templateUrl: 'transition-demo.html',
})
export class TransitionDemoPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, public modalCtrl: ModalController) {
  }

  scaleModalScalePage() {
    this.modalCtrl.create(ModalScalePage, {}, {
      enterAnimation: 'modal-scale-enter',
      leaveAnimation: 'modal-scale-leave'
    }).present();
  }

  presentModalFromRightPage() {
    this.modalCtrl.create(ModalFromRightPage, {}, {
      enterAnimation: 'modal-from-right-enter',
      leaveAnimation: 'modal-from-right-leave'
    }).present();
  }
}
