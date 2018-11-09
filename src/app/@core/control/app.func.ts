import { AppControl } from './app.control';
import { FormGroup } from '@angular/forms';

export class AppFunc {
    private ___appCtrl: AppControl = null;

    get appCtrl() {
        return this.___appCtrl;
    }

    constructor(appCtrl: AppControl) {
        this.___appCtrl = appCtrl;
    }

    /**
     * 表单初始化
     */
    __formGroupFillData(__frmGroup?: FormGroup, __frmData?: Object): void {
        const self = this.appCtrl;
        if (!__frmGroup === null) __frmGroup = self.formData.group;
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
            __frmData = self.formData.data;
        }
        if (!__primaryKey) {
            __primaryKey = self.dataSource.key;
        }
        if (!self.helpers.isEmpty(__frmData) && __primaryKey) {
            if (!self.helpers.isEmpty(__frmData.hasOwnProperty(__primaryKey))) {
                result = __frmData[__primaryKey];
                self.dataSource.val = result;
            }
        }
        return result;
    };
}
