import {
    Component,
    ViewEncapsulation,
    OnInit,
    OnDestroy,
    Injector,
} from '@angular/core';
import { IndexControl } from '@core';

// import { MineEditPage } from './mine-edit/mine-edit';
// import { MineEditAvatarModalPage } from './mine-edit-avatar-modal/mine-edit-avatar-modal';
// import { AboutPage } from './about/about';
// import { LoginPage } from '../login/login';
// import { Helper } from '../../providers/Helper';
// import { WorkMapPage } from './work-map/work-map';
// import { SettingPage } from './setting/setting';
// import { NativeService } from '../../providers/NativeService';
// import { FileCachePage } from '../../shared/file-cache/file-cache';
// import { GlobalData } from '../../providers/GlobalData';

@Component({
    selector: 'tabs-mine',
    templateUrl: 'mine.html',
    styleUrls: [`./mine.scss`],
    encapsulation: ViewEncapsulation.None,
})
export class TabsMine extends IndexControl implements OnInit, OnDestroy {
    userInfo;

    constructor(protected injector: Injector) {
        super(injector);
        // this.userInfo = this.globalData.user;
        this.ionEvents.subscribe('user:login', userInfo => {
            this.userInfo = userInfo;
        });
    }

    ngOnInit(): void {
        super.ngOnInit();
    }

    ngOnDestroy(): void {
        super.ngOnDestroy();
    }

    presentPopover(event: Event) {}

    // constructor2(
    //     public navCtrl: NavController,
    //     public platform: Platform,
    //     public helper: Helper,
    //     public modalCtrl: ModalController,
    //     public nativeService: NativeService,
    //     public globalData: GlobalData,
    //     private events: Events,
    //     public alertCtrl: AlertController,
    // ) {}

    edit() {
        // this.navCtrl.push(MineEditPage);
    }

    setting() {
        // this.navCtrl.push(SettingPage);
    }

    loginOut() {
        // const modal = this.modalCtrl.create(LoginPage);
        // modal.present();
        // modal.onDidDismiss(userInfo => {
        //     if (userInfo) {
        //         this.userInfo = userInfo;
        //     }
        // });
    }

    // 工作地图
    map() {
        // this.navCtrl.push(WorkMapPage);
    }

    fileCache() {
        // this.navCtrl.push(FileCachePage);
    }

    exitSoftware() {
        this.noticeSrv
            .alertConfirm('确认退出软件？')
            .then(() => {
                // this.platform.exitApp();
            })
            .catch(() => {});
    }

    about() {
        // this.navCtrl.push(AboutPage);
    }

    viewAvatar() {
        // this.modalCtrl.create(MineEditAvatarModalPage).present();
    }

    notice() {
        this.noticeSrv.alertInfo('开发中...');
    }
}
