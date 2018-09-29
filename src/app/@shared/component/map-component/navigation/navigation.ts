import {
    Component,
    Injector,
    OnInit,
    OnDestroy,
    ViewEncapsulation,
    Input,
    ElementRef,
    ViewChild,
} from '@angular/core';
import { ModalControl } from '@core';

@Component({
    selector: 'page-navigation',
    templateUrl: 'navigation.html',
    styleUrls: [`./navigation.scss`],
    encapsulation: ViewEncapsulation.None,
})
export class Navigation extends ModalControl implements OnInit, OnDestroy {
    @ViewChild('panel')
    panel: ElementRef;
    navigationType: number;
    navigationIsReady = false;
    walkNavigationIsReady = false;
    map;
    startPoint;
    endPoint;

    constructor(protected injector: Injector) {
        super(injector);
        this.navigationType = this.activeRoute.snapshot.params.get(
            'navigationType',
        );
        this.endPoint = this.activeRoute.snapshot.params.get('markerLocation');
        this.map = window['HomeAMap'];
    }

    ngOnInit() {
        super.ngOnInit();
    }

    ngOnDestory() {
        super.ngOnDestroy();
    }

    ngAfterContentInit() {
        this.noticeSrv.loading('');
        const options = {
            city: '广州市',
            panel: this.panel.nativeElement,
            map: this.map,
        };
        if (this.navigationType == 1) {
            AMap.service('AMap.Driving', () => {
                this.doSearch(new AMap.Driving(options));
                this.navigationIsReady = true;
            });
        } else if (this.navigationType == 2) {
            AMap.service('AMap.Transfer', () => {
                this.doSearch(new AMap.Transfer(options));
            });
        } else if (this.navigationType == 3) {
            AMap.service('AMap.Walking', () => {
                this.doSearch(new AMap.Walking(options));
                this.walkNavigationIsReady = true;
            });
        }
    }

    doSearch(navigationService) {
        this.ionSrv.gets.getUserLocation().subscribe(
            location => {
                this.map.clearMap();
                this.startPoint = location;
                navigationService.search(
                    [this.startPoint.lng, this.startPoint.lat],
                    [this.endPoint.lng, this.endPoint.lat],
                    (status, result) => {
                        this.noticeSrv.clearLoading();
                        console.log(status);
                        console.log(result);
                    },
                );
            },
            () => {
                this.noticeSrv.clearLoading();
            },
        );
    }

    doNavigation(type) {
        // 0实时导航,1模拟导航
        this.ionSrv.gets
            .navigation(this.startPoint, this.endPoint, type)
            .subscribe(message => {
                console.log(message);
            });
    }

    dismiss() {
        this.modalClose();
    }
}
