import {Component} from '@angular/core';
import {NavController, NavParams , IonicPage} from 'ionic-angular';
import {NativeService} from "../../../core/services/NativeService";

/*
 Generated class for the PaginationDemo page.

 See http://ionicframework.com/docs/v2/components/#navigation for more info on
 Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-pagination-demo',
  templateUrl: 'pagination-demo.html'
})
export class PaginationDemoPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, private nativeService: NativeService) {
  }


  details(url){
    this.nativeService.openUrlByBrowser(url);
  }


  doSearch(pageNum) {
    console.log(pageNum);
  }

}
