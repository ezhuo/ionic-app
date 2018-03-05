import { NgModule, ModuleWithProviders } from '@angular/core';
import { StatusBar } from "@ionic-native/status-bar";
import { SplashScreen } from "@ionic-native/splash-screen";
import { AppVersion } from "@ionic-native/app-version";
import { Camera } from "@ionic-native/camera";
import { Toast } from "@ionic-native/toast";
import { File } from "@ionic-native/file";
import { FileTransfer } from "@ionic-native/file-transfer";
import { FileOpener } from '@ionic-native/file-opener';
import { InAppBrowser } from "@ionic-native/in-app-browser";
import { ImagePicker } from "@ionic-native/image-picker";
import { Network } from "@ionic-native/network";
import { AppMinimize } from "@ionic-native/app-minimize";
import { CallNumber } from "@ionic-native/call-number";
import { BarcodeScanner } from "@ionic-native/barcode-scanner";
import { Diagnostic } from "@ionic-native/diagnostic";
import { HTTP } from '@ionic-native/http';
import { JPush } from "../../typings/modules/jpush/index";

const SERVICES = [StatusBar, SplashScreen, AppVersion,
    Camera, Toast, File, FileTransfer, FileOpener, InAppBrowser,
    ImagePicker, Network, AppMinimize, CallNumber,
    BarcodeScanner, Diagnostic, HTTP, JPush];

@NgModule({
    imports: [],
    exports: [],
    declarations: [],
    providers: [...SERVICES],
})
export class IonicNativeServiceModule {

    static forRoot(): ModuleWithProviders {
        return <ModuleWithProviders>{
            ngModule: IonicNativeServiceModule,
            providers: [...SERVICES]
        };
    }
}
