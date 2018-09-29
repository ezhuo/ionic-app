import {
    Component,
    Injector,
    OnInit,
    OnDestroy,
    ViewEncapsulation,
    Input,
    ViewChild,
} from '@angular/core';
import { ModalControl } from '@core';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { Searchbar } from '@ionic/angular';

@Component({
    selector: 'page-search-address',
    templateUrl: 'search-address.html',
    styleUrls: [`./search-address.scss`],
    encapsulation: ViewEncapsulation.None,
})
export class SearchAddress extends ModalControl implements OnInit, OnDestroy {
    @ViewChild('searchBar')
    searchBar: Searchbar;
    address: any = '';
    items: any[] = [];
    historyButton = false;
    placeSearch;
    searchTextStream: Subject<string> = new Subject<string>();

    constructor(protected injector: Injector) {
        super(injector);
        this.address = this.activeRoute.snapshot.params.get('address');
        AMap.service('AMap.PlaceSearch', () => {
            // 地点查询插件
            this.placeSearch = new AMap.PlaceSearch({
                pageSize: 10,
                pageIndex: 1,
                city: '广州市',
            });
        });
    }

    ngOnInit() {
        super.ngOnInit();
    }

    ngOnDestory() {
        super.ngOnDestroy();
    }

    ionViewDidEnter() {
        setTimeout(() => {
            // this.searchBar.setFocus();
        });
    }

    ngAfterContentInit() {
        this.searchTextStream
            .pipe(
                debounceTime(600),
                distinctUntilChanged(),
            )
            .subscribe(value => {
                this.getSearchData(value).then(list => {
                    this.items = list as [any];
                    this.historyButton = false;
                });
            });
        this.searchTextStream.next(this.address);
    }

    getItems($event) {
        this.searchTextStream.next($event.target.value);
    }

    selectItem(item) {
        this.ionSrv.storage.get('MapSearchHistory').then(items => {
            if (items) {
                let isExist = false;
                for (const value of items) {
                    if (value.id === item.id) {
                        isExist = true;
                    }
                }
                if (!isExist) {
                    items.push(item);
                }
            }
            this.ionSrv.storage.set('MapSearchHistory', [items]);
        });
        this.modalClose(item);
    }

    clearHistory() {
        this.ionSrv.storage.remove('MapSearchHistory');
        this.items = [];
    }

    private getSearchData(val) {
        return new Promise(resolve => {
            if (val && val.trim() != '') {
                this.placeSearch.search(val, (status, result) => {
                    if (status == 'complete') {
                        resolve(result.poiList.pois);
                    } else if (status == 'no_data') {
                        this.noticeSrv.msg('没有找到匹配结果,请精确查询条件');
                    } else {
                        this.noticeSrv.msg('地图查询失败,稍后再试.');
                    }
                });
            } else {
                this.ionSrv.storage.get('MapSearchHistory').then(items => {
                    this.items = (items || []).reverse();
                    this.historyButton = true;
                });
            }
        });
    }

    dismiss() {
        this.modalClose();
    }
}
