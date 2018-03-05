import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PreviewPicturePage } from './preview-picture';

@NgModule({
  declarations: [
    PreviewPicturePage,
  ],
  imports: [
    IonicPageModule.forChild(PreviewPicturePage),
  ],
  exports: [
    PreviewPicturePage
  ]
})
export class PreviewPicturePageModule { }
