import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { MineService } from "../MineService";
import { FeedBackPage } from "./feed-back";
import { FeedBackDetailPage } from "./feed-back-detail";
import { PAGE_SIZE } from "../../../core/public/config";

/**
 * Generated class for the FeedBackListPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-feed-back-list',
  templateUrl: 'feed-back-list.html',
})
export class FeedBackListPage {

  query = {
    page: 1,
    rows: PAGE_SIZE,
    sourceId: 1//1:现场作业app；2:精准营销app；3:web
  };
  data = {
    total: 0,
    rows: []
  };

  constructor(public navCtrl: NavController, private mineService: MineService) {
    this.data = {
      total: 1,
      rows: [{
        id: 1,
        title: '测试1',
        content: '哈哈哈,这是写死的.',
        state: 1,
        createTime: new Date(),
      }]
    }
    // this.requirementPersonList();
  }


  requirementPersonList() {
    this.mineService.requirementPersonList(this.query).subscribe(res => {
      this.data = res;
    })
  }

  doSearch(pageNum) {
    this.query.page = pageNum;
    this.requirementPersonList();
  }

  add() {
    this.navCtrl.push(FeedBackPage);
  }

  detail(id) {
    this.navCtrl.push(FeedBackDetailPage, { id: id });
  }

}
