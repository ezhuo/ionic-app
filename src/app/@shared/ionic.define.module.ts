import { NgModule, ModuleWithProviders } from '@angular/core';
import { IonicModule, Config } from '@ionic/angular';
import { IonicStorageModule } from '@ionic/storage';

import { IonicNativeServiceModule } from './ionic.native.module';

const SERVICES = [IonicNativeServiceModule.forRoot().providers];

/**
 * IonicModule.forRoot 请参考：https://ionicframework.com/docs/api/config/Config
 */

@NgModule({
    imports: [
        IonicModule.forRoot({
            // mode: 'ios',
            // backButtonText: '',
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
            providers: [...SERVICES],
        };
    }
}
