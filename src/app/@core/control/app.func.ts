import { AppControl } from './app.control';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

export class AppFunc {
    private ___appCtrl: AppControl = null;

    get appCtrl() {
        return this.___appCtrl;
    }

    constructor(appCtrl: AppControl) {
        this.___appCtrl = appCtrl;

        this.___appCtrl.modalParams = {
            button: {
                submit: {
                    show: true,
                    title: '保存',
                },
                reset: {
                    show: true,
                    title: '重置',
                },
                close: {
                    show: true,
                    title: '关闭',
                },
            },
        };
    }

    /**
     * 表单初始化
     */
    __formGroupFillData(__frmGroup?: FormGroup, __frmData?: Object): void {
        const self = this.appCtrl;
        if (!__frmGroup === null) __frmGroup = self.mainForm;
        for (const idx of Object.keys(__frmData)) {
            if (__frmGroup.controls.hasOwnProperty(idx)) {
                __frmGroup.controls[idx].setValue(__frmData[idx]);
            }
        }
    }

    /**
     * 获取主键值
     */
    __getPrimaryKeyValue = (__frmData?: any, __primaryKey?: string) => {
        const self = this.appCtrl;
        let result = null;
        if (!__frmData) {
            __frmData = self.formData;
        }
        if (!__primaryKey) {
            __primaryKey = self.primaryKey;
        }
        if (!self.helpers.isEmpty(__frmData) && __primaryKey) {
            if (!self.helpers.isEmpty(__frmData.hasOwnProperty(__primaryKey))) {
                result = __frmData[__primaryKey];
                self.primaryValue = result;
            }
        }
        return result;
    };
    
}
