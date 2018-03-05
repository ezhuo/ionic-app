import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ModalFromRightPage } from './modal-from-right';

@NgModule({
  declarations: [
    ModalFromRightPage,
  ],
  imports: [
    IonicPageModule.forChild(ModalFromRightPage),
  ],
  exports: [
    ModalFromRightPage
  ]
})
export class ModalFromRightPageModule {}
