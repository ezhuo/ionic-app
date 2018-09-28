import {
    Component,
    ViewEncapsulation,
    OnInit,
    OnDestroy,
    Injector,
} from '@angular/core';
import { IndexControl } from '@core';
// declare var AlloyLever;

@Component({
    selector: 'tabs-mine-about',
    templateUrl: 'about.html',
    styleUrls: [`./about.scss`],
    encapsulation: ViewEncapsulation.None,
})
export class TabsMineAbout extends IndexControl implements OnInit, OnDestroy {
    currentVersionNo = '0.0.1';
    latestVersionNo = '0.0.1';
    lastVersionInfo: any = {};

    constructor(protected injector: Injector) {
        super(injector);
        this.loadVersionInfo();
    }

    ngOnInit(): void {
        super.ngOnInit();
    }

    ngOnDestroy(): void {
        super.ngOnDestroy();
    }

    // constructor2(
    //     private navCtrl: NavController,
    //     private versionService: VersionService,
    //     private nativeService: NativeService,
    // ) {
    //     this.loadVersionInfo();
    // }

    ionViewDidEnter() {
        // AlloyLever.entry('#entry3');
    }

    loadVersionInfo() {
        if (this.ionSrv.app.isMobile()) {
            // this.currentVersionNo = this.versionService.getCurrentVersionNo();
            // this.latestVersionNo = this.versionService.getLatestVersionNo();
            // this.lastVersionInfo = this.versionService.getLastVersionInfo();
        } else {
            this.noticeSrv.alertInfo('请使用真机调试');
        }
    }

    checkNewVersion() {
        // this.versionService.checkNewVersion();
        setTimeout(() => {
            this.loadVersionInfo();
        }, 4000);
    }

    updateLog() {
        // this.navCtrl.push(UpdateLogPage);
    }

    features() {
        // this.nativeService.alert(this.lastVersionInfo.introduction);
    }

    feedBack() {
        // this.navCtrl.push(FeedBackListPage);
    }
}
