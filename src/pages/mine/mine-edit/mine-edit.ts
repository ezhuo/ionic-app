import {Component} from '@angular/core';
import {ModalController} from 'ionic-angular';
import {MineEditModalPage} from '../mine-edit-modal/mine-edit-modal';
import {MineEditAvatarModalPage} from '../mine-edit-avatar-modal/mine-edit-avatar-modal';
import {GlobalData} from "../../../core/services/GlobalData";

@Component({
  selector: 'page-mine-edit',
  templateUrl: 'mine-edit.html'
})
export class MineEditPage {
  userInfo;
  constructor(private modalCtrl: ModalController,
              private globalData: GlobalData) {
    this.userInfo = this.globalData.user;
  }

  viewAvatar() {
    this.modalCtrl.create(MineEditAvatarModalPage).present();

  }

  openModal() {
    let modal = this.modalCtrl.create(MineEditModalPage);
    modal.present();
    modal.onDidDismiss(userInfo => {
      userInfo && (this.userInfo = userInfo)
    });
  }

}
