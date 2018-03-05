import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';
import {NativeService} from "../../../core/services/NativeService";
import {FileService} from "../../../core/services/FileService";

/**
 * Generated class for the FileCacheDemoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-file-cache-demo',
  templateUrl: 'file-cache-demo.html',
})
export class FileCacheDemoPage {
  fileObjList = [];

  constructor(public navCtrl: NavController, public nativeService: NativeService, public fileService: FileService) {
  }

  ionViewWillEnter() {
    if (!this.nativeService.isMobile()) {
      this.nativeService.alert('请使用真机调试');
    }
  }

  save(){
    if(this.fileObjList.length==0){
      this.nativeService.alert('请选择照片');
      return;
    }
    this.fileService.uploadMultiByFilePath(this.fileObjList).subscribe(res=>{
      this.fileObjList = [];
      this.nativeService.alert('文件已缓存','重启app在"我的-图片缓存"功能查看');
    });
  }

}
