/**
 * Created by yanxiaojun617@163.com on 12-23.
 */
import { Injectable } from "@angular/core";
import { HttpService } from "./HttpService";
import { FILE_SERVE_URL } from "../public/config";
import { FileObj } from "../model/FileObj";
import { Observable } from "rxjs";
import { NativeService } from "./NativeService";
import { GlobalData } from "./GlobalData";
import { Utils } from "./Utils";
import { Storage } from "@ionic/storage";

/**
 * 上传图片到文件服务器
 */
@Injectable()
export class FileService {
  constructor(private httpService: HttpService,
    private nativeService: NativeService,
    private storage: Storage,
    private globalData: GlobalData) {
  }


  /**
   * 根据文件id删除文件信息
   * @param id
   * @returns {FileObj}
   */
  deleteById(id: string): Observable<FileObj> {
    if (!id) {
      return Observable.of({});
    }
    this.deleteFileCacheByIds([id]);
    return this.httpService.get(FILE_SERVE_URL + '/deleteById', { id: id });
  }

  /**
   * 根据ids(文件数组)获取文件信息
   * 先从本地缓存中查找文件,然后再去文件服务器上查找文件
   * @param ids
   * @returns {FileObj[]}
   */
  getFileInfoByIds(ids: string[]): Observable<FileObj[]> {
    if (!ids || ids.length == 0) {
      return Observable.of([]);
    }
    return this.getFileCacheByIds(ids).mergeMap(cacheData => {
      let queryIds = FileService.getNotCacheIds(cacheData, ids);
      if (queryIds.length == 0) {
        return Observable.of(cacheData);
      }
      return this.httpService.get(FILE_SERVE_URL + '/getByIds', { ids: queryIds }).map(result => {
        if (!result.success) {
          this.nativeService.alert(result.msg);
          return [].concat(cacheData);
        } else {
          for (let fileObj of result.data) {
            fileObj.origPath = FILE_SERVE_URL + fileObj.origPath;
            fileObj.thumbPath = FILE_SERVE_URL + fileObj.thumbPath;
          }
          return cacheData.concat(result.data);
        }
      });
    });
  }


  /**
   * 根据文件id获取文件信息
   * @param id
   * @returns {FileObj}
   */
  getFileInfoById(id: string): Observable<FileObj> {
    if (!id) {
      return Observable.of({});
    }
    return this.getFileInfoByIds([id]).map(res => {
      return res[0] || {};
    })
  }

  /**
   * 根据base64(字符串)批量上传图片
   * @param fileObjList 数组中的对象必须包含bse64属性
   * @returns {FileObj[]}
   */
  uploadMultiByBase64(fileObjList: FileObj[]): Observable<FileObj[]> {
    if (!fileObjList || fileObjList.length == 0) {
      return Observable.of([]);
    }
    return this.httpService.post(FILE_SERVE_URL + '/appUpload?directory=ionic2_tabs', fileObjList).map(result => {
      if (!result.success) {
        this.nativeService.alert(result.msg);
        return [];
      } else {
        for (let fileObj of result.data) {
          fileObj.origPath = FILE_SERVE_URL + fileObj.origPath;
          fileObj.thumbPath = FILE_SERVE_URL + fileObj.thumbPath;
        }
        return result.data;
      }
    });
  }

  /**
   * 根据base64(字符串)上传单张图片
   * @param fileObj 对象必须包含origPath属性
   * @returns {FileObj}
   */
  uploadByBase64(fileObj: FileObj): Observable<FileObj> {
    if (!fileObj.base64) {
      return Observable.of({});
    }
    return this.uploadMultiByBase64([fileObj]).map(res => {
      return res[0] || {};
    })
  }

  /**
   *  根据filePath(文件路径)批量上传图片
   * @param fileObjList 数组中的对象必须包含origPath属性
   * @returns {FileObj[]}
   */
  uploadMultiByFilePath(fileObjList: FileObj[]): Observable<FileObj[]> {
    if (fileObjList.length == 0) {
      return Observable.of([]);
    }
    //开启了缓存
    if (this.globalData.enabledFileCache) {
      for (let fileObj of fileObjList) {
        //生成一个临时id,待真正上传到后台需要替换掉临时id
        fileObj.id = FileService.uuid();
      }
      let cacheKey = 'file-cache-' + this.globalData.userId;
      this.storage.get(cacheKey).then(cacheData => {
        cacheData = cacheData ? cacheData.concat(fileObjList) : fileObjList;
        //缓存文件信息
        this.storage.set(cacheKey, cacheData);
      });
      return Observable.of(fileObjList);
    } else {
      return Observable.create((observer) => {
        this.nativeService.showLoading();
        let fileObjs = [];
        for (let fileObj of fileObjList) {
          this.nativeService.convertImgToBase64(fileObj.origPath).subscribe(base64 => {
            fileObjs.push({
              'base64': base64,
              'type': FileService.getFileType(fileObj.origPath),
              'parameter': fileObj.parameter
            });
            if (fileObjs.length === fileObjList.length) {
              this.uploadMultiByBase64(fileObjs).subscribe(res => {
                observer.next(res);
                this.nativeService.hideLoading();
              })
            }
          })
        }
      });
    }
  }

  /**
   * 根据filePath(文件路径)上传单张图片
   * @param fileObj 对象必须包含origPath属性
   * @returns {FileObj}
   */
  uploadByFilePath(fileObj: FileObj): Observable<FileObj> {
    if (!fileObj.origPath) {
      return Observable.of({});
    }
    return this.uploadMultiByFilePath([fileObj]).map(res => {
      return res[0] || {};
    })
  }

  //根据ids从文件缓存中查询文件信息
  private getFileCacheByIds(ids: string[]): Observable<FileObj[]> {
    return Observable.create(observer => {
      let result = [];
      let cacheKey = 'file-cache-' + this.globalData.userId;
      this.storage.get(cacheKey).then(cacheData => {
        cacheData = cacheData ? cacheData : [];
        for (let cache of cacheData) {
          for (let id of ids) {
            if (id == cache.id) {
              result.push(cache);
            }
          }
        }
        observer.next(result);
      });
    });
  }

  //查询没有缓存的文件id数组
  private static getNotCacheIds(cacheData, ids) {
    let result = [];
    for (let id of ids) {
      let isExist = false;
      for (let cache of cacheData) {
        if (id == cache.id) {
          isExist = true;
        }
      }
      if (!isExist) {
        result.push(id);
      }
    }
    return result;
  }

  //根据文件后缀获取文件类型
  private static getFileType(path: string): string {
    return path.substring(path.lastIndexOf('.') + 1);
  }

  //获取uuid,前缀为'r_'代表缓存文件
  private static uuid(): string {
    let uuid = Utils.uuid();
    return 'r_' + uuid.substring(2);
  }


  //根据文件id数组从缓存中删除文件
  deleteFileCacheByIds(ids) {
    let cacheKey = 'file-cache-' + this.globalData.userId;
    this.storage.get(cacheKey).then(cacheData => {
      let newCacheData = [];
      for (let fileObj of cacheData) {
        let isExist = false;
        for (let id of ids) {
          if (fileObj.id == id) {
            isExist = true;
          }
        }
        if (!isExist) {
          newCacheData.push(fileObj);
        }
      }
      this.storage.set(cacheKey, newCacheData);
    });
  }
}
