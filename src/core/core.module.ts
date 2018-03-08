import { NgModule, Optional, SkipSelf, ModuleWithProviders, ErrorHandler } from '@angular/core';
import { CalendarModule } from "ion2-calendar";
import { IonicStorageModule } from "@ionic/storage";
import { HttpModule } from "@angular/http";

import { throwIfAlreadyLoaded } from './module-import-guard';
import { IonicNativeServiceModule } from './ionic.native.module';
import { ServicesModule } from './services/services.module';

import { UtilsModule } from './utils/utils.module';
import { DataModule } from './data/data.module';

import { IS_DEBUG, FUNDEBUG_API_KEY } from "../core/public/config";

//参考文档:https://docs.fundebug.com/notifier/javascript/framework/ionic2.html
import * as fundebug from "fundebug-javascript";

fundebug.apikey = FUNDEBUG_API_KEY;

// 应用开发阶段，development:开发;production:生产
fundebug.releasestage = IS_DEBUG ? 'development' : 'production';

// 如果暂时不需要使用Fundebug，将silent属性设为true
fundebug.silent = !IS_DEBUG;

export class FunDebugErrorHandler implements ErrorHandler {
  handleError(err: any): void {
    fundebug.notifyError(err);
    console.error(err);
  }
}

const CORE_PROVIDERS = [
  ...IonicNativeServiceModule.forRoot().providers,
  ...ServicesModule.forRoot().providers,
  ...DataModule.forRoot().providers,
  ...UtilsModule.forRoot().providers,
  { provide: ErrorHandler, useClass: FunDebugErrorHandler }
];

const Modules = [
  HttpModule,
  IonicStorageModule.forRoot(),
  DataModule.forRoot(),
  UtilsModule.forRoot(),
  CalendarModule
];

@NgModule({
  imports: [...Modules],
  exports: [],
  providers: []
})
export class CoreModule {
  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    throwIfAlreadyLoaded(parentModule, 'CoreModule');
  }
  static forRoot(): ModuleWithProviders {
    return <ModuleWithProviders>{
      ngModule: CoreModule,
      providers: [...CORE_PROVIDERS]
    };
  }
}
