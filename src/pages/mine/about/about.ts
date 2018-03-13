import { Component } from "@angular/core";
import { NavController } from "ionic-angular";
import { UpdateLogPage } from "../update-log/update-log";
import { FeedBackListPage } from "../feed-back/feed-back-list";
import { NativeService } from "../../../core/utils/native.service";
import { VersionService } from "../../../core/utils/version.service";
import { NoticeService } from './../../../core/utils/notice.service';
import { LoggerService } from './../../../core/utils/logger.service';

declare var AlloyLever;

@Component({
  selector: 'page-about',
  templateUrl: 'about.html'
})
export class AboutPage {
  currentVersionNo: string = '0.0.1';
  latestVersionNo: string = '0.0.1';
  lastVersionInfo: any = {};

  constructor(
    private navCtrl: NavController,
    private versionService: VersionService,
    private nativeService: NativeService,
    private loggerService: LoggerService,
    private noticeService: NoticeService
  ) {
    if (this.nativeService.isMobile()) {
      this.currentVersionNo = this.versionService.getCurrentVersionNo();
      this.latestVersionNo = this.versionService.getLatestVersionNo();
      this.lastVersionInfo = this.versionService.getLastVersionInfo();
    } else {
      this.noticeService.alert_info('请使用真机调试');
    }
  }

  ionViewDidEnter() {
    this.loggerService.AlloyLeverEntry('#entry3');
  }

  checkNewVersion() {
    this.versionService.checkNewVersion();
  }

  updateLog() {
    this.navCtrl.push(UpdateLogPage);
  }

  features() {
    this.noticeService.alert_info(this.lastVersionInfo.introduction);
  }

  feedBack() {
    this.navCtrl.push(FeedBackListPage);
  }

}


