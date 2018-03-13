import { NgModule, Optional, SkipSelf, ModuleWithProviders, ErrorHandler } from '@angular/core';
import { IonicErrorHandler } from 'ionic-angular';
import { CalendarModule } from "ion2-calendar";
import { IonicStorageModule } from "@ionic/storage";
import { HttpModule } from "@angular/http";
import { HttpClientModule } from '@angular/common/http';
import { throwIfAlreadyLoaded } from './module-import-guard';
import { IonicNativeServiceModule } from './ionic.native.module';
import { UtilsModule } from './utils/utils.module';
import { DataModule } from './data/data.module';
import { FunDebugErrorHandler } from './utils/logger.service';

const CORE_PROVIDERS = [
  ...IonicNativeServiceModule.forRoot().providers,
  ...DataModule.forRoot().providers,
  ...UtilsModule.forRoot().providers,
  { provide: ErrorHandler, useClass: IonicErrorHandler }
];

const Modules = [
  HttpModule,
  HttpClientModule,
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
