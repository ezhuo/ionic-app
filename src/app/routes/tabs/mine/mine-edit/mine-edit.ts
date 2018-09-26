import {
    Component,
    ViewEncapsulation,
    OnInit,
    OnDestroy,
    Injector,
} from '@angular/core';
import { IndexControl } from '@core';
import { TabsMineEditModal } from './mine-edit-modal/mine-edit-modal';
import { TabsMineEditAvatarModal } from './mine-edit-avatar-modal/mine-edit-avatar-modal';
// import { GlobalData } from '../../../providers/GlobalData';

@Component({
    selector: 'tabs-mine-edit',
    templateUrl: 'mine-edit.html',
    styleUrls: [`./mine-edit.scss`],
    encapsulation: ViewEncapsulation.None,
})
export class TabsMineEdit extends IndexControl implements OnInit, OnDestroy {
    userInfo;

    constructor(protected injector: Injector) {
        super(injector);
        // this.userInfo = this.globalData.user;
    }

    viewAvatar() {
        this.modalSrv.create(TabsMineEditAvatarModal);
    }

    openModal() {
        const modal = this.modalSrv.create(TabsMineEditModal);
        // modal.onDidDismiss(userInfo => {
        //     userInfo && (this.userInfo = userInfo);
        // });
    }

    ngOnInit(): void {
        super.ngOnInit();
    }

    ngOnDestroy(): void {
        super.ngOnDestroy();
    }
}
