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

    constructor(protected injector: Injector) {
        super(injector);
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

    // -- init -----------------------------------------

    /**
     * 初始化
     */
    protected __init(url: string, key: any, params?: any) {
        this.dataSource.url = url;
        this.dataSource.key = key;
    }

    navigate(url: string) {
        return this.route.navigateByUrl(url);
    }

    navigateByUrl(url: string) {
        return this.route.navigateByUrl(url);
    }
}
