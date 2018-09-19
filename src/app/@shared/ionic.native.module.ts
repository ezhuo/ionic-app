import { NgModule, ModuleWithProviders } from '@angular/core';

import { StatusBar } from '@ionic-native/status-bar/ngx';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { AppVersion } from '@ionic-native/app-version/ngx';
import { Camera } from '@ionic-native/camera/ngx';

import { File } from '@ionic-native/file/ngx';
import { FileTransfer } from '@ionic-native/file-transfer/ngx';
import { FileOpener } from '@ionic-native/file-opener/ngx';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { ImagePicker } from '@ionic-native/image-picker/ngx';
import { Network } from '@ionic-native/network/ngx';
import { AppMinimize } from '@ionic-native/app-minimize/ngx';
import { CallNumber } from '@ionic-native/call-number/ngx';
import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';
import { Diagnostic } from '@ionic-native/diagnostic/ngx';
import { HTTP } from '@ionic-native/http/ngx';
import { Toast } from '@ionic-native/toast/ngx';

export const IonicNativeServer = [
    StatusBar,
    SplashScreen,
    AppVersion,
    Camera,
    File,
    FileTransfer,
    FileOpener,
    InAppBrowser,
    ImagePicker,
    Network,
    AppMinimize,
    CallNumber,
    BarcodeScanner,
    Diagnostic,
    HTTP,
    Toast,
];

@NgModule({
    imports: [],
    exports: [],
    declarations: [],
    providers: [],
})
export class IonicNativeServiceModule {
    static forRoot(): ModuleWithProviders {
        return <ModuleWithProviders>{
            ngModule: IonicNativeServiceModule,
            providers: [...IonicNativeServer],
        };
    }
}
