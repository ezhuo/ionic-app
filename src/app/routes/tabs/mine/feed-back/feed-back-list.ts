import {
    Component,
    ViewEncapsulation,
    OnInit,
    OnDestroy,
    Injector,
} from '@angular/core';
import { IndexControl } from '@core';
import { TabsMineFeedBack } from './feed-back';
import { TabsMineFeedBackDetail } from './feed-back-detail';

@Component({
    selector: 'tabs-mine-feed-back-list',
    templateUrl: 'feed-back-list.html',
    styleUrls: [`./feed-back-list.scss`],
    encapsulation: ViewEncapsulation.None,
})
export class TabsMineFeedBackList extends IndexControl
    implements OnInit, OnDestroy {
    query = {
        page: 1,
        rows: 10,
        sourceId: 1, // 1:现场作业app；2:精准营销app；3:web
    };
    data = {
        total: 0,
        rows: [],
    };

    constructor(protected injector: Injector) {
        super(injector);
        this.data = {
            total: 1,
            rows: [
                {
                    id: 1,
                    title: '测试1',
                    content: '哈哈哈,这是写死的.',
                    state: 1,
                    createTime: new Date(),
                },
            ],
        };
    }

    ngOnInit(): void {
        super.ngOnInit();
    }

    ngOnDestroy(): void {
        super.ngOnDestroy();
    }

    requirementPersonList() {
        // this.mineService.requirementPersonList(this.query).subscribe(res => {
        //     this.data = res;
        // });
    }

    doSearch(pageNum) {
        this.query.page = pageNum;
        this.requirementPersonList();
    }

    add() {
        // this.navCtrl.push(FeedBackPage);
    }

    detail(id) {
        // this.navCtrl.push(FeedBackDetailPage, { id });
    }
}
