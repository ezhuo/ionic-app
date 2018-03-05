import { Component, ViewChild, ElementRef } from '@angular/core';
import { IonicPage, NavParams, ViewController } from 'ionic-angular';
declare var Swiper;

@IonicPage()
@Component({
  selector: 'page-preview-picture',
  templateUrl: 'preview-picture.html',
})
export class PreviewPicturePage {
  @ViewChild('panel') panel: ElementRef;
  initialSlide: number = 0;
  picturePaths: string[] = [];

  constructor(private viewCtrl: ViewController, public navParams: NavParams) {
    this.initialSlide = navParams.get('initialSlide');
    this.picturePaths = navParams.get('picturePaths');
  }

  ionViewDidLoad() {
    //http://www.swiper.com.cn/api/index.html
    new Swiper(this.panel.nativeElement, {
      initialSlide: this.initialSlide,//初始化显示第几个
      zoom: true,//双击,手势缩放
      loop: true,//循环切换
      lazyLoading: true,//延迟加载
      lazyLoadingOnTransitionStart: true,//    lazyLoadingInPrevNext : true,
      pagination: '.swiper-pagination',//分页器
      paginationType: 'fraction',//分页器类型
      onClick: () => {
        this.dismiss();
      }
    })
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }
}
