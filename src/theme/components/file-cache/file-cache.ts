import { Component } from '@angular/core';
import { Storage } from "@ionic/storage";
import { AlertController, IonicPage, NavController } from 'ionic-angular';
import { GlobalData } from "../../../core/services/GlobalData";
import { FileService } from "../../../core/services/FileService";
import { FileObj } from "../../../core/model/FileObj";
import { CommonService } from "../../../core/services/CommonService";
import { NativeService } from "../../../core/services/NativeService";

/**
 * Generated class for the FileCachePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-file-cache',
  templateUrl: 'file-cache.html',
})
export class FileCachePage {
  enabledFileCache: boolean = true;//app是否开启缓存
  uploading: boolean = false;//是否正在上传
  fileObjList: FileObj[] = [];//待上传的文件数组
  uploadTotal: number = 0;//待上传的文件数量
  progress;

  constructor(public navCtrl: NavController,
    private alertCtrl: AlertController,
    private storage: Storage,
    private fileService: FileService,
    private nativeService: NativeService,
    private commonService: CommonService,
    private globalData: GlobalData) {
    this.enabledFileCache = this.globalData.enabledFileCache;
    let cacheKey = 'file-cache-' + this.globalData.userId;
    this.storage.get(cacheKey).then(cacheData => {
      this.fileObjList = cacheData || [];
    });
  }

  upload() {
    this.uploadTotal = this.fileObjList.length;
    this.progress = this.alertCtrl.create({
      title: '0/' + this.uploadTotal,
      subTitle: '上传中...',
      cssClass: 'js-upload',
      enableBackdropDismiss: false,
      buttons: [{
        text: '取消上传', handler: () => {
          this.uploading = false;
        }
      }
      ]
    });
    this.progress.present();
    this.uploading = true;
    this.doUpload();
  }

  //上传文件,每次上传一张.
  doUpload() {
    if (this.fileObjList.length > 0 && this.uploading) {
      let fileObj = this.fileObjList[0];
      fileObj.parameter = fileObj.id;
      //上传文件前,如果app开启了缓存需要先关闭缓存
      this.enabledFileCache && (this.globalData.enabledFileCache = false);
      //执行上传
      this.globalData.showLoading = false;
      this.fileService.uploadByFilePath(fileObj).subscribe(res => {
        //文件上传成功后,重新开启app缓存
        this.enabledFileCache && (this.globalData.enabledFileCache = true);
        //修改缓存文件关系为真实文件关系
        this.globalData.showLoading = false;
        this.commonService.fileRelationReplace([{ 'realId': res.id, 'replaceId': res.parameter }]).subscribe(() => {
          //更新上传进度
          let title = document.getElementsByClassName('js-upload')[0].getElementsByClassName('alert-title')[0];
          title && (title.innerHTML = this.uploadTotal - this.fileObjList.length + '/' + this.uploadTotal);
          this.fileObjList.shift();
          this.fileService.deleteFileCacheByIds([res.parameter]);
          //上传完成
          if (this.fileObjList.length == 0) {
            this.progress.dismiss();
            this.nativeService.alert('上传完成');
            this.uploading = false;
          }
          this.doUpload();//继续上传下一个文件
        })
      })
    }
  }



}
