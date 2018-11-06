import {
    Component,
    Injector,
    OnInit,
    OnDestroy,
    ViewChild,
    ViewEncapsulation,
    ViewChildren,
    QueryList,
} from '@angular/core';
import {
    NavigationEnd,
    RouteConfigLoadStart,
    NavigationError,
    NavigationCancel,
} from '@angular/router';
import { IonRouterOutlet } from '@ionic/angular';
import { IndexControl } from '@core';

@Component({
    selector: 'layout-tabs',
    templateUrl: './tabs.component.html',
    styleUrls: [`./tabs.component.scss`],
    encapsulation: ViewEncapsulation.None,
})
export class LayoutTabsComponent extends IndexControl
    implements OnInit, OnDestroy {
    isFetching = false;

    @ViewChildren(IonRouterOutlet)
    routerOutlets: QueryList<IonRouterOutlet>;

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
        this.listenBackButtonEvent();
    }

    ngOnDestory() {
        super.ngOnDestroy();
    }

    ionNavDidChange($event) {}

    ionNavWillChange($event) {}

    ionNavWillLoad() {}

    ionSelect($event) {}
    async ionChange($event: any) {}

    listenForSelectEvents() {}

    /**
     * 监听这一级别的路由
     */
    listenBackButtonEvent() {
        const event = () => {
            if (this.routerOutlets)
                this.routerOutlets.forEach((outlet: IonRouterOutlet) => {
                    if (outlet && outlet.canGoBack()) {
                        outlet.pop();
                    }
                });
        };
        this.ionSrv.events.subscribe('router-pop', event);
    }
}
