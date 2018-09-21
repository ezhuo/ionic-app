import { NgModule, ModuleWithProviders } from '@angular/core';
import { IonicModule, Config } from '@ionic/angular';
import { IonicStorageModule } from '@ionic/storage';

import { NativeService } from './native.service';
import { LoggerService } from './logger.service';

import { platformConfig } from '../config.inc';

import {
    AppMinimize,
    AppVersion,
    BarcodeScanner,
    // CallNumber,
    Camera,
    Device,
    Diagnostic,
    File,
    //FileOpener,
    FileTransfer,
    ImagePicker,
    InAppBrowser,
    WebView,
    Network,
    SplashScreen,
    StatusBar,
    //HTTP,
    Toast,
} from './native.plugins';

const NativeSERVICES = [
    AppMinimize,
    AppVersion,
    BarcodeScanner,
    // CallNumber,
    Camera,
    Device,
    Diagnostic,
    File,
    //FileOpener,
    FileTransfer,
    ImagePicker,
    InAppBrowser,
    WebView,
    Network,
    SplashScreen,
    StatusBar,
    //HTTP,
    Toast,
];

const DefineSERVICES = [NativeService, LoggerService];

/**
 * IonicModule.forRoot 请参考：https://ionicframework.com/docs/api/config/Config
 */

@NgModule({
    imports: [
        IonicModule.forRoot({
            mode: platformConfig.mode,
            backButtonText: '',
        }),
        IonicStorageModule.forRoot(),
    ],
    exports: [],
    declarations: [],
    providers: [],
})
export class IonicDefineModule {
    constructor(public config: Config) {
        this.setCustomTransitions();
    }

    private setCustomTransitions() {
        // this.config.set('modalEnter', ModalFromRightEnter);
        // this.config.set('modalLeave', ModalFromRightLeave);
        // this.config.set("modal-from-right-enter", ModalFromRightEnter);
        // this.config.set("modal-from-right-leave", ModalFromRightLeave);
        // this.config.set("modal-scale-enter", ModalScaleEnter);
        // this.config.set("modal-scale-leave", ModalScaleLeave);
    }

    static forRoot(): ModuleWithProviders {
        return <ModuleWithProviders>{
            ngModule: IonicDefineModule,
            providers: [...NativeSERVICES, ...DefineSERVICES],
        };
    }
}
