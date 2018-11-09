import { Injectable } from '@angular/core';
import * as config from '../config.inc';

@Injectable({
    providedIn: 'root',
})
export class ConfigService {
    config: any = config;
    appDebug: any = config.appDebug;
    app: any = config.app;
    api: any = config.api;
    canton: any = config.canton;
    define: any = config.define;
    router: any = config.router;
    ckeditor: any = config.editor;
    platformConfig = config.platformConfig;
}
