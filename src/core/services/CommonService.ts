/**
 * Created by yanxiaojun on 2017/2/16.
 */
import { Injectable } from '@angular/core';
import { Observable } from "rxjs";
import { Response } from "@angular/http";
import { HttpService } from "./HttpService";
import { Utils } from "./Utils";
import { NativeService } from "./NativeService";
import { APP_VERSION_SERVE_URL } from "../public/config";
import { Logger } from "./Logger";

/**
 *
 */
@Injectable()
export class CommonService {
  constructor(public httpService: HttpService, public nativeService: NativeService, public logger: Logger) {
  }


  /**
   * 登录获取token
   */
  getToken(username, password) {
    return this.httpService.post('/v1/login', {
      'client_id': 'app',
      'username': username,
      'password': Utils.hex_md5(password)
    });
  }

  /**
   * 查询用户信息
   */
  getUserInfo() {
    return this.httpService.get('/v1/public/user/self');
  }


  /**
   * 获取新token
   */
  getNewToken() {
    return this.httpService.post('/v1/refresh_token');
  }

  /**
   * 查询登录用户所拥有的资源
   * resourceType: 资源类型1:菜单,2:url,3:按钮
   */
  getResource(resourceType: number = 1) {
    const url = '/v1/public/resource';
    let json = Utils.sessionStorageGetItem(url);
    if (json) {
      return Observable.of(json.filter((item) => {
        return item.resourceType == resourceType;
      }));
    }
    return this.httpService.post(url, { clientType: 2 }).map((res) => {
      Utils.sessionStorageSetItem(url, res);
      return res.filter((item) => {
        return item.resourceType == resourceType;
      });
    });
  }

  /**
   * 更新文件缓存文件关系
   */
  fileRelationReplace(data) {
    return this.httpService.post('/fileRelation/replace', data).map((res: Response) => res.json());
  }

  /**
   * 从版本管理服务中查询app版本信息
   */
  getAppVersion() {
    return Observable.create(observer => {
      this.nativeService.getPackageName().subscribe(packageName => {//获得app包名
        let appName = packageName.substring(packageName.lastIndexOf('.') + 1);
        let appType = this.nativeService.isAndroid() ? 'android' : 'ios';
        let url = Utils.formatUrl(`${APP_VERSION_SERVE_URL}/v1/apply/getDownloadPageByEName/${appName}/${appType}`);
        this.httpService.get(url).subscribe(res => {
          if (res && res.code == 1) {
            observer.next(res.data);//返回app最新版本信息
          }
        }, err => {
          this.logger.log(err, '从版本升级服务获取版本信息失败', {
            url: url
          });
          observer.error(false);
        })
      }, err => {
        this.logger.log(err, '获取包名失败');
        observer.error(false);
      })
    });
  }

  /**
   * 查询公告列表
   */
  findPublishList() {
    return this.httpService.post('/sys/notice/findPublishList').map((res: Response) => res.json());
  }

  /**
   * 查询公告详情
   */
  getPublishDetail(id) {
    return this.httpService.get(`/sys/notice/getById/${id}`).map((res: Response) => res.json());
  }


}
