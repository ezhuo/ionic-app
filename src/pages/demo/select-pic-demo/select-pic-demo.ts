import { NoticeService } from './../../../core/utils/notice.service';
import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { FileObj } from "../../../core/model/FileObj";
import { Response, Http } from "@angular/http";
import { NativeService } from "../../../core/utils/native.service";
import { FileService } from "../../../core/utils/file.service";

@Component({
  selector: 'page-select-pic-demo',
  templateUrl: 'select-pic-demo.html'
})
export class SelectPicDemoPage {
  fileObjList: FileObj[] = [];
  filePaths: FileObj[] = [];

  constructor(public navCtrl: NavController,
    private http: Http,
    private fileService: FileService,
    private nativeService: NativeService,
    private noticeService: NoticeService
  ) {
    //使用Http加载本地json文件,因为HttpService给url默认加了http://ip,加载本地文件不需要http://ip
    this.http.get('./assets/data/fileData.json').map((res: Response) => res.json()).subscribe(res => {
      if (res.success) {
        for (let fileObj of res.data) {
          this.fileObjList.push(<FileObj>{
            'thumbPath': fileObj.base64,
            'origPath': fileObj.base64,
            'base64': fileObj.base64
          });
        }
      }
    });
  }

  details(url) {
    this.nativeService.openUrlByBrowser(url);
  }

  uploadMultiByBase64() {
    this.fileService.uploadMultiByBase64(this.fileObjList).subscribe(fileList => {
      this.noticeService.msg_info('成功上传' + fileList.length + '张图片');
    });
  }

  uploadMultiByFilePath() {
    this.fileService.uploadMultiByFilePath(this.filePaths).subscribe(fileList => {
      this.noticeService.msg_info('成功上传' + fileList.length + '张图片');
    });
  }

}
