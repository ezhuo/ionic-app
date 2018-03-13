import { Component } from '@angular/core';
import { ModalController } from 'ionic-angular';
import { MineEditModalPage } from '../mine-edit-modal/mine-edit-modal';
import { MineEditAvatarModalPage } from '../mine-edit-avatar-modal/mine-edit-avatar-modal';
import { UserService } from '../../../core/data/users.service';

@Component({
  selector: 'page-mine-edit',
  templateUrl: 'mine-edit.html'
})
export class MineEditPage {
  userInfo;
  constructor(private modalCtrl: ModalController,
    private userService: UserService) {
    this.userInfo = this.userService.userInfo;
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
