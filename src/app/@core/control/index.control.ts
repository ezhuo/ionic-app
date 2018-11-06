import { OnInit, OnDestroy, Injector } from '@angular/core';
import { AppControl } from './app.control';

export class IndexControl extends AppControl implements OnInit, OnDestroy {
    constructor(protected injector: Injector) {
        super(injector);
    }

    ngOnInit() {
        super.ngOnInit();
        // 只有后台才允许记录操作日志
        if ((this.route.url + '').indexOf('/admin/') > -1) {
            this.appCase.__logs('进入');
        }
    }

    ngOnDestroy() {
        super.ngOnDestroy();
    }

    protected __init(url: string, key: any, params?: any) {
        return super.__init(url, key, params);
    }

    /**
     * 模态数据格式化
     * @param record
     */
    formatModalParams(record?: any, params?: any): Object {
        const frmData = this.helpers.deepExtend(
            {},
            record || this.formData.data || {},
        );
        return {
            dataSource: this.dataSource,
            formData: { data: frmData },
            modalData: this.helpers.deepExtend({}, this.modalData),
        };
    }
}
