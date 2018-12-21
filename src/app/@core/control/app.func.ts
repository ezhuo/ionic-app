import { AppControl } from './app.control';
import { FormGroup } from '@angular/forms';
import * as helpers from '../helpers';

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
  __formGroupFillData = (__frmGroup?: FormGroup, __frmData?: Object): void => {
    const self = this.appCtrl;
    if (!__frmGroup === null) __frmGroup = self.formData.group;
    for (const idx of Object.keys(__frmData)) {
      if (__frmGroup.controls.hasOwnProperty(idx)) {
        __frmGroup.controls[idx].setValue(__frmData[idx]);
      }
    }
  };

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

  /**
   * 模态数据格式化
   * @param record
   */
  __formatModalParams = (record?: any, params?: any): Object => {
    const self = this.appCtrl;
    const frmData = helpers.deepExtend({}, record || self.formData.data || {});
    return {
      dataSource: self.dataSource,
      formData: { data: frmData },
      modalData: helpers.deepExtend({}, self.modalData),
    };
  };

  // ------------------

  __formatSubmitData(formValue: any, schema?: any): object {
    formValue = formValue || {};
    const prop = schema.properties;
    let widget = null;
    for (const idx of Object.keys(formValue)) {
      if (
        formValue[idx] &&
        (helpers.isArray(formValue[idx]) || helpers.isObject(formValue[idx]))
      ) {
        if (prop && prop[idx] && prop[idx].ui) {
          if (helpers.isString(prop[idx].ui)) {
            widget = prop[idx].ui;
          } else {
            widget = prop[idx].ui.widget;
          }
          if (widget.indexOf('upload') > -1) {
            formValue[idx] = helpers.formatUploadFilesToString(formValue[idx]);
          }
          if (widget.indexOf('cascader') > -1) {
            formValue[idx] = helpers.formatCascaderToString(formValue[idx]);
          }
        }
      }
    }
    return formValue;
  }
}
