import {
    OnInit,
    OnDestroy,
    Injector,
    ElementRef,
    ChangeDetectorRef,
} from '@angular/core';
import {
    FormGroup,
    FormBuilder,
    FormControl,
    Validators,
} from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

import {
    Events,
    MenuController,
    NavController,
    NavParams,
} from '@ionic/angular';
import { Storage } from '@ionic/storage';

import { ModalService } from '../utils/modal.service';
import { NoticeService } from '../utils/notice.service';

import { NativeService, IonicService } from '../ionic';

import { AuthService } from '../data/auth.service';
import { TokenService } from '../data/token.service';
import { StateService } from '../data/state.service';
import { ConfigService } from '../data/config.service';
import { UserService } from '../data/users.service';

import { HttpService } from '../net/http.service';

import * as helpers from '../helpers';

export class InjectorControl implements OnInit, OnDestroy {
    constructor(protected injector: Injector) {}

    ngOnInit() {}

    ngOnDestroy() {
        this.stateSrv.destroy(this, [
            'freeData',
            'freeTimeOut',
            'freeTimeInterval',
        ]);
        // 清空其它的
        for (const idx of Object.keys(this)) {
            if (idx && idx.indexOf('___') > -1) {
                this[idx] = null;
            }
        }
    }

    /**
     * 保存数据流，最后释放
     */
    protected ___freeData: any = {};
    /**
     * 记录 timeout , 准备销毁
     */
    protected ___freeTimeOut: any = {};

    /**
     * 记录 time Interval，准备销毁
     */
    protected ___freeTimeInterval: any = {};

    get freeData() {
        return this.___freeData;
    }

    get freeTimeOut() {
        return this.___freeTimeOut;
    }

    get freeTimeInterval() {
        return this.___freeTimeInterval;
    }

    get route() {
        return this.injector.get(Router);
    }

    get activeRoute() {
        return this.injector.get(ActivatedRoute);
    }

    get eleRef() {
        return this.injector.get(ElementRef);
    }

    get modalSrv() {
        return this.injector.get(ModalService);
    }

    get noticeSrv() {
        return this.injector.get(NoticeService);
    }

    get msgSrv() {
        return this.injector.get(NoticeService);
    }

    get httpSrv() {
        return this.injector.get(HttpService);
    }

    get stateSrv() {
        return this.injector.get(StateService);
    }

    get configSrv() {
        return this.injector.get(ConfigService);
    }

    get userSrv() {
        return this.injector.get(UserService);
    }

    get authSrv() {
        return this.injector.get(AuthService);
    }

    get tokenSrv() {
        return this.injector.get(TokenService);
    }

    get cdRef() {
        return this.injector.get(ChangeDetectorRef);
    }

    get FormBuilder() {
        return this.injector.get(FormBuilder);
    }

    get FormGroup() {
        return FormGroup;
    }

    get FormControl() {
        return FormControl;
    }

    get Validators() {
        return Validators;
    }

    get helpers() {
        return helpers;
    }

    // -------------------

    get ionNativeSrv() {
        return this.injector.get(NativeService);
    }

    get ionSrv() {
        return this.injector.get(IonicService);
    }
}
