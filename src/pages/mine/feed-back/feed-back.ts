import { Component } from '@angular/core';
import { FileObj } from "../../../core/model/FileObj";
import { FormBuilder } from "@angular/forms";
import { MineService } from "../MineService";
import { NavController } from "ionic-angular";
import { FileService } from '../../../core/utils/file.service';
import { ValidatorService } from '../../../core/data/validator.service';
import { NoticeService } from '../../../core/utils/notice.service';

@Component({
  selector: 'page-feed-back',
  templateUrl: 'feed-back.html'
})
export class FeedBackPage {
  verifyMessages = {
    'title': {
      'errorMsg': '',
      'required': '标题为必填项',
      'minlength': '标题最少4个字符',
      'maxlength': '标题最大20个字符'
    },
    'content': {
      'errorMsg': '',
      'required': '内容为必填项',
      'minlength': '内容最少4个字符',
      'maxlength': '内容最大500个字符'
    }
  };
  fileObjList: FileObj[] = [];
  form: any;

  constructor(
    public navCtrl: NavController,
    private mineService: MineService,
    private fileService: FileService,
    private noticeService: NoticeService,
    private formBuilder: FormBuilder
  ) {
    this.form = this.formBuilder.group({
      title: ['', [ValidatorService.required, ValidatorService.minLength(4), ValidatorService.maxLength(20)]],// 第一个参数是默认值
      content: ['', [ValidatorService.required, ValidatorService.minLength(4), ValidatorService.maxLength(500)]],
      type: ['1'],//1:BUG;2:需求；3：问题；
      state: ['1'],//1:未回复；2:已回复；3:补充待回复;8：已关闭;9重新打开；
      sourceId: [1]//1:现场作业app；2:精准营销app；3:web
    });
    this.form.valueChanges
      .subscribe(data => {
        const verifyMessages = this.verifyMessages;
        for (const field in verifyMessages) {
          verifyMessages[field].errorMsg = '';
          const control = this.form.get(field);
          if (control && control.dirty && !control.valid) {
            const messages = verifyMessages[field];
            for (const key in control.errors) {
              messages[key] && (verifyMessages[field].errorMsg += messages[key] + ' ');
            }
          }
        }
      });
  }


  save(data) {
    this.noticeService.alert({
      title: '确定提交？',
      subTitle: '提交后将不能修改',
      buttons: [{ text: '取消' },
      {
        text: '确定', handler: () => {
          this.fileService.uploadMultiByFilePath(this.fileObjList).subscribe(fileList => {
            let fileIdList = [];
            for (let fileObj of fileList) {
              fileIdList.push(fileObj.id);
            }
            data.fileIdList = fileIdList;
            this.mineService.requirementSave(data).subscribe(res => {
              this.navCtrl.pop();
            })
          });
        }
      }
      ]
    });

  }


}
