import { OnInit, OnDestroy, Injector } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { InjectorControl } from './injector.control';
import { AppFunc } from './app.func';
import { AppCase } from './app.case';

export class AppControl extends InjectorControl implements OnInit, OnDestroy {
    constructor(protected injector: Injector) {
        super(injector);

        this.__baseFunc = new AppFunc(this);
        this.__baseCase = new AppCase(this);
    }

    // ----------------------------------------

    ngOnInit() {
        super.ngOnInit();
    }

    ngOnDestroy() {
        super.ngOnDestroy();
        this.__baseFunc = null;
        this.__baseCase = null;
        // 清空其它的
        for (const idx of Object.keys(this)) {
            if (idx && idx.indexOf('___') > -1) {
                this[idx] = null;
            }
        }
    }

    /**
     * 基础处理类
     */
    protected __baseFunc: AppFunc;

    /**
     * 业务处理类
     */
    protected __baseCase: AppCase;

    /**
     * 当前页面的参数
     */
    protected ___pageParams: any = {};

    // ----------------------------------------

    /**
     * 主要的URL
     */
    protected ___primaryURL = '';

    /**
     * 主键KEY
     */
    protected ___primaryKey = 'id';

    /**
     * 主键值
     */
    protected ___primaryValue: any = null;

    // ----------------------------------------

    /**
     * 主要表单
     */
    protected ___mainForm: FormGroup;

    /**
     * 表格附加参数
     */
    public ___mainTableParams: any = {};

    /**
     * 主要表单值
     */
    protected ___formData: any = {};

    /**
     * modal对话框中的参数传递
     */
    protected ___modalParams: any = {};

    // --------------------------------------

    get appCase() {
        return this.__baseCase;
    }

    get appBase() {
        return this.__baseFunc;
    }

    get primaryURL() {
        return this.___primaryURL;
    }

    set primaryURL(value) {
        this.___primaryURL = value;
    }

    get primaryKey() {
        return this.___primaryKey;
    }

    set primaryKey(value) {
        this.___primaryKey = value;
    }

    get primaryValue() {
        return this.___primaryValue;
    }

    set primaryValue(value) {
        this.___primaryValue = value;
    }

    get pageParams() {
        return this.___pageParams;
    }

    set pageTitle(value) {
        this.___pageParams.title = value;
    }

    get pageTitle() {
        return '';
    }

    set mainForm(value) {
        this.___mainForm = value;
    }

    get mainForm() {
        return this.___mainForm;
    }

    get mainTableParams() {
        this.___mainTableParams = this.___mainTableParams || {};
        if (!this.___mainTableParams.hasOwnProperty('ps')) {
            this.___mainTableParams.ps = this.configSrv.define.table_page_size;
        }
        return this.___mainTableParams;
    }

    set formData(value) {
        this.___formData = value;
    }

    get formData() {
        return this.___formData;
    }

    set modalParams(value) {
        this.___modalParams = value;
    }

    get modalParams() {
        return this.___modalParams;
    }

    // -- init -----------------------------------------

    /**
     * 初始化
     */
    protected __init(url: string, key: any, params?: any) {
        this.primaryURL = url;
        this.primaryKey = key;
    }

    navigate(url: string) {
        return this.route.navigateByUrl(url);
    }

    navigateByUrl(url: string) {
        return this.route.navigateByUrl(url);
    }
}
