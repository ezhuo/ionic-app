import { Component } from "@angular/core";
import "rxjs/add/operator/map";
import { TestService } from "./TestService";
import { FileObj } from "../../core/model/FileObj";
import { HTTP } from '@ionic-native/http';

@Component({
  selector: 'page-test',
  templateUrl: 'test.html',
})
export class TestPage {

  fileObjList: FileObj[] = [];

  constructor(public testService: TestService, private http: HTTP) {

  }

  getFileData() {
    /*this.testService.getFileData().subscribe(res => {
      this.fileObjList = res;
    });*/
    let url = 'https://api.seniverse.com/v3/weather/now.json?key=tiwv7jbjttvbot8l&language=zh-Hans&location=23.1111:113.111';
    this.http.get(url, {}, {})
      .then(data => {
        debugger;
        console.log(data.status);
        console.log(data.data); // data received by server
        console.log(data.headers);

      })
      .catch(error => {
        debugger;
        console.log(error.status);
        console.log(error.error); // error message as string
        console.log(error.headers);
      });
  }


}
