import {
    Component,
    ViewEncapsulation,
    OnInit,
    OnDestroy,
    Injector,
} from '@angular/core';
import { IndexControl } from '@core';

@Component({
    selector: 'tabs-mine-feed-back-detail',
    templateUrl: 'feed-back-detail.html',
    styleUrls: [`./feed-back-detail.scss`],
    encapsulation: ViewEncapsulation.None,
})
export class TabsMineFeedBackDetail extends IndexControl
    implements OnInit, OnDestroy {
    detail = {
        requirement: {},
        answerList: [],
    };

    constructor(protected injector: Injector) {
        super(injector);
        const id = this.ionSrv.navParams.get('id');
        // this.mineService.requirementDetail(id).subscribe(res => {
        //     this.detail = res;
        // });
    }

    ngOnInit(): void {
        super.ngOnInit();
    }

    ngOnDestroy(): void {
        super.ngOnDestroy();
    }
}
