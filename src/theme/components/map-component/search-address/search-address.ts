import { NoticeService } from './../../../../core/utils/notice.service';
import { NativeService } from './../../../../core/utils/native.service';
import { Component, ViewChild } from '@angular/core';
import { IonicPage, ViewController, NavParams, Searchbar } from 'ionic-angular';
import { Subject } from "rxjs";
import { StorageService } from '../../../../core/utils/storage.service';

declare var AMap;
/**
 * Generated class for the SearchAddress page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-search-address',
  templateUrl: 'search-address.html',
})
export class SearchAddress {

  @ViewChild('searchBar') searchBar: Searchbar;
  address: any = '';
  items: any[] = [];
  historyButton: boolean = false;
  placeSearch;
  searchTextStream: Subject<string> = new Subject<string>();

  constructor(private storage: StorageService,
    public viewCtrl: ViewController,
    private navParams: NavParams,
    private nativeService: NativeService,
    private noticeService: NoticeService
  ) {
    this.address = this.navParams.get('address');
    AMap.service('AMap.PlaceSearch', () => {//地点查询插件
      this.placeSearch = new AMap.PlaceSearch({
        pageSize: 10,
        pageIndex: 1,
        city: '广州市'
      });
    });
  }

  ionViewDidEnter() {
    setTimeout(() => {
      this.searchBar.setFocus();
    });
  }

  ngAfterContentInit() {
    this.searchTextStream
      .debounceTime(600)
      .distinctUntilChanged()
      .subscribe(value => {
        this.getSearchData(value).then(list => {
          this.items = <[any]>list;
          this.historyButton = false;
        });
      });
    this.searchTextStream.next(this.address);
  }

  getItems($event) {
    this.searchTextStream.next($event.target.value);
  }

  selectItem(item) {
    this.storage.ionicStorage.get('MapSearchHistory').then(items => {
      if (items) {
        let isExist = false;
        for (let value of items) {
          if (value.id === item.id) {
            isExist = true;
          }
        }
        if (!isExist) {
          items.push(item);
        }
      } else {
        items = [item]
      }
      this.storage.ionicStorage.set('MapSearchHistory', items);
    });
    this.viewCtrl.dismiss(item);
  }

  clearHistory() {
    this.storage.ionicStorage.remove('MapSearchHistory');
    this.items = [];
  }

  private getSearchData(val) {
    return new Promise((resolve) => {
      if (val && val.trim() != '') {
        this.placeSearch.search(val, (status, result) => {
          if (status == 'complete') {
            resolve(result.poiList.pois);
          } else if (status == 'no_data') {
            this.noticeService.msg_info('没有找到匹配结果,请精确查询条件')
          } else {
            this.noticeService.msg_info('地图查询失败,稍后再试.')
          }
        });
      } else {
        this.storage.ionicStorage.get('MapSearchHistory').then(items => {
          this.items = (items || []).reverse();
          this.historyButton = true;
        });
      }
    });
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

}
