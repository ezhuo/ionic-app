import { Injectable } from "@angular/core";
import { Response, Http } from "@angular/http";
import "rxjs/add/operator/map";
import { Observable } from "rxjs";
import { TestObj } from "./TestObj";
import { HttpService } from "../../core/services/HttpService";
import { FileObj } from "../../core/model/FileObj";

@Injectable()
export class TestService {
  constructor(public http: Http, public httpService: HttpService) {
  }

  getJson() {
    return this.httpService.get('./assets/data/test.json').map((res: Response) => res.json());
  }

  getObj(): Observable<TestObj> {
    return this.httpService.get('./assets/data/test.json').map((res: Response) => res.json());
  }

  getList(): Observable<TestObj[]> {
    return this.httpService.get('./assets/data/testList.json').map((res: Response) => res.json());
  }

  getFileData(): Observable<FileObj[]> {
    return this.http.get('./assets/data/fileData.json').map((res: Response) => {
      let result = res.json(), fileObjList: FileObj[] = [];
      if (result.success) {
        for (let fileObj of result.data) {
          fileObjList.push(<FileObj>{ 'thumbPath': fileObj.base64, 'origPath': fileObj.base64 });
        }
      }
      return fileObjList;
    });
  }

}
