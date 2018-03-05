import { NgModule, ModuleWithProviders } from '@angular/core';
import { NativeService } from "./NativeService";
import { HttpService } from "./HttpService";
import { FileService } from "./FileService";
import { Helper } from "./Helper";
import { Utils } from "./Utils";
import { GlobalData } from "./GlobalData";
import { Logger } from "./Logger";
import { CommonService } from "./CommonService";
import { VersionService } from "./VersionService";

const SERVICES = [NativeService, HttpService, FileService, Helper, Utils, GlobalData, Logger, CommonService, VersionService];

@NgModule({
    imports: [],
    exports: [],
    declarations: [],
    providers: [...SERVICES],
})
export class ServicesModule {

    static forRoot(): ModuleWithProviders {
        return <ModuleWithProviders>{
            ngModule: ServicesModule,
            providers: [...SERVICES]
        };
    }
}
