import { ErrorHandler } from '@angular/core';
import * as fundebug from 'fundebug-javascript';
import * as configInc from '../config.inc';

debugger;

fundebug.apikey = configInc.fundebug.api;
fundebug.releasestage = configInc.app_debug ? 'development' : 'production'; // 应用开发阶段，development:开发;production:生产
fundebug.silent = !configInc.app_debug; // 如果暂时不需要使用Fundebug，将silent属性设为true

export class FunDebugErrorHandler implements ErrorHandler {
    handleError(err: any): void {
        fundebug.notifyError(err);
        console.error(err);
    }
}
