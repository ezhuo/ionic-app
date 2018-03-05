import {Component} from "@angular/core";
import {NavController} from "ionic-angular";
import {NativeService} from "../../../core/services/NativeService";
import {UpdateLogPage} from "../update-log/update-log";
import {FeedBackListPage} from "../feed-back/feed-back-list";
import {VersionService} from "../../../core/services/VersionService";
declare var AlloyLever;

@Component({
  selector: 'page-about',
  templateUrl: 'about.html'
})
export class AboutPage {
  currentVersionNo: string = '0.0.1';
  latestVersionNo: string = '0.0.1';
  lastVersionInfo: any = {};

  constructor(private navCtrl: NavController,
              private versionService: VersionService,
              private nativeService: NativeService) {
    if (this.nativeService.isMobile()) {
      this.currentVersionNo = this.versionService.getCurrentVersionNo();
      this.latestVersionNo = this.versionService.getLatestVersionNo();
      this.lastVersionInfo = this.versionService.getLastVersionInfo();
    } else {
      this.nativeService.alert('请使用真机调试');
    }
  }

  ionViewDidEnter() {
    AlloyLever.entry('#entry3')
  }

  checkNewVersion() {
    this.versionService.checkNewVersion();
  }

  updateLog() {
    this.navCtrl.push(UpdateLogPage);
  }

  features() {
    this.nativeService.alert(this.lastVersionInfo.introduction);
  }

  feedBack() {
    this.navCtrl.push(FeedBackListPage);
  }

}


