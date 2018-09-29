import {
    Component,
    Injector,
    OnInit,
    OnDestroy,
    ViewEncapsulation,
    Input,
    Output,
    EventEmitter,
} from '@angular/core';
import { IndexControl } from '@core';
import * as configInc from '@core/config.inc';

/**
 * @name 自定义分页组件
 * @description
 * @example <page-paging [total]="18" (pageNumChange)="doSearch($event)"></page-paging>
 * @example <page-paging [total]="total" (pageNumChange)="doSearch($event)" pageSize="10" color="dark"></page-paging>
 */
@Component({
    selector: 'page-paging',
    templateUrl: 'paging.html',
    styleUrls: [`./paging.scss`],
    encapsulation: ViewEncapsulation.None,
})
export class PagingPage extends IndexControl implements OnInit, OnDestroy {
    @Input()
    total: number; // 共多少条数据

    @Input()
    pageSize: number = configInc.define.page_size; // 每页大小,默认5条

    @Input()
    color = 'primary'; // 主题颜色

    @Input()
    pageNum = 1; // 当前第几页,默认1
    @Output()
    pageNumChange = new EventEmitter<any>();

    constructor(protected injector: Injector) {
        super(injector);
    }

    ngOnInit() {
        super.ngOnInit();
    }

    ngOnDestory() {
        super.ngOnDestroy();
    }

    btnClick(pageNum) {
        this.pageNum = pageNum;
        this.pageNumChange.emit(pageNum);
    }

    ceil(num) {
        return Math.ceil(num);
    }
}
