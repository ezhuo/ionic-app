import {Component} from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';
import {MineService} from "../MineService";

/**
 * Generated class for the FeedBackDetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-feed-back-detail',
  templateUrl: 'feed-back-detail.html',
})
export class FeedBackDetailPage {

  detail = {
    requirement: {},
    answerList: []
  };

  constructor(public navCtrl: NavController, public navParams: NavParams, private mineService: MineService) {
    let id = this.navParams.get('id');
    this.mineService.requirementDetail(id).subscribe(res => {
      this.detail = res;
    })
  }

}
