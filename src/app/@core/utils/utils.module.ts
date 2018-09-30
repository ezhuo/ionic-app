import { NgModule, ModuleWithProviders } from '@angular/core';
import { NoticeService } from './notice.service';
import { ModalService } from './modal.service';
import { LoggerService } from './logger.service';
import { StorageService } from './storage.service';

const SERVICES = [NoticeService, ModalService, LoggerService, StorageService];

@NgModule({
    imports: [],
    exports: [],
    providers: [],
})
export class UtilsModule {
    static forRoot(): ModuleWithProviders {
        return <ModuleWithProviders>{
            ngModule: UtilsModule,
            providers: [...SERVICES],
        };
    }
}
