import {
    NgModule,
    Optional,
    SkipSelf,
    ModuleWithProviders,
    LOCALE_ID,
    APP_INITIALIZER,
    ErrorHandler,
} from '@angular/core';

import { HTTP_INTERCEPTORS } from '@angular/common/http';

import { IonicDefineModule } from './ionic/ionic.define.module';

import { throwIfAlreadyLoaded } from './module-import-guard';
import { StartupService } from './startup/startup.service';

import { HttpAuthInterceptor } from './net/http.interceptor';

// 中文设置
import './i18n/zh_CN';

// import { FunDebugErrorHandler } from '@core/helpers/init';

export function StartupServiceFactory(
    startupService: StartupService,
): Function {
    return () => startupService.load();
}

const CORE_PROVIDERS = [];

@NgModule({
    imports: [IonicDefineModule.forRoot()],
    exports: [IonicDefineModule],
    providers: [],
})
export class CoreModule {
    constructor(
        @Optional()
        @SkipSelf()
        parentModule: CoreModule,
    ) {
        throwIfAlreadyLoaded(parentModule, 'CoreModule');
    }
    static forRoot(): ModuleWithProviders {
        return <ModuleWithProviders>{
            ngModule: CoreModule,
            providers: [
                ...CORE_PROVIDERS,
                { provide: LOCALE_ID, useValue: 'zh-Hans' },
                {
                    provide: HTTP_INTERCEPTORS,
                    useClass: HttpAuthInterceptor,
                    multi: true,
                },
                {
                    provide: APP_INITIALIZER,
                    useFactory: StartupServiceFactory,
                    deps: [StartupService],
                    multi: true,
                },
            ],
        };
    }
}
