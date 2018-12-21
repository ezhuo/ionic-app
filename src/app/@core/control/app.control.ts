import { OnInit, OnDestroy, Injector } from '@angular/core';

import { InjectorControl } from './injector.control';
import { AppFunc } from './app.func';
import { AppCase } from './app.case';
import { FormData, DataSource, ModalData, PageData } from '../model/app.d';

export class AppControl extends InjectorControl implements OnInit, OnDestroy {
  /**
   * 基础处理类
   */
  protected __appFunc: AppFunc = new AppFunc(this);

  /**
   * 业务处理类
   */
  protected __appCase: AppCase = new AppCase(this);

  /**
   * 当前页面的参数
   */
  protected ___pageData: PageData = { title: null };

  // ----------------------------------------

  /**
   * 与服务器数据交换
   * @protected
   * @type {DataSource}
   * @memberof AppControl
   */
  protected ___dataSource: DataSource = {
    url: '',
    key: 'id',
    val: null,
  };

  /**
   * 主要表单值
   */
  protected ___formData: FormData = {
    group: null,
    data: {},
  };

  /**
   * modal对话框中的参数传递
   */
  protected ____modalData: ModalData = {
    title: null,
    data: null,
  };

  // --------------------------------------

  constructor(protected injector: Injector, protected child?: Function) {
    super(injector, child);
  }

  // ----------------------------------------

  ngOnInit() {
    super.ngOnInit();
  }

  ngOnDestroy() {
    super.ngOnDestroy();
    this.__appFunc = null;
    this.__appCase = null;
    // 清空其它的
    for (const idx of Object.keys(this)) {
      if (idx && idx.indexOf('___') > -1) {
        this[idx] = null;
      }
    }
  }

  get appCase() {
    return this.__appCase;
  }

  get appFunc() {
    return this.__appFunc;
  }

  get dataSource(): DataSource {
    return this.___dataSource;
  }

  set dataSource(value: DataSource) {
    this.___dataSource = value;
  }

  get pageData(): PageData {
    return this.___pageData;
  }

  set pageTitle(value) {
    this.pageData.title = value;
  }

  get pageTitle() {
    return '';
  }

  set formData(value: FormData) {
    this.___formData = value;
  }

  get formData(): FormData {
    return this.___formData;
  }

  set modalData(value: ModalData) {
    this.____modalData = value;
  }

  get modalData(): ModalData {
    return this.____modalData;
  }

  // ---ion event list --------------------------------

  // constructor --> ionViewDidLoad --> ionViewWillEnter --> ionViewDidEnter --> ionViewWillLeave --> ionViewDidLeave --> ionViewWillUnload.

  ionViewDidLoad() {
    if (this.configSrv.appDebug)
      console.log('[LOG] ionViewDidLoad >> ' + this.componentData.name + ' ：');
  }
  ionViewWillEnter() {
    if (this.configSrv.appDebug)
      console.log(
        '[LOG] ionViewWillEnter >> ' + this.componentData.name + ' ：',
      );
  }
  ionViewDidEnter() {
    if (this.configSrv.appDebug)
      console.log(
        '[LOG] ionViewDidEnter >> ' + this.componentData.name + ' ：',
      );
  }
  ionViewWillLeave() {
    if (this.configSrv.appDebug)
      console.log(
        '[LOG] ionViewWillLeave >> ' + this.componentData.name + ' ：',
      );
  }
  ionViewDidLeave() {
    if (this.configSrv.appDebug)
      console.log(
        '[LOG] ionViewDidLeave >> ' + this.componentData.name + ' ：',
      );
  }
  ionViewWillUnload() {
    if (this.configSrv.appDebug)
      console.log(
        '[LOG] ionViewWillUnload >> ' + this.componentData.name + ' ：',
      );
  }

  // -- init -----------------------------------------

  /**
   * 初始化
   */
  protected __init__(
    child: Object | Function,
    dataSource?: DataSource,
    params?: any,
  ) {
    if (!this.helpers.isEmpty(dataSource)) {
      this.dataSource = Object.assign(this.dataSource, dataSource);
    }
    return super.__init__(child, dataSource, params);
  }

  navigate(url: string) {
    return this.route.navigateByUrl(url);
  }

  navigateByUrl(url: string) {
    return this.route.navigateByUrl(url);
  }
}
