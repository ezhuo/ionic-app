import {
    Component,
    Injector,
    OnInit,
    OnDestroy,
    ViewChild,
    ViewEncapsulation,
} from '@angular/core';
import {
    NavigationEnd,
    RouteConfigLoadStart,
    NavigationError,
    NavigationCancel,
} from '@angular/router';
import { IndexControl } from '@core';

import { Tabs, Tab } from '@ionic/angular';

@Component({
    selector: 'layout-tabs',
    templateUrl: './tabs.component.html',
    styleUrls: [`./tabs.component.scss`],
    encapsulation: ViewEncapsulation.None,
})
export class LayoutTabsComponent extends IndexControl
    implements OnInit, OnDestroy {
    isFetching = false;

    @ViewChild('tabs')
    tabs: Tabs;

    @ViewChild('tab1')
    tab1: Tab;

    constructor(protected injector: Injector) {
        super(injector);
        // scroll to top in change page
        this.freeData.route = this.route.events.subscribe(evt => {
            if (!this.isFetching && evt instanceof RouteConfigLoadStart) {
                this.isFetching = true;
            }
            if (
                evt instanceof NavigationError ||
                evt instanceof NavigationCancel
            ) {
                this.isFetching = false;
                if (evt instanceof NavigationError) {
                    this.noticeSrv.msgInfo(`无法加载${evt.url}路由`);
                }
                return;
            }
            if (!(evt instanceof NavigationEnd)) {
                return;
            }
        });
    }

    ngOnInit() {
        super.ngOnInit();
        this.listenForSelectEvents();
    }

    ngOnDestory() {
        super.ngOnDestroy();
    }

    ionNavDidChange($event) {
        // console.log('ionNavDidChange', $event);
    }

    ionNavWillChange($event) {
        // console.log('ionNavWillChange', $event);
    }

    ionNavWillLoad() {
        // console.log('ionNavWillLoad');
    }

    ionSelect($event) {
        // console.log('ionSelect', $event);
    }
    ionChange($event: any) {}

    listenForSelectEvents() {}
}
