import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { HttpService } from '../../core/data/http.service';
import { FileService } from '../../core/utils/file.service';

@Injectable()
export class MineService {
  constructor(public httpService: HttpService, private fileService: FileService) {
  }

  /**
   * 更新用户头像Id
   */
  updateUserAvatarId(avatarId: string) {
    return this.httpService.post(`/user/avatar/${avatarId}`);
  }

  /**
   * 修改密码
   */
  updateUserPassword(oldPsw: string, newPsw: string) {
    // return this.httpService.postFormData('/v1/update_password', {
    //   "old_password": Utils.hex_md5(oldPsw),
    //   "new_password": Utils.hex_md5(newPsw),
    // });
  }

  /**
   * 添加反馈
   */
  requirementSave(data) {
    return this.httpService.post('/requirement/save', data);
  }

  /**
   * 查询返回记录
   * @param sourceId 1:现场作业app；2:精准营销app；3:web
   */
  requirementPersonList(query) {
    return this.httpService.post('/requirement/personalList', query);
  }

  /**
   * 反馈详情
   */
  requirementDetail(id) {
    return this.httpService.get(`/requirement/getDetailById/${id}`).map((res: any) => {
      let data = res.json();
      data.answerList = data.answerList.reverse();
      this.fileService.getFileInfoByIds(data.requirement.fileIdList).subscribe(fileList => {
        data.requirement.fileList = fileList;
      });
      return data;
    });
  }
  
}
