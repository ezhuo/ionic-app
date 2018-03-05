import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { FileCachePage } from './file-cache';
import { SelectPicturePageModule } from "../select-picture/select-picture.module";

@NgModule({
  declarations: [
    FileCachePage,
  ],
  imports: [
    IonicPageModule.forChild(FileCachePage), SelectPicturePageModule
  ],
})
export class FileCachePageModule { }
