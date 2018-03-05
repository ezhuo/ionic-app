import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SelectPicturePage } from './select-picture';
import { PreviewPicturePageModule } from "../preview-picture/preview-picture.module";

@NgModule({
  declarations: [
    SelectPicturePage,
  ],
  imports: [
    IonicPageModule.forChild(SelectPicturePage), PreviewPicturePageModule
  ],
  exports: [
    SelectPicturePage
  ]
})
export class SelectPicturePageModule { }
