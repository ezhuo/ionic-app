import {
    Component,
    Injector,
    OnInit,
    OnDestroy,
    ViewEncapsulation,
    Input,
    ViewChild,
    ElementRef,
} from '@angular/core';
import { ModalControl } from '@core';

@Component({
    selector: 'page-preview-picture',
    templateUrl: 'preview-picture.html',
    styleUrls: [`./preview-picture.scss`],
    encapsulation: ViewEncapsulation.None,
})
export class PreviewPicturePage extends ModalControl
    implements OnInit, OnDestroy {
    @ViewChild('panel')
    panel: ElementRef;
    initialSlide = 0;
    picturePaths: string[] = [];

    constructor(protected injector: Injector) {
        super(injector);
        this.initialSlide = this.activeRoute.snapshot.params.get(
            'initialSlide',
        );
        this.picturePaths = this.activeRoute.snapshot.params.get(
            'picturePaths',
        );
    }

    ngOnInit() {
        super.ngOnInit();
    }

    ngOnDestory() {
        super.ngOnDestroy();
    }

    ionViewDidLoad() {
        // http://www.swiper.com.cn/api/index.html
        new Swiper(this.panel.nativeElement, {
            initialSlide: this.initialSlide, // 初始化显示第几个
            zoom: true, // 双击,手势缩放
            loop: true, // 循环切换
            lazyLoading: true, // 延迟加载
            lazyLoadingOnTransitionStart: true, // lazyLoadingInPrevNext : true,
            pagination: '.swiper-pagination', // 分页器
            paginationType: 'fraction', // 分页器类型
            onClick: () => {
                this.modalClose();
            },
        });
    }
}
