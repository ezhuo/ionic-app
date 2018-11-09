import { AppControl } from './app.control';

export class AppCase {
    private ___appCtrl: AppControl = null;

    get appCtrl() {
        return this.___appCtrl;
    }

    constructor(appCtrl: AppControl) {
        this.___appCtrl = appCtrl;
    }

    /**
     * 写日志
     */
    __logs = (content: string) => {
        const bc = this.appCtrl;
        bc.freeData.logs = bc.httpSrv
            .post('/logs', {
                title: '',
                content: content,
            })
            .toPromise()
            .then(res => {
                // console.log(res);
            })
            .catch(err => {
                console.log(err);
            });
    };

    /**
     * 根据服务器端，数据导出到EXCEL
     */
    exportXlsFromServer = (__url?: string, __body?: any, __options?: any) => {};

    /**
     * 删除对话框
     */
    deleteAlert = (
        __mainUrl?: string,
        __record?: Object,
        __primaryKey?: string,
    ): any => {};
}
